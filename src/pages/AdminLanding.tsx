import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminLanding = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/admin';
    }
  }, [isAuthenticated]);

  const goToLogin = () => {
    window.location.href = '/admin/login';
  };

  const goToMainSite = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12">
            {/* Header */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-heart text-4xl text-white animate-pulse"></i>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Wedding Admin Portal
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                ✨ Manage your special day with love ✨
              </p>
              <p className="text-gray-500">
                Complete wedding invitation management system with MySQL integration
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-200">
                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-white text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Guest Management</h3>
                <p className="text-sm text-gray-600">Manage guest list, RSVP tracking, and personal invitation URLs</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-cog text-white text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Wedding Settings</h3>
                <p className="text-sm text-gray-600">Configure wedding details, venue, date, and couple information</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-database text-white text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Real-time Database</h3>
                <p className="text-sm text-gray-600">MySQL integration with secure authentication and activity logging</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={goToLogin}
                className="w-full max-w-md mx-auto flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-xl rounded-xl shadow-lg hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <i className="fas fa-sign-in-alt mr-3 text-2xl"></i>
                <span>🚀 LOGIN TO ADMIN DASHBOARD</span>
              </button>

              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={goToMainSite}
                  className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  <i className="fas fa-home mr-2"></i>
                  View Wedding Invitation
                </button>

                <a
                  href="http://localhost:3001/api/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-500/80 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-green-600 transition-all duration-200"
                >
                  <i className="fas fa-heartbeat mr-2"></i>
                  API Status
                </a>
              </div>
            </div>

            {/* Quick Login Info */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center justify-center">
                <i className="fas fa-key text-purple-500 mr-2"></i>
                🎯 Quick Login Credentials
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="font-medium text-purple-600">Super Admin</div>
                  <div className="text-gray-600">admin / admin</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="font-medium text-pink-600">Groom</div>
                  <div className="text-gray-600">wira / wira123</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="font-medium text-blue-600">Bride</div>
                  <div className="text-gray-600">sofi / sofi123</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="font-medium text-green-600">Demo</div>
                  <div className="text-gray-600">demo / 123</div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Frontend Ready
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                API Server Running
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                MySQL Connected
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Wedding Invitation Management System v2.0
            </p>
            <p className="text-gray-400 text-xs mt-1">
              🔐 Secure • 🗄️ MySQL • 🚀 Real-time • 💒 Production Ready
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
