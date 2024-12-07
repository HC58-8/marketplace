import React, { useEffect, useState } from 'react';

const TextSlider = () => {
  const text = "Livraison gratuite pour les achats supérieurs à 200 DT !"; // Message unique

  const [position, setPosition] = useState(100); // Commence à droite de l'écran

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        // Si la position est inférieure ou égale à -100, réinitialiser à 100
        if (prevPosition <= -100) {
          return 100; // Réinitialise à la position de départ
        }
        return prevPosition - 0.2; // Déplace la position vers la gauche (valeur diminuée pour ralentir)
      });
    }, 50); // Change la position toutes les 50 millisecondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-[#6adbd5]" style={{ height: '30px' }}> {/* Fond vert */}
      <div
        className="flex whitespace-nowrap"
        style={{
          transform: `translateX(${position}%)`, // Applique le mouvement horizontal
          transition: 'transform 0s linear', // Pas de transition pour un mouvement constant
        }}
      >
        <h2 className="text-xl font-semibold text-center text-white p-0" style={{ lineHeight: '30px' }}>
          {text}
        </h2>
      </div>
    </div>
  );
};

export default TextSlider;
