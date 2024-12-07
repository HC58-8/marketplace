// DS2/back/config/config.js

// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

module.exports = {
  publicKey: process.env.PUBLIC_KEY,  // Clé publique depuis .env
  privateKey: process.env.PRIVATE_KEY, // Clé privée depuis .env
  apiBaseUrl: process.env.API_BASE_URL, // URL de l'API depuis .env
  emailUser: process.env.EMAIL_ADMIN,
  emailPass: process.env.EMAIL_PASS,
};
