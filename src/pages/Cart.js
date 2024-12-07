import React from 'react';

const Cart = ({ cartItems, handleRemoveFromCart }) => {
  if (cartItems.length === 0) {
    return <div className="p-4">Votre panier est vide</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Votre panier</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="border p-4 rounded-lg shadow-lg mb-4 flex justify-between">
            <div className="flex items-center">
              <img 
                src={item.imgSrc} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-lg mr-4" 
              />
              <div>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-700">{item.price}</p>
              </div>
            </div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              onClick={() => handleRemoveFromCart(item.id)} // Supprime le produit du panier
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
