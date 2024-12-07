import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../FireBase';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    } else {
                        setError("Aucune donnée utilisateur trouvée.");
                    }
                } else {
                    setError("Utilisateur non authentifié.");
                }
            } catch (err) {
                console.error('Erreur lors de la récupération des données utilisateur:', err);
                setError('Erreur lors de la récupération des données.');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading) return <p>Chargement...</p>;

    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h1>Profil de l'utilisateur</h1>
            {userData ? (
                <div>
                    <p>Nom: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Téléphone: {userData.phone}</p>
                    <p>Localisation: {userData.deliveryLocation}</p>
                    {userData.image && <img src={userData.image} alt="Avatar utilisateur" />}
                </div>
            ) : (
                <p>Aucune donnée utilisateur trouvée.</p>
            )}
        </div>
    );
};

export default UserProfile;
