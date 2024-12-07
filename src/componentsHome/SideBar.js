import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-60 h-400 bg-gray-200 p-6 absolute z-10">
      <h2 className="text-xl font-bold mb-4 text-center">Catégories</h2>
      <div className="flex flex-col">
        <Link to="/visage" className="py-2 px-4 hover:bg-gray-300 rounded mb-2">Visage</Link>
        <Link to="/cheveux" className="py-2 px-4 hover:bg-gray-300 rounded mb-2">Cheveux</Link>
        <Link to="/corps" className="py-2 px-4 hover:bg-gray-300 rounded mb-2">Corps</Link>
        <Link to="/materiel-medical" className="py-2 px-4 hover:bg-gray-300 rounded mb-2">Matériel Médical</Link>
        <Link to="/bebe" className="py-2 px-4 hover:bg-gray-300 rounded mb-2">Bébé</Link>
      </div>
    </div>
  );
};

export default Sidebar;
