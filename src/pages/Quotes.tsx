import { motion } from "framer-motion";

const Quotes = () => {
  return (
    <div className="fixed inset-0 flex items-start justify-center px-1 sm:px-4 pt-[30%] md:pt-16 lg:pt-20 overflow-hidden z-0">
      <div className="w-[85%] sm:w-full max-w-6xl h-auto max-h-[70vh] md:max-h-[75vh] lg:max-h-[80vh] bg-[#AB916C] text-white font-['Ovo'] p-3 sm:p-6 md:p-10 rounded-lg sm:rounded-2xl shadow-xl relative overflow-hidden z-10">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-12 sm:w-24 h-12 sm:h-24 opacity-10 pointer-events-none z-0">
          <svg viewBox="0 0 100 100" fill="white">
            <path d="M95,30 Q100,5 75,10 Q50,15 45,40 Q40,65 65,60 Q90,55 95,30 Z" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 opacity-10 pointer-events-none z-0">
          <svg viewBox="0 0 100 100" fill="white">
            <path d="M95,30 Q100,5 75,10 Q50,15 45,40 Q40,65 65,60 Q90,55 95,30 Z" />
          </svg>
        </div>
        
        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-8 relative z-10 h-full">
          {/* Image */}
          <div className="md:w-1/2 w-full">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 4, x: 10 }} 
              transition={{ type: "spring", stiffness: 300 }}
              className="rotate-1 sm:rotate-2 rounded-lg sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border-2 sm:border-4 border-white/30 z-10"
            >
              <img 
                src="/assets/images/quotes/quotes.png" 
                alt="Quotes" 
                className="w-full h-auto object-cover" 
              />
            </motion.div>
          </div>
          
          {/* Text */}
          <div className="md:w-1/2 w-full text-center md:text-left mt-1 md:mt-0">
            <div className="text-3xl sm:text-5xl md:text-6xl font-serif text-white/30 leading-none mb-1 sm:mb-3">"</div>
            <p className="text-xs sm:text-sm md:text-lg lg:text-2xl leading-tight sm:leading-relaxed text-justify">
              Setiap langkah dalam pernikahan adalah peluang untuk memperkuat cinta dan komitmen kita satu sama lain, membentuk fondasi yang kokoh untuk masa depan yang gemilang bersama.
            </p>
            <div className="text-3xl sm:text-5xl md:text-6xl font-serif text-white/30 leading-none text-right mt-1 sm:mt-3">"</div>
            <div className="mt-1 sm:mt-4 flex justify-center md:justify-start items-center">
              <div className="h-px w-8 sm:w-16 bg-white/50 mr-2 sm:mr-4"></div>
              <p className="italic text-xs sm:text-sm">Wedding Vows</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;