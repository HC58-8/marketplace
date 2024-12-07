import React from 'react';

const CartList = ({ cartItems, handleRemoveFromCart }) => {
  if (cartItems.length === 0) {
    return <p>Le panier est vide.</p>;
  }

  return (
    <div className="w-full p-4 bg-black">
      {cartItems.map((item) => (
        <div key={item.id} className="border p-4 rounded-lg shadow-lg mb-4 flex justify-between">
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
            onClick={() => handleRemoveFromCart(item.id)}
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartList;
