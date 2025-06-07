const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'wedding-invitation-secret-key-2024';

// Middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'wedding_invitation'
};

async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verify session in database
    const connection = await getConnection();
    const [sessions] = await connection.query(`
      SELECT s.*, u.username, u.full_name, u.role, u.is_active
      FROM user_sessions s
      JOIN admin_users u ON s.user_id = u.id
      WHERE s.session_token = ? AND s.expires_at > NOW() AND s.is_active = TRUE AND u.is_active = TRUE
    `, [token]);
    
    await connection.end();

    if (sessions.length === 0) {
      return res.status(403).json({ error: 'Invalid or expired session' });
    }

    req.user = {
      id: sessions[0].user_id,
      username: sessions[0].username,
      fullName: sessions[0].full_name,
      role: sessions[0].role
    };
    
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Activity logging middleware
const logActivity = async (userId, action, tableName, recordId, oldValues = null, newValues = null, req) => {
  try {
    const connection = await getConnection();
    await connection.query(`
      INSERT INTO activity_logs (user_id, action, table_name, record_id, old_values, new_values, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId,
      action,
      tableName,
      recordId,
      oldValues ? JSON.stringify(oldValues) : null,
      newValues ? JSON.stringify(newValues) : null,
      req.ip,
      req.get('User-Agent')
    ]);
    await connection.end();
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Wedding Invitation API Server with Authentication',
    timestamp: new Date().toISOString()
  });
});

// Authentication endpoints
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const connection = await getConnection();
    
    // Get user
    const [users] = await connection.query(`
      SELECT id, username, email, password_hash, full_name, role, is_active
      FROM admin_users 
      WHERE (username = ? OR email = ?) AND is_active = TRUE
    `, [username, username]);

    if (users.length === 0) {
      await connection.end();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      await connection.end();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create session
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await connection.query(`
      INSERT INTO user_sessions (user_id, session_token, expires_at, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?)
    `, [user.id, token, expiresAt, req.ip, req.get('User-Agent')]);

    // Update last login
    await connection.query(`
      UPDATE admin_users SET last_login = NOW() WHERE id = ?
    `, [user.id]);

    await connection.end();

    // Log activity
    await logActivity(user.id, 'LOGIN', 'admin_users', user.id, null, null, req);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/logout', authenticateToken, async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    
    const connection = await getConnection();
    await connection.query(`
      UPDATE user_sessions SET is_active = FALSE WHERE session_token = ?
    `, [token]);
    await connection.end();

    // Log activity
    await logActivity(req.user.id, 'LOGOUT', 'admin_users', req.user.id, null, null, req);

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Wedding Settings endpoints
app.get('/api/wedding-settings', authenticateToken, async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(`
      SELECT * FROM wedding_settings 
      WHERE is_active = TRUE 
      ORDER BY created_at DESC 
      LIMIT 1
    `);
    await connection.end();
    
    res.json({ success: true, data: rows[0] || {} });
  } catch (error) {
    console.error('Error fetching wedding settings:', error);
    res.status(500).json({ error: 'Failed to fetch wedding settings' });
  }
});

app.post('/api/wedding-settings', authenticateToken, async (req, res) => {
  try {
    const settingsData = req.body;
    
    const connection = await getConnection();
    
    // Get current settings for logging
    const [currentSettings] = await connection.query(`
      SELECT * FROM wedding_settings WHERE is_active = TRUE LIMIT 1
    `);
    
    // Deactivate existing settings
    await connection.query('UPDATE wedding_settings SET is_active = FALSE');
    
    // Insert new settings
    const [result] = await connection.query(`
      INSERT INTO wedding_settings (
        groom_full_name, groom_first_name, groom_parents,
        bride_full_name, bride_first_name, bride_parents,
        wedding_date, wedding_time, wedding_venue, wedding_address,
        reception_date, reception_time, reception_venue, reception_address,
        created_by, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)
    `, [
      settingsData.groomFullName,
      settingsData.groomFirstName,
      settingsData.groomParents,
      settingsData.brideFullName,
      settingsData.brideFirstName,
      settingsData.brideParents,
      settingsData.weddingDate,
      settingsData.weddingTime,
      settingsData.weddingVenue,
      settingsData.weddingAddress,
      settingsData.receptionDate,
      settingsData.receptionTime,
      settingsData.receptionVenue,
      settingsData.receptionAddress,
      req.user.id
    ]);

    await connection.end();

    // Log activity
    await logActivity(
      req.user.id, 
      'UPDATE', 
      'wedding_settings', 
      result.insertId,
      currentSettings[0] || null,
      settingsData,
      req
    );
    
    res.json({ success: true, id: result.insertId, message: 'Wedding settings updated successfully' });
  } catch (error) {
    console.error('Error updating wedding settings:', error);
    res.status(500).json({ error: 'Failed to update wedding settings' });
  }
});

// Guest Management endpoints
app.get('/api/guests', authenticateToken, async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(`
      SELECT id, guest_name, guest_email, guest_phone, guest_count,
             rsvp_status, invitation_code, rsvp_message, rsvp_submitted_at,
             created_at, updated_at
      FROM wedding_guests
      WHERE is_active = TRUE
      ORDER BY created_at DESC
    `);
    await connection.end();

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching guests:', error);
    res.status(500).json({ error: 'Failed to fetch guests' });
  }
});

app.post('/api/guests', authenticateToken, async (req, res) => {
  try {
    const { guestName, guestEmail, guestPhone, guestCount } = req.body;

    if (!guestName) {
      return res.status(400).json({ error: 'Guest name is required' });
    }

    // Generate invitation code
    const invitationCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    const connection = await getConnection();

    // Get active wedding ID
    const [weddings] = await connection.query('SELECT id FROM wedding_settings WHERE is_active = TRUE LIMIT 1');
    let weddingId = 1;

    if (weddings.length > 0) {
      weddingId = weddings[0].id;
    }

    const [result] = await connection.query(`
      INSERT INTO wedding_guests (
        wedding_id, guest_name, guest_email, guest_phone,
        invitation_code, guest_count, rsvp_status, created_by, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, TRUE)
    `, [weddingId, guestName, guestEmail, guestPhone, invitationCode, guestCount || 1, req.user.id]);

    // Get the inserted guest
    const [newGuest] = await connection.query(`
      SELECT id, guest_name, guest_email, guest_phone, guest_count,
             rsvp_status, invitation_code, created_at, updated_at
      FROM wedding_guests
      WHERE id = ?
    `, [result.insertId]);

    await connection.end();

    // Log activity
    await logActivity(req.user.id, 'CREATE', 'wedding_guests', result.insertId, null, newGuest[0], req);

    res.status(201).json({ success: true, data: newGuest[0] });
  } catch (error) {
    console.error('Error adding guest:', error);
    res.status(500).json({ error: 'Failed to add guest' });
  }
});

app.put('/api/guests/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { guestName, guestEmail, guestPhone, guestCount, rsvpStatus } = req.body;

    const connection = await getConnection();

    // Get current guest data for logging
    const [currentGuest] = await connection.query(`
      SELECT * FROM wedding_guests WHERE id = ? AND is_active = TRUE
    `, [id]);

    if (currentGuest.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'Guest not found' });
    }

    await connection.query(`
      UPDATE wedding_guests
      SET guest_name = ?, guest_email = ?, guest_phone = ?,
          guest_count = ?, rsvp_status = ?, updated_at = NOW()
      WHERE id = ? AND is_active = TRUE
    `, [guestName, guestEmail, guestPhone, guestCount, rsvpStatus, id]);

    // Get updated guest
    const [updatedGuest] = await connection.query(`
      SELECT id, guest_name, guest_email, guest_phone, guest_count,
             rsvp_status, invitation_code, created_at, updated_at
      FROM wedding_guests
      WHERE id = ?
    `, [id]);

    await connection.end();

    // Log activity
    await logActivity(req.user.id, 'UPDATE', 'wedding_guests', id, currentGuest[0], updatedGuest[0], req);

    res.json({ success: true, data: updatedGuest[0] });
  } catch (error) {
    console.error('Error updating guest:', error);
    res.status(500).json({ error: 'Failed to update guest' });
  }
});

app.delete('/api/guests/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getConnection();

    // Get current guest data for logging
    const [currentGuest] = await connection.query(`
      SELECT * FROM wedding_guests WHERE id = ? AND is_active = TRUE
    `, [id]);

    if (currentGuest.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'Guest not found' });
    }

    // Soft delete
    const [result] = await connection.query(`
      UPDATE wedding_guests
      SET is_active = FALSE, updated_at = NOW()
      WHERE id = ?
    `, [id]);

    await connection.end();

    // Log activity
    await logActivity(req.user.id, 'DELETE', 'wedding_guests', id, currentGuest[0], null, req);

    res.json({ success: true, message: 'Guest deleted successfully' });
  } catch (error) {
    console.error('Error deleting guest:', error);
    res.status(500).json({ error: 'Failed to delete guest' });
  }
});

// RSVP endpoints
app.post('/api/rsvp', async (req, res) => {
  try {
    const { guestName, guestEmail, guestPhone, attendanceStatus, guestCount, message } = req.body;

    if (!guestName || !attendanceStatus) {
      return res.status(400).json({ error: 'Guest name and attendance status are required' });
    }

    const connection = await getConnection();

    // Find guest by name
    const [existingGuest] = await connection.query(`
      SELECT id FROM wedding_guests
      WHERE guest_name = ? AND is_active = TRUE
    `, [guestName]);

    if (existingGuest.length > 0) {
      // Update existing guest
      await connection.query(`
        UPDATE wedding_guests
        SET rsvp_status = ?, guest_email = COALESCE(?, guest_email),
            guest_phone = COALESCE(?, guest_phone), guest_count = ?,
            rsvp_message = ?, rsvp_submitted_at = NOW(), updated_at = NOW()
        WHERE id = ?
      `, [attendanceStatus, guestEmail, guestPhone, guestCount, message, existingGuest[0].id]);
    }

    await connection.end();

    res.json({ success: true, message: 'RSVP submitted successfully' });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    res.status(500).json({ error: 'Failed to submit RSVP' });
  }
});

app.get('/api/rsvp', authenticateToken, async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(`
      SELECT guest_name, guest_email, guest_phone, guest_count,
             rsvp_status, rsvp_message, rsvp_submitted_at, created_at, updated_at
      FROM wedding_guests
      WHERE is_active = TRUE AND rsvp_status != 'pending'
      ORDER BY rsvp_submitted_at DESC
    `);
    await connection.end();

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching RSVP responses:', error);
    res.status(500).json({ error: 'Failed to fetch RSVP responses' });
  }
});

// Dashboard statistics
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const connection = await getConnection();

    // Get guest statistics
    const [guestStats] = await connection.query(`
      SELECT
        COUNT(*) as total_guests,
        SUM(CASE WHEN rsvp_status = 'attending' THEN guest_count ELSE 0 END) as attending_count,
        SUM(CASE WHEN rsvp_status = 'not_attending' THEN 1 ELSE 0 END) as not_attending_count,
        SUM(CASE WHEN rsvp_status = 'pending' THEN 1 ELSE 0 END) as pending_count
      FROM wedding_guests
      WHERE is_active = TRUE
    `);

    // Get recent activity
    const [recentActivity] = await connection.query(`
      SELECT a.*, u.full_name as user_name
      FROM activity_logs a
      JOIN admin_users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `);

    await connection.end();

    res.json({
      success: true,
      data: {
        guestStats: guestStats[0],
        recentActivity: recentActivity
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Wedding Invitation API Server with Authentication running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Login endpoint: http://localhost:${PORT}/api/auth/login`);
  console.log(`👥 Guests API: http://localhost:${PORT}/api/guests`);
  console.log(`📝 RSVP API: http://localhost:${PORT}/api/rsvp`);
  console.log(`⚙️ Settings API: http://localhost:${PORT}/api/wedding-settings`);
  console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard/stats`);
  console.log('\n🔐 Default Admin Credentials:');
  console.log('   Username: admin');
  console.log('   Password: admin123');
});
