import React from 'react';
import { Link } from 'react-router-dom';  // Importez Link depuis react-router-dom

const AnimatedBrand = ({ handleShowVente }) => {
  return (
    <div className="w-full h-[45vh] flex flex-col items-center justify-center relative bg-white">
      <div className="navbar-brand text-4xl font-semibold w-full text-center">
        <span className="forsa typing-effect text-[#f68E93] animate__animated animate__fadeIn animate__delay-1s text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
          Forsa
        </span>
        <span className="market typing-effect text-[#6adbd5] animate__animated animate__fadeIn animate__delay-2s text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
          Market
        </span>
      </div>
      <Link to="/api/products/add">
        <button
          className="btn bg-[#6adbd5] text-white ms-2 mt-4 mb-8 px-6 py-2 rounded-lg hover:bg-[#f68E93] transition-colors animate-moveUpDown"
          onClick={handleShowVente}
        >
          Vente
        </button>
      </Link>
    </div>
  );
};

export default AnimatedBrand;
