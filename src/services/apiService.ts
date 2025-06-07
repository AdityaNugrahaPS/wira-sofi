// Simple API Service for MySQL Integration
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001/api') {
    this.baseUrl = baseUrl;
  }

  // Helper method for API calls
  private async apiCall(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // Guest Management APIs
  async getGuests() {
    try {
      const data = await this.apiCall('/guests');
      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async addGuest(guestData: {
    guestName: string;
    guestEmail?: string;
    guestPhone?: string;
    guestCount: number;
  }) {
    try {
      const data = await this.apiCall('/guests', {
        method: 'POST',
        body: JSON.stringify(guestData),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async updateGuest(guestId: string, guestData: any) {
    try {
      const data = await this.apiCall(`/guests/${guestId}`, {
        method: 'PUT',
        body: JSON.stringify(guestData),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async deleteGuest(guestId: string) {
    try {
      const data = await this.apiCall(`/guests/${guestId}`, {
        method: 'DELETE',
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  // RSVP APIs
  async submitRsvp(rsvpData: {
    guestName: string;
    guestEmail?: string;
    guestPhone?: string;
    attendanceStatus: string;
    guestCount: number;
    message?: string;
  }) {
    try {
      const data = await this.apiCall('/rsvp', {
        method: 'POST',
        body: JSON.stringify(rsvpData),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async getRsvpResponses() {
    try {
      const data = await this.apiCall('/rsvp');
      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  // Wedding Settings APIs
  async getWeddingSettings() {
    try {
      const data = await this.apiCall('/wedding-settings');
      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async updateWeddingSettings(settingsData: any) {
    try {
      const data = await this.apiCall('/wedding-settings', {
        method: 'POST',
        body: JSON.stringify(settingsData),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  // Test connection
  async testConnection() {
    try {
      const data = await this.apiCall('/health');
      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}

export default ApiService;
