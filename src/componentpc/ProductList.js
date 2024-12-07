import React from 'react';
const API_URL = 'https://1bde-197-30-220-251.ngrok-free.app';  // Assurez-vous que c'est l'URL correcte

const ProductList = ({ products, handleAddToCart }) => {
  return (
    <div className="product-list grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  border-2 border-[#f68E93]">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card  border-2 border-[#f68E93] m-4 p-4 rounded">
            {/* Utilisation de imgSrc pour l'image */}
            <img
              src={`${API_URL}${product.imgSrc}`} // Assurez-vous que l'URL est complète
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description || 'Aucune description disponible.'}</p>
            <p className="text-lg font-bold">{product.price} TND</p>
            <button
              onClick={() => {
                console.log(`Ajout du produit au panier: ${product.name}`, product); // Affiche les détails du produit dans la console
                handleAddToCart(product);
              }}
              className="mt-4 bg-[#6adbd5] text-white py-2 px-4 rounded"
            >
              Ajouter au panier
            </button>
          </div>
        ))
      ) : (
        <p>Aucun produit trouvé pour cette catégorie.</p>
      )}
    </div>
  );
};

export default ProductList;
