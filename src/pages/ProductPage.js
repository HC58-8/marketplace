import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../componentsHome/NavBar';
import ProductList from '../componentpc/ProductList';
import axios from 'axios';

const ProductPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const API_URL = 'https://1bde-197-30-220-251.ngrok-free.app';  // Assurez-vous que c'est l'URL correcte

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
`${API_URL}/api/products/category/${category}`        );
        setProducts(response.data);
        if (response.data.length === 0) {
          setError(`Aucun produit trouvé pour la catégorie "${category}".`);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des produits:', err);
        setError("Une erreur s'est produite lors de la récupération des produits.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...storedCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Mettre à jour le compteur de panier dans NavBar via un événement custom
    window.dispatchEvent(new Event('storage')); // Déclencher un événement de changement du localStorage
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setCartCount(0); // Réinitialisation du compteur de panier
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Chargement des produits...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">{error}</div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        Aucun produit trouvé.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-r from-[#6adbd5] via-[#FCF3EC] to-[#f68E93] bg-fixed">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar cartCount={cartCount} onLogout={handleLogout} />
      </div>

      {/* Section Produits */}
      <div className="flex-1 mt-20 w-full px-6 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-wide animate-bounce">
            Découvrez nos produits dans "{category}"
          </h1>
        </div>

        <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
          <ProductList
            products={products}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
