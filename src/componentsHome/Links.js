import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/pc.jpg';
import image2 from '../assets/electro.jpg';
import image3 from '../assets/home.jpg';
import image4 from '../assets/vetement.jpg';
import image5 from '../assets/voiture.jpg';

const Links = () => {
  const navigate = useNavigate();

  const items = [
    { title: 'PC', imgSrc: image1, route: '/products/category/pc' },
    { title: 'Électroménager', imgSrc: image2, route: '/products/category/electro' },
    { title: 'Appartement', imgSrc: image3, route: '/products/category/appartement' },
    { title: 'Vêtement', imgSrc: image4, route: '/products/category/vetement' },
    { title: 'Voiture', imgSrc: image5, route: '/products/category/voiture' },
  ];

  const handleClick = (route) => {
    navigate(route); // Redirection vers la route correspondante
  };

  return (
    <div className="flex justify-around border-t-2 border-b-2 border-[#f68E93]  bg-[#FCF3EC] flex-wrap pb-8 pt-8">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center mx-4">
          <button
            onClick={() => handleClick(item.route)}
            className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-2 border-gray-300 mb-2"
          >
            <img src={item.imgSrc} alt={item.title} className="w-full h-full object-cover" />
          </button>
          <span className="text-center">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Links;
