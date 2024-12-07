// src/models/userModel.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const auth = getAuth();

// Inscription classique avec email et mot de passe
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    return { user, token };
  } catch (error) {
    throw new Error(error.message || 'Erreur lors de l\'inscription');
  }
};

// Connexion classique avec email et mot de passe
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    return { user, token };
  } catch (error) {
    throw new Error(error.message || 'Mot de passe ou email incorrect.');
  }
};

// Connexion avec Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    return { user, token };
  } catch (error) {
    throw new Error(error.message || 'Erreur lors de la connexion avec Google');
  }
};
