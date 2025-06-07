import { useWedding } from "../../contexts/WeddingContext";

const Story = () => {
  const { weddingData, isLoading } = useWedding();
  const storySettings = weddingData.storySettings;

  // Get active timeline items
  const activeTimelineItems = storySettings.timelineItems.filter(item => item.isActive);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p style={{ color: "#644F44" }}>Loading story...</p>
        </div>
      </div>
    );
  }

  // If no active timeline items, show default message
  if (activeTimelineItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p style={{ color: "#644F44" }}>No story timeline available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f8f6f3 0%, #f1ede8 50%, #ede7e0 100%)",
        fontFamily: "Ovo, serif",
      }}
    >
      {/* Enhanced Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating elements */}
        <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 rounded-full opacity-15 blur-3xl animate-float-slower"></div>
        <div className="absolute bottom-32 right-20 w-56 h-56 bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 rounded-full opacity-20 blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 rounded-full opacity-12 blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-44 h-44 bg-gradient-to-br from-purple-100 via-violet-100 to-pink-100 rounded-full opacity-18 blur-2xl animate-float-slower"></div>
        
        {/* Medium floating elements */}
        <div className="absolute top-1/6 right-1/5 w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full opacity-10 blur-xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full opacity-15 blur-xl animate-float"></div>
      </div>

      {/* Ornamental Design Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner decorations */}
        <div className="absolute top-12 left-12">
          <div className="w-24 h-24 border-l-2 border-t-2 border-rose-200 opacity-30 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-rose-300 rounded-full opacity-50"></div>
          </div>
        </div>
        <div className="absolute top-12 right-12">
          <div className="w-24 h-24 border-r-2 border-t-2 border-purple-200 opacity-30 relative">
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-300 rounded-full opacity-50"></div>
          </div>
        </div>
        <div className="absolute bottom-12 left-12">
          <div className="w-24 h-24 border-l-2 border-b-2 border-emerald-200 opacity-30 relative">
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-emerald-300 rounded-full opacity-50"></div>
          </div>
        </div>
        <div className="absolute bottom-12 right-12">
          <div className="w-24 h-24 border-r-2 border-b-2 border-amber-200 opacity-30 relative">
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-300 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex items-center justify-center mb-10">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
            <div className="mx-8 flex space-x-4">
              <div className="w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-pink-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-150"></div>
              <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse delay-300"></div>
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse delay-450"></div>
            </div>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
          </div>
          
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-wider"
            style={{
              color: "#644F44",
              textShadow: "0 2px 8px rgba(100, 79, 68, 0.1)"
            }}
          >
            {storySettings.headerTitle}
          </h1>

          <p
            className="text-lg md:text-xl tracking-wide opacity-70 italic max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#644F44" }}
          >
            {storySettings.headerSubtitle}
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-60"></div>
            <div className="mx-4 w-2 h-2 bg-rose-300 rounded-full opacity-50"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-60"></div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-200 via-rose-200 to-emerald-200 transform -translate-x-1/2 opacity-40 rounded-full"></div>
          
          {/* Timeline Items */}
          {activeTimelineItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative mb-16 animate-fade-in-up`}
              style={{ animationDelay: `${0.5 + index * 0.3}s` }}
            >
              {/* Timeline Node */}
              <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-20">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-xl border-4 border-white animate-pulse`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                
                {/* Year Badge */}
                <div 
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/60"
                  style={{ color: "#644F44" }}
                >
                  <span className="text-sm font-medium tracking-wide">{item.year}</span>
                </div>
              </div>

              {/* Content Card */}
              <div className={`flex ${index % 2 === 0 ? 'justify-start pr-1/2' : 'justify-end pl-1/2'}`}>
                <div className={`w-full max-w-md ${index % 2 === 0 ? 'mr-12' : 'ml-12'}`}>
                  <div className="relative">
                    {/* Card Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} backdrop-blur-lg rounded-3xl shadow-xl border border-white/40`}></div>
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl"></div>
                    
                    {/* Card Content */}
                    <div className="relative z-10 p-8">
                      {/* Title */}
                      <h3 
                        className="text-2xl md:text-3xl font-light mb-3 tracking-wide"
                        style={{ color: "#644F44" }}
                      >
                        {item.title}
                      </h3>
                      
                      {/* Date */}
                      <div className="mb-6">
                        <span 
                          className="inline-block px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium tracking-wide shadow-sm border border-white/60"
                          style={{ color: "#644F44" }}
                        >
                          {item.date}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p 
                        className="text-base leading-relaxed opacity-80"
                        style={{ color: "#644F44" }}
                      >
                        {item.description}
                      </p>
                      
                      {/* Decorative Line */}
                      <div className="flex items-center mt-6">
                        <div className={`w-12 h-px bg-gradient-to-r ${item.color.replace('from-', 'via-').replace('to-', 'to-transparent from-transparent')} opacity-60`}></div>
                        <div className={`mx-3 w-2 h-2 bg-gradient-to-br ${item.color} rounded-full opacity-50`}></div>
                        <div className={`w-12 h-px bg-gradient-to-l ${item.color.replace('from-', 'via-').replace('to-', 'to-transparent from-transparent')} opacity-60`}></div>
                      </div>
                    </div>
                    
                    {/* Card decorative elements */}
                    <div className={`absolute -top-2 ${index % 2 === 0 ? '-right-2' : '-left-2'} w-5 h-5 bg-gradient-to-br ${item.color} rounded-full opacity-60`}></div>
                    <div className={`absolute -bottom-2 ${index % 2 === 0 ? '-left-2' : '-right-2'} w-3 h-3 bg-gradient-to-br ${item.color} rounded-full opacity-40`}></div>
                  </div>
                </div>
              </div>

              {/* Connection Line to Timeline */}
              <div className={`absolute top-12 ${index % 2 === 0 ? 'left-1/2 ml-8' : 'right-1/2 mr-8'} w-8 h-1 bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} ${item.color.replace('from-', 'from-transparent via-').replace('to-', 'to-transparent')} opacity-40 rounded-full`}></div>
            </div>
          ))}
        </div>

      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/5 left-1/6 w-2 h-2 bg-rose-300 rounded-full animate-float-slow opacity-60"></div>
        <div className="absolute top-1/4 right-1/5 w-1.5 h-1.5 bg-pink-300 rounded-full animate-float opacity-50"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-float-slower opacity-55"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-float opacity-45"></div>
        <div className="absolute bottom-1/4 right-1/6 w-2 h-2 bg-amber-300 rounded-full animate-float-slow opacity-50"></div>
        <div className="absolute top-1/3 left-2/3 w-1.5 h-1.5 bg-rose-300 rounded-full animate-float-slower opacity-60"></div>
        
        {/* Heart shapes floating */}
        <div className="absolute top-1/6 right-1/4 w-3 h-3 bg-rose-300 opacity-25 animate-pulse transform rotate-12" style={{clipPath: 'polygon(50% 15%, 15% 40%, 50% 85%, 85% 40%)'}}></div>
        <div className="absolute bottom-1/5 left-1/3 w-2.5 h-2.5 bg-pink-300 opacity-20 animate-pulse delay-150 transform -rotate-12" style={{clipPath: 'polygon(50% 15%, 15% 40%, 50% 85%, 85% 40%)'}}></div>
        <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-purple-300 opacity-30 animate-pulse delay-300" style={{clipPath: 'polygon(50% 15%, 15% 40%, 50% 85%, 85% 40%)'}}></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ovo:wght@400&display=swap');

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 1.5s ease-out both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out both;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }
        
        .pl-1\/2 {
          padding-left: 50%;
        }
        
        .pr-1\/2 {
          padding-right: 50%;
        }
      `}</style>
    </div>
  );
};

export default Story;