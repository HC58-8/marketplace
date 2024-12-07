import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudUploadIcon } from '@heroicons/react/outline';

const API_URL = process.env.REACT_APP_API_URL;

const Products = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    imgSrc: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  // Récupérer tous les produits
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products/all`); // Use API_URL
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setMessage('Les données des produits sont mal formatées.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les produits:', error);
      setMessage('Erreur lors de la récupération de tous les produits.');
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imgSrc = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post(`${API_URL}/api/upload`, formData); // Use API_URL
        imgSrc = uploadResponse.data.filePath;
      }

      const newProduct = { ...product, imgSrc, username: 'Admin' };
      await axios.post(`${API_URL}/api/products/add`, newProduct); // Use API_URL
      setMessage('Produit ajouté avec succès.');

      fetchAllProducts();
      setProduct({ name: '', price: '', category: '', imgSrc: '' });
      setImageFile(null);
    } catch (error) {
      console.error('Erreur lors de l\'opération:', error.response?.data || error.message);
      setMessage('Erreur lors de l’opération. Vérifiez vos données ou essayez à nouveau.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/products/delete/${id}`); // Use API_URL
      fetchAllProducts();
      setMessage('Produit supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setMessage('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-center text-white">Gestion des Produits</h2>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-4">
          <label htmlFor="file-upload" className="w-48 h-48 flex items-center justify-center text-[#6adbd5] border-2 border-[#f68E93] rounded cursor-pointer">
            <CloudUploadIcon className="w-16 h-16 text-[#f68E93]" />
          </label>
          <input id="file-upload" type="file" onChange={handleImageChange} className="hidden" />
        </div>
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border-b-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={product.price}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border-b-2"
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border-b-2"
        >
          <option value="">Catégorie</option>
          <option value="pc">PC</option>
          <option value="electro">Électroménager</option>
          <option value="appartement">Appartement</option>
          <option value="vetement">Vêtement</option>
          <option value="voiture">Voiture</option>
        </select>
        <button type="submit" className="bg-[#f68E93] text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </form>
      <button onClick={fetchAllProducts} className="mt-4 bg-[#6adbd5] text-white px-4 py-2 rounded">
        Afficher tous les produits
      </button>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((prod) => (
            <div key={prod.id} className="border p-4 rounded">
              {prod.imgSrc && <img src={prod.imgSrc} alt={prod.name} className="mb-2 w-full h-32 object-cover" />}
              <h3>{prod.name}</h3>
              <p>Prix: {prod.price} DT</p>
              <p>Catégorie: {prod.category}</p>
              <button onClick={() => handleDelete(prod.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                Supprimer
              </button>
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>

      {message && <p className="text-green-500 text-center mt-4">{message}</p>}
    </div>
  );
};

export default Products;
