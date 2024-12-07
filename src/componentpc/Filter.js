import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Filter = ({ onFilter }) => {
  const location = useLocation();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [state, setState] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [applianceTypes, setApplianceTypes] = useState({
    refrigerateur: false,
    laveLinge: false,
    microOndes: false,
    gaz: false,
    hotte: false,
  });

  const handleFilter = (e) => {
    e.preventDefault();
    const filters = { minPrice, maxPrice, state, brand, type, applianceTypes };
    console.log(filters); // Affichage des filtres
    if (onFilter) {
      onFilter(filters); // Appel de la fonction de filtre
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setApplianceTypes((prev) => ({ ...prev, [name]: checked }));
  };

  const renderFilters = () => {
    const path = location.pathname; // Récupération du chemin actuel

    switch (path) {
      case '/pc':
        return (
          <>
            {/* Prix pour PC */}
            <div className="mb-4">
              <label className="block text-lg mb-1">Prix (DT)</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="Minimum"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Maximum"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            {/* Marque */}
            <div className="mb-4">
              <label className="block text-lg mb-1">Marque</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Toutes les marques</option>
                <option value="dell">Dell</option>
                <option value="hp">HP</option>
                <option value="asus">Asus</option>
                <option value="acer">Acer</option>
                <option value="lenovo">Lenovo</option>
              </select>
            </div>

            {/* Type de PC */}
            <div className="mb-4">
              <label className="block text-lg mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Tous les types</option>
                <option value="portable">Portable</option>
                <option value="bureau">PC de bureau</option>
              </select>
            </div>

            {/* État du produit */}
            <div className="mb-4">
              <label className="block text-lg mb-1">État du produit</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="state"
                    value="neuf"
                    checked={state === 'neuf'}
                    onChange={(e) => setState(e.target.value)}
                  /> Neuf
                </label>
                <label>
                  <input
                    type="radio"
                    name="state"
                    value="occasion"
                    checked={state === 'occasion'}
                    onChange={(e) => setState(e.target.value)}
                  /> Occasion
                </label>
              </div>
            </div>
          </>
        );

      case '/electromenager':
        return (
          <>
            {/* Prix pour Électroménager */}
            <div className="mb-4">
              <label className="block text-lg mb-1">Prix (DT)</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="Minimum"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Maximum"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
        
            {/* Cases à cocher pour types d'électroménager */}
            <div className="mb-4">
              <label className="block text-lg mb-1">Types d'électroménager</label>
              <div className="flex flex-col space-y-2">
                <label>
                  <input
                    type="checkbox"
                    name="refrigerateur"
                    checked={applianceTypes.refrigerateur}
                    onChange={handleCheckboxChange}
                  /> Réfrigérateur
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="laveLinge"
                    checked={applianceTypes.laveLinge}
                    onChange={handleCheckboxChange}
                  /> Lave-linge
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="microOndes"
                    checked={applianceTypes.microOndes}
                    onChange={handleCheckboxChange}
                  /> Micro-ondes
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="gaz"
                    checked={applianceTypes.gaz}
                    onChange={handleCheckboxChange}
                  /> Gaz
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="hotte"
                    checked={applianceTypes.hotte}
                    onChange={handleCheckboxChange}
                  /> Hotte
                </label>
              </div>
            </div>
          </>
        );

      // Ajoutez d'autres cas pour 'vetement', 'voiture', 'appartement', etc.

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl mb-4">Filtres</h2>
      <form onSubmit={handleFilter}>
        {renderFilters()}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Appliquer les filtres
        </button>
      </form>
    </div>
  );
};

export default Filter;
