// src/pages/SignUp.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Assurez-vous d'importer Link
import bgImage from '../assets/bgimg6.png';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  

  // Fonction pour l'inscription classique avec Firebase
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);

    const auth = getAuth();  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Inscription réussie !');
      navigate('/home');  
    } catch (error) {
      setMessage('Erreur : ' + (error.message || 'Erreur inconnue'));
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour l'inscription via Google
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      setMessage('Inscription réussie avec Google');
      navigate('/profile');  
    } catch (error) {
      setMessage('Erreur de connexion avec Google: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row items-center border-neutral-600 border-4 backdrop-blur-sm shadow-md rounded-lg overflow-hidden max-w-5xl w-full">
        
        {/* Section Image */}
        <div className="md:w-1/2">
          <img
            src={bgImage}
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Section Inscription */}
        <div className="md:w-1/2 p-8 border-neutral-600 border-l-4">
          <h2 className="text-2xl font-semibold mb-6 text-center text-black">Inscription</h2>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 text-white font-medium rounded-lg focus:outline-none ${
                isLoading
                  ? 'bg-[#6adbd5] cursor-not-allowed'
                  : 'bg-[#6adbd5] hover:bg-gray-700 focus:ring focus:ring-gray-300'
              }`}
            >
              {isLoading ? 'Inscription...' : 'S\'inscrire'}
            </button>
          </form>
          <button
            onClick={handleGoogleSignUp}
            className="w-full mt-4 py-2 px-4 bg-[#6adbd5] text-white font-medium rounded-lg hover:bg-gray-600 focus:ring focus:ring-gray-300"
          >
            S'inscrire avec Google
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-700">Déjà inscrit ? <Link to="/auth/login" className="text-[#6adbd5] font-semibold">Connexion</Link></p>
          </div>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
