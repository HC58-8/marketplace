import React, { useState, useEffect } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css'; // Importer Font Awesome

const Panier = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    // Récupérer les éléments du panier depuis localStorage
    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCartItems);
    }, []);

    // Calcul du total
    const totalAmount = cartItems.reduce(
        (total, product) => {
            const price = typeof product.price === 'string' ? product.price : product.price.toString();
            return total + parseFloat(price.replace(' DT', '').replace(',', '.')) * (product.quantity || 1);
        },
        0
    );

    // Fonction pour procéder à la commande
    const handleProceedToCheckout = () => {
        if (cartItems.length > 0) {
            navigate('/checkout', { state: { cartItems } });
        } else {
            alert('Votre panier est vide.');
        }
    };

    // Fonction pour retirer un produit du panier
    const handleRemoveFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    // Fonction pour générer des icônes de couleur et de taille aléatoires
    const generateRandomIconStyle = () => {
        const colors = ['#e9f9f9', '#f99b52', '#6adbd5','#4654b1','#6adbd5', '#f28692', '#ff9daf', '#363844']; // Nouvelles couleurs
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = Math.floor(Math.random() * (100 - 50) + 50); // Taille entre 50 et 100 px
        return { color: randomColor, fontSize: `${randomSize}px` };
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 w-[100%] h-[50VH] relative">
            {/* Générer 50 icônes avec des animations de mouvements non-stop */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                {Array.from({ length: 50 }).map((_, index) => (
                    <i
                        key={index}
                        className="fa fa-shopping-cart absolute move-icon rotate-icon"
                        style={{
                            top: `${Math.random() * 85}%`,
                            left: `${Math.random() * 85}%`,
                            transform: `rotate(${Math.random() * 120}deg)`,
                            ...generateRandomIconStyle(),
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    ></i>
                ))}
            </div>

            <div className="bg-white p-6 rounded shadow-lg w-2/3 z-10 relative">
                <h2 className="text-xl font-bold mb-4 text-center">Votre Panier</h2>
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((product) => (
                            <div
                                key={product.id}
                                className="flex justify-between items-center border-b p-2"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={product.imgSrc}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p>{product.price}</p>
                                    </div>
                                </div>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleRemoveFromCart(product.id)} // Suppression du produit avec son id
                                >
                                    Retirer
                                </button>
                            </div>
                        ))}

                        <div className="flex justify-between mt-4 font-bold">
                            <span>Total :</span>
                            <span>{totalAmount.toFixed(2)} DT</span>
                        </div>

                        <div className="mt-6 flex justify-between">
                            
                            <Link to="/home">
                                <button className=" bg-[#6adbd5] px-4 py-2 rounded">
                                    Retour
                                </button>
                            </Link>
                            <button
                                className="bg-[#6adbd5] text-white px-4 py-2 rounded"
                                onClick={handleProceedToCheckout}
                            >
                                Commander
                            </button>
                        </div>
                
                    </div>
                ) : (
                    <p className="text-center">Votre panier est vide</p>
                )}
            </div>
        </div>
    );
};

export default Panier;
