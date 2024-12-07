import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from '../pages/UserProfile';

const ProfilePage = () => {
    const { userId } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL

    return (
        <div>
            <h1>Page du Profil</h1>
            <UserProfile userId={userId} />
        </div>
    );
};

export default ProfilePage;
