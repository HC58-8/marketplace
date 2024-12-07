// front/src/FireBase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { getFirestore , collection, addDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAsHuzC35TZ6qj1tqH8iEuaPitRgQmJkHI",
  authDomain: "marketplace1-43236.firebaseapp.com",
  projectId: "marketplace1-43236",
  storageBucket: "marketplace1-43236.appspot.com",
  messagingSenderId: "454181239385",
  appId: "1:454181239385:web:435170a97d016908980f48",
  measurementId: "G-19SEYKXF1V",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Services Firebase
const auth = getAuth(app); // Initialisation de l'authentification
const db = getFirestore(app); // Initialisation de Firestore

// Export des services Firebase
export { auth, db, collection, addDoc ,GoogleAuthProvider, signInWithPopup };
