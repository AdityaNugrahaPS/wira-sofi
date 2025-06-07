import { useEffect } from "react";
import { useWedding } from "../../contexts/WeddingContext";
import { useGuestName } from "../../hooks/useGuestName";

const Opening = () => {
  const { weddingData, isLoading } = useWedding();
  const { displayName: guestName } = useGuestName();

  // Optional: Update context if needed for other components
  // This is for backward compatibility
  useEffect(() => {
    // You can add logic here if other components still need the context
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p style={{ color: "#644F44" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f8f6f3 0%, #f1ede8 50%, #ede7e0 100%)",
        fontFamily: "Ovo, serif",
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full opacity-15 blur-lg"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Guest Name */}
        <div className="mb-8 animate-fade-in">
          <p className="text-sm text-gray-600 mb-2 tracking-wide">
            Kepada Yth.
          </p>
          <h3
            className="text-lg font-medium px-4 py-2 bg-white/40 backdrop-blur-sm rounded-lg shadow-sm border border-white/60"
            style={{ color: "#644F44" }}
          >
            {guestName}
          </h3>
        </div>

        {/* Wedding Title */}
        <div className="mb-12 animate-slide-up">
          <h1
            className="text-2xl md:text-3xl font-light mb-8 tracking-wider opacity-80"
            style={{ color: "#644F44" }}
          >
            The Wedding of
          </h1>

          {/* Couple Names */}
          <div className="relative">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4"
              style={{
                color: "#644F44",
                textShadow: "0 2px 4px rgba(100, 79, 68, 0.1)",
              }}
            >
              {weddingData.couple.groomFirstName}
            </h2>

            {/* Ampersand with decorative elements */}
            <div className="flex items-center justify-center my-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
              <span
                className="mx-4 text-2xl font-light opacity-70"
                style={{ color: "#644F44" }}
              >
                &
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-normal"
              style={{
                color: "#644F44",
                textShadow: "0 2px 4px rgba(100, 79, 68, 0.1)",
              }}
            >
              {weddingData.couple.brideFirstName}
            </h2>
          </div>
        </div>



        {/* Decorative Bottom Element */}
        <div className="mt-16 flex justify-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-50"></div>
        </div>
      </div>

      {/* Floating Particles Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-amber-200 rounded-full animate-float-slow opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-rose-200 rounded-full animate-float-slower opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-yellow-200 rounded-full animate-float opacity-50"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ovo:wght@400&display=swap');

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.2s both;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.4s both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.8s both;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Opening;