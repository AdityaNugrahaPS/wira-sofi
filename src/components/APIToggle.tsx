import React, { useState } from 'react';
import { useWedding } from '../contexts/WeddingContext';

const APIToggle: React.FC = () => {
  const { useAPI, isOnline, toggleAPIMode, syncWithAPI } = useWedding();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleToggleAPI = () => {
    if (!useAPI && !apiService.isAuthenticated()) {
      setShowLoginForm(true);
    } else {
      toggleAPIMode();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setSyncMessage('');

    try {
      const result = await apiService.login(loginData.username, loginData.password);
      
      if (result.success) {
        setSyncMessage('✅ Login successful!');
        setShowLoginForm(false);
        toggleAPIMode(); // Enable API mode after successful login
        setLoginData({ username: '', password: '' });
      } else {
        setSyncMessage(`❌ Login failed: ${result.error}`);
      }
    } catch (error) {
      setSyncMessage(`❌ Login error: ${(error as Error).message}`);
    } finally {
      setIsLoggingIn(false);
      setTimeout(() => setSyncMessage(''), 5000);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage('');

    try {
      await syncWithAPI();
      setSyncMessage('✅ Data synced successfully!');
    } catch (error) {
      setSyncMessage(`❌ Sync failed: ${(error as Error).message}`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(''), 5000);
    }
  };

  const handleLogout = () => {
    apiService.logout();
    toggleAPIMode(); // Disable API mode after logout
    setSyncMessage('✅ Logged out successfully');
    setTimeout(() => setSyncMessage(''), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-200 p-6" style={{ fontFamily: 'Ovo, serif' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <i className={`fas ${isOnline ? 'fa-wifi' : 'fa-wifi-slash'} text-2xl mr-3 ${isOnline ? 'text-green-600' : 'text-red-600'}`}></i>
          <div>
            <h3 className="text-xl font-bold text-blue-800">Database Connection</h3>
            <p className="text-blue-700 text-sm">
              {isOnline ? 'Online' : 'Offline'} • {useAPI ? 'MySQL Database' : 'Local Storage'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-blue-700">Local</span>
          <button
            onClick={handleToggleAPI}
            disabled={!isOnline}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${
              useAPI ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                useAPI ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm text-blue-700">MySQL</span>
        </div>
      </div>

      {/* Status Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
          <div className={`text-2xl mb-1 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            <i className={`fas ${isOnline ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
          </div>
          <p className="text-sm font-medium text-blue-800">Connection</p>
          <p className="text-xs text-blue-600">{isOnline ? 'Online' : 'Offline'}</p>
        </div>
        
        <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
          <div className={`text-2xl mb-1 ${apiService.isAuthenticated() ? 'text-green-600' : 'text-gray-400'}`}>
            <i className={`fas ${apiService.isAuthenticated() ? 'fa-user-check' : 'fa-user-slash'}`}></i>
          </div>
          <p className="text-sm font-medium text-blue-800">Authentication</p>
          <p className="text-xs text-blue-600">{apiService.isAuthenticated() ? 'Logged In' : 'Not Logged In'}</p>
        </div>
        
        <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
          <div className={`text-2xl mb-1 ${useAPI ? 'text-blue-600' : 'text-amber-600'}`}>
            <i className={`fas ${useAPI ? 'fa-database' : 'fa-hdd'}`}></i>
          </div>
          <p className="text-sm font-medium text-blue-800">Storage</p>
          <p className="text-xs text-blue-600">{useAPI ? 'MySQL' : 'Local'}</p>
        </div>
      </div>

      {/* Login Form */}
      {showLoginForm && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">Login to MySQL Database</h4>
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </button>
              <button
                type="button"
                onClick={() => setShowLoginForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Action Buttons */}
      {useAPI && apiService.isAuthenticated() && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={handleSync}
            disabled={!isOnline || isSyncing}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <i className={`fas ${isSyncing ? 'fa-spinner fa-spin' : 'fa-sync-alt'} mr-2`}></i>
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </button>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>
      )}

      {/* Status Message */}
      {syncMessage && (
        <div className={`p-3 rounded-lg text-sm ${
          syncMessage.includes('✅') 
            ? 'bg-green-100 text-green-800 border border-green-300'
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {syncMessage}
        </div>
      )}

      {/* Information */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h5 className="font-semibold text-blue-800 mb-2">Storage Modes:</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Local Storage:</strong> Data saved in browser (offline-first)</li>
          <li>• <strong>MySQL Database:</strong> Data saved to server (requires login)</li>
          <li>• <strong>Hybrid Mode:</strong> Automatic sync when online</li>
        </ul>
      </div>
    </div>
  );
};

export default APIToggle;
