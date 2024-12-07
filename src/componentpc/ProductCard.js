import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4">
      <img
        src={product.imgSrc}
        alt={product.name}
        className="w-full h-48 object-cover mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProductCard;
