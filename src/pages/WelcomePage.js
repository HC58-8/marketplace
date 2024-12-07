// src/pages/WelcomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/bgimg7.jpeg'; // Image de fond

// Hook useTypewriter pour l'effet de texte animé
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prevText => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval); // Arrêter l'intervalle une fois la phrase terminée
      }
    }, speed);

    return () => clearInterval(typingInterval); // Nettoyage de l'intervalle lors du démontage du composant
  }, [text, speed]);

  return displayText; // Retourne le texte animé
};

const WelcomePage = () => {
  const phrase = "        Bienvenue sur notre Marketplace"; // La phrase complète
  const descriptionText = "Découvrez une vaste sélection de produits de qualité à des prix compétitifs. Inscrivez-vous ou connectez-vous pour profiter d'offres exclusives et de promotions.";

  // Utilisation du hook useTypewriter pour l'animation du texte
  const displayText = useTypewriter(phrase, 100); // La vitesse est réglée à 100ms entre chaque caractère

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Image de fond avec effet de parallaxe */}
      <div className="absolute top-0 left-0 w-full h-full bg-fixed bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${bgImage})` }}></div>

      {/* Conteneur animé */}
      <div className="relative z-10 text-center p-6 max-w-3xl w-full">
        {/* Animation du titre avec effet typewriter */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#6adbd5] mb-6 px-4 md:px-12">
          {displayText}
        </h1>

        {/* Description */}
        <p className="text-xl sm:text-4xl text-[#979b9d] mb-8 leading-relaxed px-4 md:px-12">
          {descriptionText}
        </p>

        {/* Boutons avec animation moderne */}
        <div className="flex justify-center gap-6 mt-6 flex-wrap">
          <Link to="/auth/login">
            <button className="w-36 py-3 px-6   bg-[#6adbd5] text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none">
              Se connecter
            </button>
          </Link>

          <Link to="/auth/register">
            <button className="w-36 py-3 px-6  bg-[#6adbd5] text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none">
              S'inscrire
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
