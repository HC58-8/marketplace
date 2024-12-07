import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/tailwind.css';
import { BrowserRouter } from 'react-router-dom'; // Importation de BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Assurez-vous de mettre BrowserRouter ici pour envelopper l'application */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Si vous souhaitez mesurer les performances dans votre application,
// passez une fonction pour enregistrer les résultats (par exemple, reportWebVitals(console.log))
// ou envoyez à un endpoint d'analytique. Apprenez-en plus : https://bit.ly/CRA-vitals
reportWebVitals();
