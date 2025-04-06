import { MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Invited = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-full px-4 mt-10 lg:mt-[20vh] font-[Ovo] text-[#644F44] relative z-10">
      {/* Konten kiri */}
      <motion.div
        className="w-full max-w-xl space-y-4 lg:space-y-8 lg:mr-8 lg:items-center lg:flex lg:flex-col"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-5xl font-bold text-center">Lokasi</h2>

        {/* Desktop: info lokasi & kalender */}
        <div className="hidden lg:block space-y-6 text-base lg:text-2xl">
          <div className="flex items-start space-x-4">
            <MapPin className="text-[#AA926B] mt-1 w-6 h-6" />
            <p>
              Gedung C Teknik, Universitas Riau<br />
              Jl. HR. Soebrantas, Simpang Baru, Kec. Tampan,<br />
              Kota Pekanbaru, Riau
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <Calendar className="text-[#AA926B] mt-1 w-6 h-6" />
            <div>
              <p>
                Jumat, 26 September 2025<br />
                Akad Nikah: 12.00 WIB
              </p>
            </div>
          </div>

          <div className="flex justify-center relative z-10">
            <motion.a
              href="https://maps.app.goo.gl/7Wm5kac16ctuSQah8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#AB916C] text-white text-sm sm:text-lg md:text-xl px-5 sm:px-8 md:px-10 py-2 sm:py-4 md:py-5 rounded-full mt-6 transition-transform duration-300 transform hover:scale-105 hover:bg-[#927856]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buka Map
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Gambar map */}
      <motion.div
        className="w-full max-w-xl relative mt-4 lg:mt-0 z-0"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <img
          src="/assets/images/invited/maps.png"
          alt="Peta Fakultas Teknik UR"
          className="w-full rounded-xl border pointer-events-none"
          style={{ borderColor: '#AA926B', borderWidth: '5px' }}
        />
      </motion.div>

      {/* Mobile: info lokasi & kalender */}
      <motion.div
        className="block lg:hidden w-full max-w-xl mt-6 space-y-6 text-base"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-start space-x-3">
          <MapPin className="text-[#AA926B] mt-1" />
          <p>
            Gedung C Teknik, Universitas Riau<br />
            Jl. HR. Soebrantas, Simpang Baru, Kec. Tampan,<br />
            Kota Pekanbaru, Riau
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <Calendar className="text-[#AA926B] mt-1" />
          <div>
            <p>
              Jumat, 26 September 2025<br />
              Akad Nikah: 12.00 WIB
            </p>
          </div>
        </div>

        <div className="flex justify-center relative z-10">
          <motion.a
            href="https://maps.app.goo.gl/7Wm5kac16ctuSQah8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#AB916C] text-white text-sm px-5 py-3 rounded-full mt-2 transition-transform duration-300 transform hover:scale-105 hover:bg-[#927856]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Buka Map
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default Invited;
