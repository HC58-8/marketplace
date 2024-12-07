import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';  // Importez Navigate
import { UserProvider } from './componentsHome/UserContext';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Panier from './pages/Panier';
import NavBar from './componentsHome/NavBar';
import Auth from './pages/Auth';
import SignUp from './pages/SignUp';
import Vente from './pages/Vente';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import UserProfile from './pages/UserProfile';
import UserList from './pages/UserList';
import { auth } from './FireBase';
import { onAuthStateChanged } from 'firebase/auth';
import Success from './pages/Success';
import Fail from './pages/Fail';
import Admin from './pages/Admin';
import WelcomePage from './pages/WelcomePage';
import 'animate.css';


const App = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Vérification de l'état de l'utilisateur avec Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log('Utilisateur connecté : ' + currentUser.email);
      } else {
        setUser(null);
        console.log('Aucun utilisateur connecté');
      }
      
    });

    return () => unsubscribe();
  }, []);

  // Fonction de déconnexion
  const handleLogout = async () => {
    await auth.signOut(); // Déconnexion de Firebase
    setUser(null); // Réinitialiser l'état de l'utilisateur
    localStorage.removeItem('userToken'); // Supprimer le token du localStorage
    console.log('Utilisateur déconnecté');
  };

  // Vérifier si la navbar doit être affichée en fonction de la route actuelle
  const shouldShowNavBar = [ '/home','/api/products', '/electromenager', '/appartement', '/vetement', '/voiture' ,].includes(location.pathname);

  return (
    <UserProvider>
      {shouldShowNavBar && (
        // Passer la fonction handleLogout et l'utilisateur au composant NavBar
        <NavBar onLogout={handleLogout} user={user} />
      )}
      
      <Routes>
        {/* Route de la page d'accueil */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />

        {/* Routes protégées : si l'utilisateur n'est pas connecté, redirige vers /auth/login */}
        <Route 
          path="/panier" 
          element={user ? <Panier /> : <Navigate to="/panier" />} 
        />
        <Route 
          path="/checkout" 
          element={user ? <CheckoutPage /> : <Navigate to="/auth/login" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <UserProfile /> : <Navigate to="/auth/login" />} 
        />
        <Route 
          path="/user-list" 
          element={user ? <UserList /> : <Navigate to="/auth/login" />} 
        />

        {/* Routes d'authentification */}
        <Route path="/auth/login" element={<Auth />} />
        <Route path="/auth/register" element={<SignUp />} />

        {/* Routes produits */}
        <Route path="/products/category/:category" element={<ProductPage />} />

        <Route path="/api/products/add" element={<Vente />} />

        <Route path="/profile" element={<UserProfile />} />
        
        {/* Route pour détails de produit */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/api/email" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/admin" element={<Admin/>} />

      </Routes>
    </UserProvider>
  );
};

export default App;
