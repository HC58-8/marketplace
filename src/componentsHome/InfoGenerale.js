import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faCreditCard, faTruck } from '@fortawesome/free-solid-svg-icons';

const InfoGenerale = () => {
  return (
    <div className="bg-[#FCF3EC] p-6 rounded-lg mt-12">
      <h2 className="text-xl font-bold text-center mb-4">Paiement Sécurisé et Livraison</h2>
      <div className="flex justify-around flex-wrap">
        
        {/* Informations sur le paiement sécurisé */}
        <div className="flex flex-col items-center mb-4">
          <FontAwesomeIcon icon={faShieldAlt} className="text-[#f68E93] text-4xl mb-2" />
          <div className="text-center">
            <h3 className="font-semibold">Paiement Sécurisé</h3>
            <p className="text-black">Toutes vos transactions sont protégées.</p>
          </div>
        </div>

        {/* Informations sur les cartes de crédit */}
        <div className="flex flex-col items-center mb-4">
          <FontAwesomeIcon icon={faCreditCard} className="text-[#f68E93] text-4xl mb-2" />
          <div className="text-center">
            <h3 className="font-semibold">Accepte toutes les cartes</h3>
            <p className="text-black">Visa, MasterCard, et plus encore.</p>
          </div>
        </div>

        {/* Informations sur la livraison */}
        <div className="flex flex-col items-center mb-4">
          <FontAwesomeIcon icon={faTruck} className="text-[#f68E93] text-4xl mb-2" />
          <div className="text-center">
            <h3 className="font-semibold">Livraison à Domicile</h3>
            <p className="text-black">Service disponible 24/24.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InfoGenerale;
