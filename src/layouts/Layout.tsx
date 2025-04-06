import React, { ReactNode } from "react";
import NavBar from "../components/ui/NavBar";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const cornerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      className="relative bg-[#F7F3ED] h-screen p-5 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Background Gedung with animation */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex justify-center items-end z-0 overflow-hidden"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 0.5,
            y: 0,
            transition: {
              duration: 1.5,
              ease: "easeOut",
            },
          },
        }}
      >
        <img
          src="/public/assets/images/layouts/bgGedung.svg"
          alt="Background Gedung"
          className="w-full h-full object-contain scale-105 object-bottom"
        />
      </motion.div>

      {/* SVG di keempat sudut with staggered animations */}
      <motion.img
        src="/public/assets/images/layouts/sudutKiriAtas.svg"
        alt="Sudut Kiri Atas"
        className="absolute top-0 left-0 m-1 sm:m-2"
        custom={0}
        variants={cornerVariants}
      />
      <motion.img
        src="/public/assets/images/layouts/sudutKananAtas.svg"
        alt="Sudut Kanan Atas"
        className="absolute top-0 right-0 m-1 sm:m-2"
        custom={1}
        variants={cornerVariants}
      />
      <motion.img
        src="/public/assets/images/layouts/sudutKiriBawah.svg"
        alt="Sudut Kiri Bawah"
        className="absolute bottom-0 left-0 m-1 sm:m-2"
        custom={2}
        variants={cornerVariants}
      />
      <motion.img
        src="/public/assets/images/layouts/sudutKananBawah.svg"
        alt="Sudut Kanan Bawah"
        className="absolute bottom-0 right-0 m-1 sm:m-2"
        custom={3}
        variants={cornerVariants}
      />

      {/* Kotak kecil dengan border 5px and animations */}
      <motion.div
        className="absolute top-0 left-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.2, duration: 0.5 },
          },
        }}
      ></motion.div>
      <motion.div
        className="absolute top-0 right-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.3, duration: 0.5 },
          },
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-0 left-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.4, duration: 0.5 },
          },
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-0 right-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.5, duration: 0.5 },
          },
        }}
      ></motion.div>

      {/* Konten Utama with animation */}
      <motion.div
        className="relative z-10 border-[4px] border-[#C2AF93] h-full p-6 sm:p-4 bg-transparent overflow-auto"
        variants={scaleIn}
      >
        {/* Konten yang diterima sebagai children dengan fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const LayoutNavBar: React.FC<LayoutProps> = ({ children }) => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const cornerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      className="relative bg-[#F7F3ED] h-screen p-5 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Background Gedung with animation */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex justify-center items-end z-0 overflow-hidden"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 0.5,
            y: 0,
            transition: {
              duration: 1.5,
              ease: "easeOut",
            },
          },
        }}
      >
        <img
          src="/public/assets/images/layouts/bgGedung.svg"
          alt="Background Gedung"
          className="w-full h-full object-contain scale-105 object-bottom translate-y-[-110px] md:translate-y-0"
        />
      </motion.div>

      {/* SVG di keempat sudut with staggered animations */}
      <motion.img
        src="/public/assets/images/layouts/sudutKiriAtas.svg"
        alt="Sudut Kiri Atas"
        className="absolute top-0 left-0 m-1 sm:m-2"
        custom={0}
        variants={cornerVariants}
      />
      <motion.img
        src="/public/assets/images/layouts/sudutKananAtas.svg"
        alt="Sudut Kanan Atas"
        className="absolute top-0 right-0 m-1 sm:m-2"
        custom={1}
        variants={cornerVariants}
      />
      <motion.img
        src="/public/assets/images/layouts/sudutKiriBawah.svg"
        alt="Sudut Kiri Bawah"
        className="absolute bottom-[11.5vh] sm:bottom-0 left-0 m-1 sm:m-2"
        custom={2}
        variants={cornerVariants}
      />
      <motion.img
        src="/public/assets/images/layouts/sudutKananBawah.svg"
        alt="Sudut Kanan Bawah"
        className="absolute bottom-[11.5vh] sm:bottom-0 right-0 m-1 sm:m-2"
        custom={3}
        variants={cornerVariants}
      />

      {/* Kotak kecil dengan border 5px and animations */}
      <motion.div
        className="absolute top-0 left-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.2, duration: 0.5 },
          },
        }}
      ></motion.div>
      <motion.div
        className="absolute top-0 right-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.3, duration: 0.5 },
          },
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-[11.5%] sm:bottom-0 left-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.4, duration: 0.5 },
          },
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-[11.5%] sm:bottom-0 right-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.5, duration: 0.5 },
          },
        }}
      ></motion.div>

      {/* Konten Utama with animation */}
      <motion.div
        className="relative z-10 border-[4px] border-[#C2AF93] h-[84vh] sm:h-full p-2 sm:p-4 pb-[70px] bg-transparent overflow-auto"
        variants={scaleIn}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="pl-14 sm:pl-[100px] pr-4" // Padding kiri responsif
        >
          {children}
        </motion.div>

        <motion.div
          className="fixed inset-0 flex items-center justify-start overflow-hidden ml-10 sm:ml-16"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 1,
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
        >
          <NavBar />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export { Layout, LayoutNavBar };
