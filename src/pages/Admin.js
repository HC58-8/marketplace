import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Users from '../componentAdmin/Users';
import Products from '../componentAdmin/Products';
import Orders from '../componentAdmin/Orders';
import PowerBIReport from '../componentAdmin/PowerBIReport';
import PythonReport from '../componentAdmin/PythonReport';

const API_URL = 'https://1bde-197-30-220-251.ngrok-free.app';  // Assurez-vous que c'est l'URL correcte

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('users');

  // Charger les données au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchUsers();
        await fetchProducts();
        await fetchOrders();
      } catch (err) {
        setError('Erreur lors de la récupération des données.');
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    fetchData();
  }, []);

  // Récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/users`);
      setUsers(response.data.users || []);
      console.log(response.data.users)

    } catch (error) {
      console.error(error);
      setError('Erreur lors de la récupération des utilisateurs.');
    }
  };

  // Récupérer les produits
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products/all`);
      setProducts(response.data || []);
    } catch (error) {
      console.error(error);
      setError('Erreur lors de la récupération des produits.');
    }
  };

  // Récupérer les commandes
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/orders/`);
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error(error);
      setError('Erreur lors de la récupération des commandes.');
    }
  };

  // Supprimer un utilisateur
  const deleteUser = async (name) => {
    try {
      await axios.delete(`${API_URL}/auth/deleteUser/${name}`);
      fetchUsers(); // Rafraîchir les utilisateurs
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la suppression de l\'utilisateur.');
    }
  };

  // Supprimer un produit
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_URL}/api/products/delete/${productId}`);
      fetchProducts(); // Rafraîchir les produits
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la suppression du produit.');
    }
  };

  // Afficher un écran de chargement si nécessaire
  if (loading) {
    return <div className="text-center">Chargement des données...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#6adbd5] min-h-screen p-4">
        <h2 className="text-white text-xl font-bold">Dashboard</h2>
        <div className="mt-4">
          {[
            { label: 'Utilisateurs', key: 'users' },
            { label: 'Produits', key: 'products' },
            { label: 'Commandes', key: 'orders' },
            { label: 'Power BI', key: 'powerbi' },
            { label: 'Python Report', key: 'pythonReport' },
          ].map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`block w-full px-4 py-2 mt-2 text-left rounded ${
                activeSection === section.key ? 'bg-white text-[#6adbd5]' : 'bg-gray-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 shadow-md shadow-black" style={{ backgroundColor: '#FCF3EC' }}>
        <h1
          className="text-4xl font-bold shadow-lg text-[#f68E93]"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
        >
          Tableau de Bord Administrateur
        </h1>
        <div className="mt-6" style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
          {error && <div className="text-red-500">{error}</div>}

          {/* Affichage dynamique des sections */}
          {activeSection === 'users' && <Users users={users} deleteUser={deleteUser} />}
          {activeSection === 'products' && <Products products={products} deleteProduct={deleteProduct} />}
          {activeSection === 'orders' && <Orders orders={orders} />}
          {activeSection === 'powerbi' && <PowerBIReport orders={orders} />}
          {activeSection === 'pythonReport' && <PythonReport />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
