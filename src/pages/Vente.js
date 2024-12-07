import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom'; // Importation du composant Link

const Vente = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    imgSrc: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const API_URL = 'https://1bde-197-30-220-251.ngrok-free.app';  // Assurez-vous que c'est l'URL correcte

  const auth = getAuth();
  const user = auth.currentUser;
  const username = user ? user.displayName || user.email : '';

  // Charger les produits de l'utilisateur
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/user`, {
          params: { username },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        setMessage('Erreur lors de la récupération des produits.');
      }
    };
    if (username) fetchProducts();
  }, [username]);

  // Effacer le message d'erreur après 5 secondes
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Gestion des champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Gestion de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Soumettre le formulaire (ajouter ou modifier un produit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imgSrc = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post(`${API_URL}/api/upload`, formData);
        imgSrc = uploadResponse.data.filePath;
      }

      const newProduct = { ...product, imgSrc, username };
      if (editingId) {
        await axios.put(`${API_URL}/api/products/update/${editingId}`, newProduct);
        setMessage('Produit modifié avec succès.');
      } else {
        await axios.post(`${API_URL}/api/products/add`, newProduct);
        setMessage('Produit ajouté avec succès.');
      }

      const response = await axios.get(`${API_URL}/api/products/user`, {
        params: { username },
      });
      setProducts(response.data);

      setProduct({ name: '', price: '', category: '', imgSrc: '' });
      setImageFile(null);
      setEditingId(null);
    } catch (error) {
      console.error('Erreur lors de l\'ajout/modification du produit:', error);
      setMessage('Erreur lors de l’opération. Vérifiez vos données.');
    }
  };

  // Modifier un produit
  const handleEdit = (prod) => {
    setProduct(prod);
    setEditingId(prod.id);
  };

  // Supprimer un produit
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/products/delete/${id}`);
      setProducts(products.filter((prod) => prod.id !== id));
      setMessage('Produit supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      setMessage('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="container w-full mx-auto py-8 bg-gradient-to-r from-[#f68E93] to-[#6adbd5] rounded-lg shadow-lg">
      {/* Bouton de retour à l'accueil */}
      <Link to="/home">
        <button className="absolute top-4 left-4 bg-[#6adbd5] text-white py-2 px-4 rounded hover:bg-[#f68E93]">
          Retour à l'Accueil
        </button>
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-center text-white">Vendre un Article</h1>
      {message && (
        <p className={`mb-4 ${message.includes('Erreur') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Formulaire pour ajouter/modifier un produit */}
        <div className="flex flex-col items-center mb-4">
          <label
            htmlFor="file-upload"
            className="w-48 h-48 flex items-center justify-center text-[#6adbd5] border-2 border-[#f68E93] rounded-none cursor-pointer"
          >
            <CloudUploadIcon className="w-16 h-16 text-[#f68E93]" />
            <span className="sr-only">Upload an image</span>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleImageChange}
            className="hidden" // Cacher l'input de type file
          />
        </div>

        {/* Champs pour le produit */}
        <div className="flex flex-col items-center mb-4">
          <input
            type="text"
            name="name"
            placeholder="Nom de l'article"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 text-lg text-[#6adbd5]  border-b-2  placeholder-[#6adbd5] border-[#6adbd5] mb-4 "
            required
          />
        </div>
        <div className="flex flex-col items-center mb-4">
          <input
            type="number"
            name="price"
            placeholder="Prix"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 text-lg text-[#6adbd5] placeholder-[#6adbd5] border-b-2 border-[#6adbd5] mb-4"
            required
          />
        </div>
        <div className="flex flex-col items-center mb-4">
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 text-lg text-[#6adbd5]  border-b-2 border-[#6adbd5] mb-4 "
            required
          >
            <option value="">Choisir une catégorie</option>
            <option value="pc">PC</option>
            <option value="electro">Électroménager</option>
            <option value="appartement">Appartement</option>
            <option value="vetement">Vêtement</option>
            <option value="voiture">Voiture</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-1/4  bg-[#f68E93] text-center text-white py-2 rounded hover:bg-[#6adbd5] transition duration-300"
        >
          {editingId ? 'Modifier le Produit' : 'Publier le Produit'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-center text-white">Mes Produits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((prod) => (
          <div key={prod.id} className="border p-4 rounded shadow-md bg-white">
            {prod.imgSrc && (
              <img src={prod.imgSrc} alt={prod.name} className="w-full h-40 object-cover rounded mb-4" />
            )}
            <h3 className="text-lg font-bold text-center text-[#6adbd5]">{prod.name}</h3>
            <p className="text-[#f68E93] text-center">{prod.price} TND</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => handleEdit(prod)}
                className="text-[#f68E93] hover:text-[#6adbd5]"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(prod.id)}
                className="text-[#f68E93] hover:text-[#6adbd5]"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vente;
