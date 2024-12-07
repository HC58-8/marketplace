import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const NavBar = ({ onLogout }) => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [localCartCount, setLocalCartCount] = useState(0);
    const auth = getAuth();

    const isUserLoggedIn = Boolean(user);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        const updateCartCount = () => {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setLocalCartCount(storedCart.length);
        };

        updateCartCount();
        window.addEventListener('storage', updateCartCount);

        return () => {
            window.removeEventListener('storage', updateCartCount);
            unsubscribe();
        };
    }, [auth, setUser]);

    const handleNavigateToPanier = () => navigate('/panier');
    const handleShowUserInfo = () => {
        if (isUserLoggedIn) {
            navigate('/profile');
        } else {
            alert("Aucun utilisateur connecté.");
        }
    };

    const handleShowVente = () => {
        if (isUserLoggedIn) {
            navigate('/api/products/add');
        } else {
            alert("Aucun utilisateur connecté.");
        }
    };

    const userImage = user?.photoURL || '/path/to/default-avatar.png';

    return (
        <nav className="navbar navbar-expand-lg navbar-light border-t-2 shadow-lg" style={{ backgroundColor: 'white' }}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link className="navbar-brand text-2xl font-semibold" to="/home">
                    <span className="forsa typing-effect text-[#f68E93]">Forsa</span>
                    <span className="market typing-effect text-[#6adbd5]">Market</span>
                </Link>

                <form className="d-flex mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <div className="d-flex align-items-center">
<input
  type="text"
  aria-label="Rechercher"
  placeholder="Rechercher..."
  className="w-72 p-2 text-lg text-[#6adbd5] text-center border-b-2 border-[#6adbd5]"
/>

                        <button className="btn text-[#6adbd5] ms-2" type="submit" style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </form>

                <ul className="navbar-nav d-flex align-items-center">
                    {isUserLoggedIn && (
                        <>
                            <li className="nav-item">
                                <button className="btn text-[#6adbd5] ms-2 border-0" onClick={handleNavigateToPanier}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> Panier ({localCartCount})
                                </button>
                            </li>

                            <li className="nav-item">
                                <button className="btn bg-[#6adbd5] text-white ms-2" onClick={handleShowVente}>
                                    Vente
                                </button>
                            </li>

                            <li className="nav-item">
                                <span className="nav-link text-white" onClick={handleShowUserInfo}>
                                    <img
                                        src={userImage}
                                        alt="Profil"
                                        className="rounded-circle"
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                </span>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
