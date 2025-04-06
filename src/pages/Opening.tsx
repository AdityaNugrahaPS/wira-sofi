import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Opening = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-start overflow-hidden">
      <div className="fixed inset-0 w-full h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Tulisan Jepang & Tanggal */}
        <div
          className="absolute top-10 right-20 sm:top-8 sm:right-8 md:top-16 md:right-16 flex items-start space-x-2 sm:space-x-3"
          data-aos="fade-down"
        >
          <span className="font-ovo text-sm sm:text-lg md:text-2xl text-[#644F44]">
            26 September 2025
          </span>
          <img
            src="/public/assets/images/intro/tulisanJepang.svg"
            alt="Tulisan Jepang"
            className="w-12 sm:w-16 md:w-24 lg:w-32 xl:w-40"
          />
        </div>
        {/* Bagian Tengah (Wedding Intro) */}
        <div
          className="flex flex-col items-center text-center px-2 sm:px-4 -mt-4 sm:mt-0 md:scale-125"
          data-aos="fade-up"
        >
          <h2 className="font-ovo text-[16px] sm:text-[20px] md:text-[24px] text-[#644F44]">
            The Wedding of
          </h2>
          <h1 className="font-angelaWhite text-[50px] sm:text-[55px] md:text-[85px] text-[#644F44] leading-tight mt-2">
            <span className="block">Wira</span>
            <span className="block ml-6 sm:ml-8 md:ml-12">and</span>
            <span className="block ml-12 sm:ml-16 md:ml-24">Sofi</span>
          </h1>
          <p className="font-ovo text-[14px] sm:text-[18px] md:text-[22px] text-[#644F44] mt-3">
            Kepada Yth. <br />
            Bapak/Ibu/Saudara/i
          </p>
          <h2 className="font-ovo text-[24px] sm:text-[35px] md:text-[50px] text-[#644F44] mt-2">
            NAMA TAMU
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Opening;