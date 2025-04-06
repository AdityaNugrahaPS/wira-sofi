import { motion } from 'framer-motion';

const Thanks = () => {
  // Container variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.4
      }
    }
  };

  // Child variants for elements inside the container
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  // Enhanced name variants with smoother appearance
  const nameVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 50,
        delay: 1.8,
        duration: 1.5
      }
    }
  };

  return (
    <div
      className="font-ovo flex flex-col items-center justify-start min-h-screen pt-20 sm:pt-24"
      style={{
        textAlign: "center",
        padding: "20px",
        color: "#644F44",
      }}
    >
      <motion.div
        className="flex flex-col items-center justify-start w-full"
        style={{
          marginTop: "35vh",
          transform: "translateY(-35%)",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Heading with improved animation */}
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
          variants={itemVariants}
        >
          We would like to thank you for sharing in our wedding celebration.
        </motion.h1>

        {/* Paragraph with smooth animation */}
        <motion.p
          className="text-sm md:text-base lg:text-lg xl:text-xl mt-4"
          variants={itemVariants}
        >
          We are grateful for your presence, warm wishes, and your generous
          gift. We look forward to our future together and to making more
          memories with you.
        </motion.p>

        {/* "See You On Our Big Day" with subtle hover effect */}
        <motion.div
          className="mt-8 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p>See You On Our Big Day</p>
        </motion.div>

        {/* Names with enhanced smooth animation */}
        <motion.div
          className="font-angelaWhite text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-8 overflow-hidden"
          style={{
            color: "#644F44",
          }}
          variants={nameVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 200, damping: 10 }
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { 
                duration: 2,
                ease: "easeInOut",
                delay: 2
              }
            }}
          >
            Wira & Sofi
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Thanks;