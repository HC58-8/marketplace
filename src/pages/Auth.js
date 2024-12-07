import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../componentsHome/UserContext';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import bgImage from '../assets/bgimg6.png';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      setMessage('Connexion réussie');
      localStorage.setItem('authToken', token);
      setUser({ email });

      // Vérification de l'email et redirection vers la page appropriée
      if (email === 'harounchedli72@gmail.com') {
        navigate('/admin'); // Redirection vers la page admin
      } else {
        navigate('/home'); // Redirection vers la page d'accueil pour un utilisateur normal
      }
    } catch (error) {
      setMessage('Erreur : ' + (error.message || 'Mot de passe ou email incorrect.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      setMessage('Connexion Google réussie');
      localStorage.setItem('authToken', token);
      setUser({ email: user.email });

      // Vérification de l'email et redirection vers la page appropriée
      if (user.email === 'harounchedli72@gmail.com') {
        navigate('/admin'); // Redirection vers la page admin
      } else {
        navigate('/home'); // Redirection vers la page d'accueil pour un utilisateur normal
      }
    } catch (error) {
      setMessage('Erreur Google : ' + (error.message || 'Erreur de connexion avec Google.'));
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

        {/* Section Connexion */}
        <div className="md:w-1/2 p-8 border-neutral-600 border-l-4">
          <h2 className="text-2xl font-semibold mb-6 text-center text-black">Connexion</h2>
          <form onSubmit={handleLogin} className="space-y-6">
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
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 py-2 px-4 bg-[#6adbd5] text-white font-medium rounded-lg hover:bg-gray-600 focus:ring focus:ring-gray-300"
          >
            Se connecter avec Google
          </button>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}

          {/* Lien vers la page d'inscription */}
          <div className="text-center mt-4">
            <p className="text-gray-700">Pas encore inscrit ? <Link to="/auth/register" className="text-[#6adbd5] font-semibold">S'inscrire</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
