import { db } from '../FireBase'; // Importez votre configuration Firebase
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const userSnapshot = await getDocs(usersCollection);
                const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(userList);
            } catch (err) {
                setError('Erreur lors de la récupération des utilisateurs.');
                console.error('Erreur:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Chargement des utilisateurs...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Liste des Utilisateurs</h2>
            {users.length === 0 ? (
                <p>Aucune donnée utilisateur trouvée</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.email} - {user.displayName} - {user.uid}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserList;
