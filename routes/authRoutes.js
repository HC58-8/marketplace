// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getUsers ,deleteUser } = require('../controllers/authController');

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

// Route pour récupérer les utilisateurs
router.get('/users', getUsers);
router.delete('/deleteUser/:name', deleteUser); // Supprimer un utilisateur

module.exports = router;
