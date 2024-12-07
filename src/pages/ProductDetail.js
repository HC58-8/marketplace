import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../componentsHome/NavBar';

const ProductDetail = ({ products, onAddToCart }) => {
  const { id } = useParams(); // Récupérer l'ID du produit depuis les paramètres de l'URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    // Rechercher le produit par ID
    const foundProduct = products.find((item) => item.id === parseInt(id)); // Assurez-vous que l'ID est un nombre
    setProduct(foundProduct);
  }, [id, products]);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity);
      setQuantity(1); // Réinitialiser la quantité après l'ajout
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre la revue (par exemple, appel API)
    console.log('Review submitted:', { review, rating });
    setReview(''); // Réinitialiser le champ de révision
    setRating(0); // Réinitialiser la note
  };

  if (!product) {
    return <div>Produit non trouvé</div>; // Afficher un message si le produit n'est pas trouvé
  }

  return (
    <div className="bg-white pt-0 p-6 rounded-md shadow-md flex h-[100VH]">
      <NavBar/>
      {/* Conteneur de l'image */}
      <div className="w-1/2 p-4">
        <img src={product.imgSrc} alt={product.name} className="w-full h-auto object-cover" />
      </div>

      {/* Conteneur des détails du produit */}
      <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-lg mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-4">Prix: {product.price} </p>

        <div className="mb-4">
          <label className="block text-lg mb-1">Quantité:</label>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(e.target.value)}
            className="w-20 p-2 border rounded-md"
          />
        </div>

        <button onClick={handleAddToCart} className="bg-blue-500 text-white p-2 rounded-md mb-4">
          Ajouter au panier
        </button>

        <div className="mb-6">
          <h2 className="text-2xl mb-2">Avis</h2>
          <form onSubmit={handleReviewSubmit}>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Écrire un avis..."
              className="w-full p-2 border rounded-md mb-2"
            />
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
              Soumettre l'avis
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl mb-2">Notes des utilisateurs:</h2>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((rev, index) => (
              <div key={index} className="border-t mt-2 pt-2">
                <p className="font-semibold">{rev.username}:</p>
                <p>{rev.comment}</p>
                <p>Note: {rev.rating} ★</p>
              </div>
            ))
          ) : (
            <p>Aucun avis pour ce produit.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
