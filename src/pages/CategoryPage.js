import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Pour obtenir la catégorie de l'URL
import FilterPC from '../componentpc/Filter'; // Composant de filtre
import ProductList from '../componentpc/ProductList'; // Composant pour afficher les produits

const CategoryPage = ({ handleAddToCart }) => {
  const { category } = useParams(); // Récupérer la catégorie de l'URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appel à l'API pour récupérer les produits de la catégorie
    fetch(`/api/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [category]); // Recharger à chaque changement de catégorie

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div className="h-[100vh] w-full flex overflow-hidden">
      {/* Colonne pour le filtre */}
      <div className="w-1/4 bg-gray-100 h-[100vh] fixed top-[64px] overflow-y-auto">
        <div className="mt-8 px-4">
          <FilterPC />
        </div>
      </div>

      {/* Espace vide pour le filtre (alignement) */}
      <div className="w-1/4"></div>

      {/* Liste des produits */}
      <div className="w-3/4 h-[100vh] overflow-y-scroll p-4">
        {Array.isArray(products) && products.length > 0 ? (
          <ProductList products={products} handleAddToCart={handleAddToCart} />
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
