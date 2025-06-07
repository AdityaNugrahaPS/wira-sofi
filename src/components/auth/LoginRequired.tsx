import { useEffect, useState } from 'react';

interface LoginRequiredProps {
  redirectTo?: string;
  message?: string;
}

const LoginRequired: React.FC<LoginRequiredProps> = ({ 
  redirectTo = '/admin/login',
  message = 'You need to login to access the admin dashboard.'
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = redirectTo;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [redirectTo]);

  const goToLogin = () => {
    window.location.href = '/admin/login';
  };

  const goToPortal = () => {
    window.location.href = '/admin/portal';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full mx-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
          {/* Lock Icon */}
          <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <i className="fas fa-lock text-4xl text-white"></i>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🔐 Access Denied
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6 text-lg">
            {message}
          </p>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <i className="fas fa-info-circle text-yellow-600 mr-2"></i>
              <span className="font-medium text-yellow-800">Authentication Required</span>
            </div>
            <p className="text-yellow-700 text-sm">
              Please login with your admin credentials to continue.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={goToLogin}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-300"
            >
              <i className="fas fa-sign-in-alt mr-3 text-xl"></i>
              🚀 GO TO LOGIN PAGE
            </button>

            <button
              onClick={goToPortal}
              className="w-full flex items-center justify-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <i className="fas fa-home mr-2"></i>
              Back to Admin Portal
            </button>
          </div>

          {/* Countdown */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <p className="text-sm text-gray-600">
              <i className="fas fa-clock mr-2 text-blue-500"></i>
              Auto-redirecting to login page in{' '}
              <span className="font-bold text-blue-600 text-lg">{countdown}</span> seconds
            </p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Login Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-2">
              💡 Quick Login Credentials:
            </p>
            <div className="flex justify-center space-x-2 text-xs">
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">admin/admin</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">demo/123</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Wedding Invitation Management System
          </p>
          <p className="text-gray-400 text-xs mt-1">
            🔐 Secure Admin Access Required
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRequired;
