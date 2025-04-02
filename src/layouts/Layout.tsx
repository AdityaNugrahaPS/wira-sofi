import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative bg-[#F7F3ED] h-screen p-5 overflow-hidden">
      {/* Background Gedung yang responsif dan sedikit zoom out */}
      <div className="pointer-events-none absolute inset-0 flex justify-center items-end z-0 overflow-hidden">
        <img
          src="/public/images/layouts/bgGedung.svg"
          alt="Background Gedung"
          className="w-full h-full object-contain opacity-50 scale-105 object-bottom"
        />
      </div>

      {/* SVG di keempat sudut */}
      <img
        src="/public/images/layouts/sudutKiriAtas.svg"
        alt="Sudut Kiri Atas"
        className="absolute top-0 left-0 m-1 sm:m-2"
      />
      <img
        src="/public/images/layouts/sudutKananAtas.svg"
        alt="Sudut Kanan Atas"
        className="absolute top-0 right-0 m-1 sm:m-2"
      />
      <img
        src="/public/images/layouts/sudutKiriBawah.svg"
        alt="Sudut Kiri Bawah"
        className="absolute bottom-0 left-0 m-1 sm:m-2"
      />
      <img
        src="/public/images/layouts/sudutKananBawah.svg"
        alt="Sudut Kanan Bawah"
        className="absolute bottom-0 right-0 m-1 sm:m-2"
      />

      {/* Kotak kecil dengan border 5px */}
      <div className="absolute top-0 left-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"></div>
      <div className="absolute top-0 right-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 m-2 sm:m-2 w-10 h-10 border-[5px] border-[#BAA485] pointer-events-none"></div>

      {/* Konten Utama */}
      <div className="relative z-10 border-[4px] border-[#C2AF93] h-full p-6 sm:p-4 bg-transparent overflow-auto">
        {/* Konten yang diterima sebagai children */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
