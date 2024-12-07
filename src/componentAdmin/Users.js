import React from 'react';

const Users = ({ users, deleteUser }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-center text-white">Liste des Utilisateurs</h2>
      <table className="w-full table-auto border-collapse mt-4 bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="border-b-2 p-4 text-black text-left">Nom</th>
            <th className="border-b-2 p-4 text-black text-left">Téléphone</th>
            <th className="border-b-2 p-4 text-black text-left">Lieu de livraison</th>
            <th className="border-b-2 p-4 text-black text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index} className="bg-white text-center hover:bg-gray-50">
                <td className="border-b p-4">{user.name}</td>
                <td className="border-b p-4">{user.phone}</td>
                <td className="border-b p-4">{user.deliveryLocation}</td>
                <td className="border-b p-4">
                  <button
                    onClick={() => deleteUser(user.name)}
                    className="bg-[#f68E93] text-white px-4 py-2 rounded hover:bg-[#f05873] transition"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">Aucun utilisateur trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
