import React from 'react';

const Orders = ({ orders }) => {
  const handleAcceptOrder = (orderId) => {
    console.log('Commande acceptée:', orderId);
    // Ajoutez ici la logique pour accepter la commande (mettre à jour son statut, etc.)
  };

  const handleRejectOrder = (orderId) => {
    console.log('Commande rejetée:', orderId);
    // Ajoutez ici la logique pour rejeter la commande (mettre à jour son statut, etc.)
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-center text-white">Liste des Commandes</h2>
      <table className="w-full table-auto border-collapse mt-4 bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="border-b-2 p-4 text-black text-left">Produits</th>
            <th className="border-b-2 p-4 text-black text-left">Montant Total</th>
            <th className="border-b-2 p-4 text-black text-left">Statut</th>
            <th className="border-b-2 p-4 text-black text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.orderId} className="bg-white text-center hover:bg-gray-50">
                <td className="border-b p-4">
                  {order.products && order.products.length > 0
                    ? order.products.map((product) => product.name).join(', ')
                    : 'Aucun produit'}
                </td>
                <td className="border-b p-4">{order.totalAmount || '0'}</td>
                <td className="border-b p-4">{order.status || 'Indéfini'}</td>
                <td className="border-b p-4 flex justify-center gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition"
                    onClick={() => handleAcceptOrder(order.orderId)}
                  >
                    Accepter
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
                    onClick={() => handleRejectOrder(order.orderId)}
                  >
                    Rejeter
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">Aucune commande trouvée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
