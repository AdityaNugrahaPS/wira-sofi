import { motion } from "framer-motion";

const Rsvp = () => {
  return (
    <div className="min-h-screen flex items-start lg:items-center justify-center bg-transparent px-4 text-[#644F44] font-ovo text-center pt-20 lg:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">RSVP</h2>
        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir. <br />
          (Q. S AR-Rum : 21)
        </p>
        <p className="mt-8 text-base sm:text-lg md:text-xl">
          Tekan tombol dibawah ini untuk mengirim ucapan dan konfirmasi kehadiran
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#AB916C] text-white text-base sm:text-xl md:text-2xl font-semibold px-6 sm:px-10 md:px-12 py-3 sm:py-5 md:py-6 rounded-full mt-8 transition-transform duration-300 hover:bg-[#927856]"
        >
          Konfirmasi & Kirim Ucapan
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Rsvp;
