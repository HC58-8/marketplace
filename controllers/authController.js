// src/controllers/authController.js
// Importation correcte depuis firebase.js
const { db } = require('../config/firebase');

const { getAuth  } = require('firebase-admin/auth'); // Firebase Admin SDK
const admin = require('../config/firebase');  // Fichier de configuration Firebase Admin SDK

// Inscription d'un nouvel utilisateur
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Créer l'utilisateur via Firebase Admin SDK
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Réponse en cas de succès
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription.' });
  }
};

// Connexion d'un utilisateur existant
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier l'utilisateur dans Firebase Admin SDK
    const user = await admin.auth().getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    // Créer un token JWT personnalisé pour l'utilisateur
    const token = await admin.auth().createCustomToken(user.uid);

    res.status(200).json({
      message: 'Connexion réussie',
      token,
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
  }
};

// Récupérer la liste des utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = [];
    const snapshot = await db.collection('users').get(); // Récupère tous les utilisateurs dans la collection 'users'

    // Vérifiez s'il y a des utilisateurs dans la collection
    if (snapshot.empty) {
      return res.status(404).json({
        message: 'Aucun utilisateur trouvé dans la base de données.',
      });
    }

    // Parcourez chaque document d'utilisateur et ajoutez-le à la liste
    snapshot.forEach((doc) => {
      users.push(doc.data()); // Ajouter les données de l'utilisateur à la liste
    });

    res.status(200).json({
      message: 'Utilisateurs récupérés avec succès',
      users,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({
      message: 'Erreur serveur lors de la récupération des utilisateurs.',
      error: error.message,  // Fournir plus d'informations pour le débogage
    });
  }
};

// src/controllers/authController.js
const deleteUser = async (req, res) => {
  const { name } = req.params;

  try {
    // Rechercher l'utilisateur dans la base de données (Firestore ou Firebase Auth)
    const snapshot = await db.collection('users').where('name', '==', name).get();

    if (snapshot.empty) {
      return res.status(404).json({
        message: `Aucun utilisateur trouvé avec le nom ${name}.`,
      });
    }

    snapshot.forEach(async (doc) => {
      await doc.ref.delete(); // Supprimer l'utilisateur du Firestore
    });

    res.status(200).json({
      message: `Utilisateur ${name} supprimé avec succès.`,
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({
      message: 'Erreur serveur lors de la suppression de l\'utilisateur.',
      error: error.message,
    });
  }
};

module.exports = { register, login, getUsers, deleteUser };
