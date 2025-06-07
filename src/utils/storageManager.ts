// Storage manager with private mode detection and fallbacks
export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  storageType?: 'localStorage' | 'sessionStorage' | 'memory';
}

export interface StorageQuota {
  used: number;
  available: number;
  percentage: number;
  canStore: boolean;
}

class StorageManager {
  private memoryStorage: Map<string, string> = new Map();
  private isPrivateMode: boolean | null = null;
  private storageType: 'localStorage' | 'sessionStorage' | 'memory' = 'localStorage';

  constructor() {
    this.detectPrivateMode();
  }

  // Detect private mode and set appropriate storage
  private async detectPrivateMode(): Promise<boolean> {
    if (this.isPrivateMode !== null) {
      return this.isPrivateMode;
    }

    try {
      // Test localStorage availability
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      
      // Test quota (private mode often has very limited quota)
      const quota = await this.getStorageQuota();
      if (quota && quota.available < 1024 * 1024) { // Less than 1MB available
        throw new Error('Limited storage detected');
      }
      
      this.isPrivateMode = false;
      this.storageType = 'localStorage';
    } catch (error) {
      console.warn('Private mode or limited storage detected, falling back to sessionStorage');
      
      try {
        // Test sessionStorage
        const testKey = '__session_test__';
        sessionStorage.setItem(testKey, 'test');
        sessionStorage.removeItem(testKey);
        
        this.isPrivateMode = true;
        this.storageType = 'sessionStorage';
      } catch (sessionError) {
        console.warn('SessionStorage also unavailable, using memory storage');
        this.isPrivateMode = true;
        this.storageType = 'memory';
      }
    }

    return this.isPrivateMode;
  }

  // Get storage quota information
  async getStorageQuota(): Promise<StorageQuota | null> {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        const used = estimate.usage || 0;
        const available = estimate.quota || 0;
        const percentage = available > 0 ? (used / available) * 100 : 0;
        
        return {
          used,
          available,
          percentage,
          canStore: percentage < 90 // Can store if less than 90% full
        };
      }
      
      // Fallback: estimate localStorage usage
      let totalSize = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length + key.length;
        }
      }
      
      const estimatedQuota = 5 * 1024 * 1024; // 5MB typical limit
      const percentage = (totalSize / estimatedQuota) * 100;
      
      return {
        used: totalSize,
        available: estimatedQuota,
        percentage,
        canStore: percentage < 90
      };
    } catch (error) {
      console.warn('Could not estimate storage quota:', error);
      return null;
    }
  }

  // Set item with fallback handling
  async setItem<T>(key: string, value: T): Promise<StorageResult<T>> {
    await this.detectPrivateMode();
    
    const stringValue = JSON.stringify(value);
    
    // Check storage quota before saving
    const quota = await this.getStorageQuota();
    if (quota && !quota.canStore) {
      return {
        success: false,
        error: 'Storage quota exceeded. Please clear some data or export your current data.',
        storageType: this.storageType
      };
    }

    try {
      switch (this.storageType) {
        case 'localStorage':
          localStorage.setItem(key, stringValue);
          break;
        case 'sessionStorage':
          sessionStorage.setItem(key, stringValue);
          break;
        case 'memory':
          this.memoryStorage.set(key, stringValue);
          break;
      }

      return {
        success: true,
        data: value,
        storageType: this.storageType
      };
    } catch (error) {
      // If localStorage fails, try sessionStorage
      if (this.storageType === 'localStorage') {
        try {
          sessionStorage.setItem(key, stringValue);
          this.storageType = 'sessionStorage';
          return {
            success: true,
            data: value,
            storageType: 'sessionStorage'
          };
        } catch (sessionError) {
          // Fall back to memory storage
          this.memoryStorage.set(key, stringValue);
          this.storageType = 'memory';
          return {
            success: true,
            data: value,
            storageType: 'memory'
          };
        }
      }

      return {
        success: false,
        error: `Storage failed: ${(error as Error).message}`,
        storageType: this.storageType
      };
    }
  }

  // Get item with fallback handling
  async getItem<T>(key: string): Promise<StorageResult<T>> {
    await this.detectPrivateMode();

    try {
      let stringValue: string | null = null;

      switch (this.storageType) {
        case 'localStorage':
          stringValue = localStorage.getItem(key);
          break;
        case 'sessionStorage':
          stringValue = sessionStorage.getItem(key);
          break;
        case 'memory':
          stringValue = this.memoryStorage.get(key) || null;
          break;
      }

      if (stringValue === null) {
        return {
          success: false,
          error: 'Item not found',
          storageType: this.storageType
        };
      }

      const data = JSON.parse(stringValue) as T;
      return {
        success: true,
        data,
        storageType: this.storageType
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to retrieve data: ${(error as Error).message}`,
        storageType: this.storageType
      };
    }
  }

  // Remove item
  async removeItem(key: string): Promise<StorageResult<void>> {
    await this.detectPrivateMode();

    try {
      switch (this.storageType) {
        case 'localStorage':
          localStorage.removeItem(key);
          break;
        case 'sessionStorage':
          sessionStorage.removeItem(key);
          break;
        case 'memory':
          this.memoryStorage.delete(key);
          break;
      }

      return {
        success: true,
        storageType: this.storageType
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to remove item: ${(error as Error).message}`,
        storageType: this.storageType
      };
    }
  }

  // Clear all storage
  async clear(): Promise<StorageResult<void>> {
    await this.detectPrivateMode();

    try {
      switch (this.storageType) {
        case 'localStorage':
          localStorage.clear();
          break;
        case 'sessionStorage':
          sessionStorage.clear();
          break;
        case 'memory':
          this.memoryStorage.clear();
          break;
      }

      return {
        success: true,
        storageType: this.storageType
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to clear storage: ${(error as Error).message}`,
        storageType: this.storageType
      };
    }
  }

  // Get storage info
  getStorageInfo() {
    return {
      isPrivateMode: this.isPrivateMode,
      storageType: this.storageType,
      isMemoryOnly: this.storageType === 'memory'
    };
  }

  // Check if storage is persistent
  async isStoragePersistent(): Promise<boolean> {
    if (this.storageType === 'memory') return false;
    if (this.storageType === 'sessionStorage') return false;
    
    try {
      if ('storage' in navigator && 'persist' in navigator.storage) {
        return await navigator.storage.persist();
      }
      return true; // Assume persistent if API not available
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const storageManager = new StorageManager();
