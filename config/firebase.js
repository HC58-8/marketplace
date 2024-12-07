// back/config/firebase.js

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Assurez-vous que le chemin est correct

// Initialisation du SDK Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://marketplace1-43236.firebaseio.com" // URL de votre base de données Firestore
  });
}

const auth = admin.auth(); // Authentification Admin
const db = admin.firestore(); // Firestore Admin

module.exports = { auth, db ,admin};
