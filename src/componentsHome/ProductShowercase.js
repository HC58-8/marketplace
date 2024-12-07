import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import facesvr from "../assets/pc.jpg";

const ProductShowercase = () => {
  const produits = [
    { id: 1, image: facesvr, nom: "Produit 1", description: "Description du produit 1", prix: "30€" },
    { id: 2, image: facesvr, nom: "Produit 2", description: "Description du produit 2", prix: "40€" },
    { id: 3, image: facesvr, nom: "Produit 3", description: "Description du produit 3", prix: "50€" },
    { id: 4, image: facesvr, nom: "Produit 4", description: "Description du produit 4", prix: "60€" },
    { id: 5, image: facesvr, nom: "Produit 5", description: "Description du produit 5", prix: "70€" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Afficher 3 produits
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // Pour les écrans de taille moyenne
        settings: {
          slidesToShow: 2, // Afficher 2 produits
        },
      },
      {
        breakpoint: 480, // Pour les petits écrans
        settings: {
          slidesToShow: 1, // Afficher 1 produit
        },
      },
    ],
  };

  return (
    <div className="flex  justify-center w-[90%] mx-auto h-[70vh] mt-12 pb-8">
      

      {/* Div pour le carrousel de cartes */}
      <div className="w-[65%] h-full my-2 bg-white border-2 border-[#f68E93] shadow-md">
        <Slider {...settings}>
          {produits.map((produit) => (
            <div
              key={produit.id}
              className="p-4 w-full flex flex-col items-center justify-between gap-1"
            >
              <div className="h-80  border-2 border-[#f68E93] bg-white px-2 shadow-md flex flex-col items-center justify-between">
                <img
                  src={produit.image}
                  alt={produit.nom}
                  className="w-full object-contain"
                />
                <h2 className="text-lg font-bold">{produit.nom}</h2>
                <p className="text-sm text-gray-600">{produit.description}</p>
                <p className="text-red-500 font-semibold">{produit.prix}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductShowercase;
