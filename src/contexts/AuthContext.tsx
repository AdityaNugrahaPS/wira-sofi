import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import LoginRequired from '../components/auth/LoginRequired';

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('auth-token');
    if (savedToken) {
      verifyToken(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (authToken: string) => {
    try {
      // Check for simple demo token
      if (authToken.startsWith('demo-token-')) {
        const savedUser = localStorage.getItem('auth-user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser({
            id: 1,
            username: userData.username,
            email: userData.username + '@wedding.com',
            fullName: userData.fullName,
            role: userData.role
          });
          setToken(authToken);
          setIsLoading(false);
          return;
        }
      }

      // Try API verification
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          setToken(authToken);
          localStorage.setItem('auth-token', authToken);
        } else {
          // Token is invalid
          localStorage.removeItem('auth-token');
          localStorage.removeItem('auth-user');
        }
      } else {
        // Token is invalid
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-user');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Don't remove token if it's a demo token and we have user data
      if (!authToken.startsWith('demo-token-') || !localStorage.getItem('auth-user')) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-user');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('auth-token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        // Call logout endpoint
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API call result
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth-token');
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component for protected routes
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-heart text-2xl text-white animate-pulse"></i>
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">🔐 Checking Authentication...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait while we verify your access</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <LoginRequired />;
    }

    return <Component {...props} />;
  };
};
