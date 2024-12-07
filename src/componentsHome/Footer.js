import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import des icônes React

const Footer = () => {
  return (
    <footer className="bg-[#6adbd5] text-white py-10">
      <div className="container mx-auto px-6">
        {/* Section Contact */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg sm:text-xl md:text-2xl font-semibold animate__animated animate__fadeIn animate__delay-1s">
            <h2 className="text-3xl mb-2">Contact</h2>
            <p className="mt-2">Numéro : <span className="text-[#f68E93]">+216 12345678</span></p>
            <p>Email : <a href="mailto:forsamarket@gmail.com" className="text-[#f68E93] hover:underline">forsamarket@gmail.com</a></p>
          </div>
          
          {/* Réseaux sociaux */}
          <div className="flex space-x-6 text-3xl animate__animated animate__fadeIn animate__delay-1.5s">
            <a href="https://www.facebook.com/ForsaMarket" target="_blank" rel="noopener noreferrer" className="hover:text-[#f68E93]">
              <FaFacebook />
            </a>
            <a href="https://twitter.com/ForsaMarket" target="_blank" rel="noopener noreferrer" className="hover:text-[#f68E93]">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/ForsaMarket" target="_blank" rel="noopener noreferrer" className="hover:text-[#f68E93]">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/ForsaMarket" target="_blank" rel="noopener noreferrer" className="hover:text-[#f68E93]">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Section À propos */}
        <div className="border-t border-white pt-6">
          <h3 className="text-2xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-2s">À propos de ForsaMarket</h3>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed animate__animated animate__fadeIn animate__delay-2.5s">
            ForsaMarket est votre destination incontournable pour les produits de haute qualité, à prix compétitifs. 
            Nous nous engageons à offrir un excellent service à la clientèle et des produits de technologie de pointe.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 animate__animated animate__fadeIn animate__delay-3s">
          <p>&copy; 2024 ForsaMarket. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
