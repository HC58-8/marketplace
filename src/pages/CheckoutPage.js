import React, { useState } from 'react';
import { useLocation ,Link} from 'react-router-dom';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import '../assets/tailwind.css'; // Assurez-vous d'importer les styles CSS

const CheckoutPage = () => {
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] };
    const API_URL = 'https://1bde-197-30-220-251.ngrok-free.app';  // Assurez-vous que c'est l'URL correcte

    const [currentStep, setCurrentStep] = useState(1);
    const [shippingDetails, setShippingDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: ''
    });
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardHolder: ''
    });
    const [paymentStatus, setPaymentStatus] = useState(null);

    const totalAmount = cartItems.reduce((total, product) => {
        const price = typeof product.price === 'string'
            ? product.price
            : product.price.toString();
        return total + parseFloat(price.replace(' DT', '').replace(',', '.')) * (product.quantity || 1);
    }, 0);

    const handleInputChange = (e, setState) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNextStep = () => {
        if (currentStep === 1 && shippingDetails.firstName && shippingDetails.lastName && shippingDetails.email && shippingDetails.phone) {
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setCurrentStep(3);
        } else if (currentStep === 3 && paymentDetails.cardNumber && paymentDetails.expirationDate && paymentDetails.cvv && paymentDetails.cardHolder) {
            handlePayment();
        } else {
            alert('Veuillez remplir tous les champs requis.');
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handlePayment = async () => {
        try {
            const auth = getAuth();
            const userId = auth.currentUser?.uid;
    
            if (!userId) {
                alert('Utilisateur non connecté');
                return;
            }
    
            // Envoyer la demande de paiement
            const response = await axios.post(`${API_URL}/api/payments/add`, {
                amount: totalAmount,
                cardDetails: paymentDetails,
            });
    
            if (response.data.success) {
                setPaymentStatus('Paiement initié avec succès.');
    
                // Préparer les détails de la commande
                const orderDetails = {
                    userId: userId,
                    products: cartItems.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                    shippingAddress: shippingDetails.address,
                    totalAmount: totalAmount,
                    shippingEmail: shippingDetails.email,
                    fullName: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
                };
    
                // Créer la commande dans le backend
                const orderResponse = await axios.post(`${API_URL}/api/orders/create`,orderDetails );
    
                if (orderResponse.data.success) {
                    // Envoyer l'e-mail de confirmation
                    const emailResponse = await axios.post(`${API_URL}/api/emails/mailer`, {
                        email: shippingDetails.email,
                        fullName: orderDetails.fullName,
                        orderDetails: orderDetails,
                    });
    
                    if (emailResponse.data.success) {
                        console.log('E-mail de confirmation envoyé avec succès.');
                    } else {
                        console.error('Erreur lors de l\'envoi de l\'email:', emailResponse.data.message);
                    }
    
                    // Redirection après succès
                    window.location.href = `${API_URL}/home`;
                } else {
                    setPaymentStatus('Échec de la création de la commande. ' + orderResponse.data.message);
                }
            } else {
                setPaymentStatus('Échec du paiement. ' + response.data.message);
            }
        } catch (error) {
            setPaymentStatus('Erreur lors de la tentative de paiement: ' + error.message);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-start justify-between p-6">
            <div className="w-full md:w-2/3 bg-white p-6  border-4 border-[#f68E93] rounded-lg shadow-sm fade-in">
                <h2 className="text-2xl font-bold mb-4 text-center text-[#6adbd5]">Facture</h2>
                {cartItems.length > 0 ? (
                    <div className="mb-4 border-b   pb-4">
                        {cartItems.map((product) => (
                            <div key={product.id} className="flex justify-between items-center border-b py-2">
                                <div className="flex items-center">
                                    <img
                                        src={product.imgSrc}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover mr-4 border"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                                        <p className="text-gray-600">{product.price}</p>
                                    </div>
                                </div>
                                <span className="text-gray-600">{product.quantity}x</span>
                            </div>
                        ))}
                        <div className="flex justify-between mt-4 font-bold text-lg">
                            <span className="text-gray-800">Total :</span>
                            <span className="text-[#6adbd5]">{totalAmount.toFixed(2)} DT</span>
                        </div>
                        <div className="flex justify-between mt-4 text-white text-lg">

                        <Link to="/home">
                                <button className=" bg-[#6adbd5] px-4 py-2 text-white rounded">
                                    Retour
                                </button>
                            </Link>
                            </div>

                    </div>
                ) : (
                    <p className="text-center text-gray-600">Votre panier est vide.</p>
                )}
            </div>

            <div className="w-full md:w-2/3 bg-white p-6 rounded-lg  border-4 border-[#f68E93] shadow-sm ml-0 md:ml-6 slide-in-left">
                <div className="flex items-center justify-between mb-6">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full ${currentStep >= step ? 'bg-[#6adbd5] text-white' : 'bg-gray-300'}`}
                            >
                                {step}
                            </div>
                            {step < 3 && <div className={`h-1 w-16 ${currentStep > step ? 'bg-[#6adbd5]' : 'bg-gray-300'}`}></div>}
                        </div>
                    ))}
                </div>

                {currentStep === 1 && (
                    <div className="fade-in">
                        <h3 className="text-xl font-semibold mb-4 text-[#6adbd5]">Informations sur le destinataire</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Prénom"
                                value={shippingDetails.firstName}
                                onChange={(e) => handleInputChange(e, setShippingDetails)}
                                className="border p-3 rounded-md"
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Nom de famille"
                                value={shippingDetails.lastName}
                                onChange={(e) => handleInputChange(e, setShippingDetails)}
                                className="border p-3 rounded-md"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={shippingDetails.email}
                                onChange={(e) => handleInputChange(e, setShippingDetails)}
                                className="border p-3 rounded-md"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Téléphone"
                                value={shippingDetails.phone}
                                onChange={(e) => handleInputChange(e, setShippingDetails)}
                                className="border p-3 rounded-md"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Adresse"
                                value={shippingDetails.address}
                                onChange={(e) => handleInputChange(e, setShippingDetails)}
                                className="border p-3 rounded-md col-span-2"
                            />
                            <input
                                type="text"
                                name="postalCode"
                                placeholder="Code postal"
                                value={shippingDetails.postalCode}
                                onChange={(e) => handleInputChange(e, setShippingDetails)}
                                className="border p-3 rounded-md"
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="Ville"
                                value={shippingDetails.city}
                                onChange={(e) => handleInputChange(e, setShippingDetails)}
                                className="border p-3 rounded-md"
                            />
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="fade-in">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Méthode de paiement</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Numéro de carte"
                                value={paymentDetails.cardNumber}
                                onChange={(e) => handleInputChange(e, setPaymentDetails)}
                                className="border p-3 rounded-md col-span-2"
                            />
                            <input
                                type="text"
                                name="expirationDate"
                                placeholder="Date d'expiration"
                                value={paymentDetails.expirationDate}
                                onChange={(e) => handleInputChange(e, setPaymentDetails)}
                                className="border p-3 rounded-md"
                            />
                            <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                value={paymentDetails.cvv}
                                onChange={(e) => handleInputChange(e, setPaymentDetails)}
                                className="border p-3 rounded-md"
                            />
                            <input
                                type="text"
                                name="cardHolder"
                                placeholder="Titulaire de la carte"
                                value={paymentDetails.cardHolder}
                                onChange={(e) => handleInputChange(e, setPaymentDetails)}
                                className="border p-3 rounded-md col-span-2"
                            />
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="fade-in">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Confirmation du paiement</h3>
                        {paymentStatus ? (
                            <p className="text-lg font-semibold">{paymentStatus}</p>
                        ) : (
                            <p>Veuillez confirmer votre paiement.</p>
                        )}
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    {currentStep > 1 && (
                        <button onClick={handlePreviousStep} className="px-4 py-2 bg-gray-400 text-white rounded-md">
                            Retour
                        </button>
                    )}
                    <button onClick={handleNextStep} className="px-6 py-2 bg-[#6adbd5] text-white rounded-md">
                        {currentStep === 3 ? 'Payer' : 'Suivant'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
