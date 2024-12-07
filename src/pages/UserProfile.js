import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { db } from '../FireBase'; // Chemin vers votre configuration Firestore
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Link} from 'react-router-dom';


const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newInfo, setNewInfo] = useState({
    name: '',
    phone: '',
    deliveryLocation: '',
    sexe: '', // Ajouter sexe
  });
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Utilisateur connecté :', user.email);

        // Vérification si l'utilisateur a une image de profil
        if (user.photoURL) {
          console.log('Image de profil :', user.photoURL);
        } else {
          console.log('Aucune image de profil disponible.');
        }

        // Accéder aux informations supplémentaires de l'utilisateur depuis Firestore
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUserInfo(docSnap.data());
            console.log('Données utilisateur supplémentaires:', docSnap.data());
          } else {
            console.log('Aucune donnée utilisateur trouvée. Mode édition activé.');
            setEditMode(true); // Activer le mode édition si aucune donnée utilisateur n'est trouvée
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
        }
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleEditClick = () => {
    setEditMode(true);
    setNewInfo({
      name: userInfo?.name || '',
      phone: userInfo?.phone || '',
      deliveryLocation: userInfo?.deliveryLocation || '',
      sexe: userInfo?.sexe || '', // Ajouter sexe
    });
  };

  const handleInputChange = (e) => {
    setNewInfo({
      ...newInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    if (!newInfo.name) {
      alert('Le nom est requis');
      return;
    }

    const user = auth.currentUser;
    try {
      const userDocRef = doc(db, "users", user.uid);

      // Ajouter ou mettre à jour les données utilisateur dans Firestore
      await setDoc(userDocRef, newInfo, { merge: true });

      // Mettre à jour Firebase Auth (si nécessaire)
      if (user.displayName !== newInfo.name) {
        await updateProfile(user, { displayName: newInfo.name });
      }

      setEditMode(false);
      setUserInfo((prev) => ({ ...prev, ...newInfo }));
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données utilisateur:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Profil de l'utilisateur</h2>
      {userInfo || editMode ? (
        <div className="space-y-6">
          {/* Vérification et affichage de l'image de profil */}
          <div className="flex justify-center">
            {auth.currentUser?.photoURL ? (
              <img
                src={auth.currentUser.photoURL}
                alt="Profil de l'utilisateur"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-white">Aucune image</span>
              </div>
            )}
          </div>

          {editMode ? (
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={newInfo.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Nom complet"
              />
              <input
                type="text"
                name="phone"
                value={newInfo.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Téléphone"
              />
              <input
                type="text"
                name="deliveryLocation"
                value={newInfo.deliveryLocation}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Adresse de livraison"
              />
              <input
                type="text"
                name="sexe"
                value={newInfo.sexe}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Sexe"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium">Email: <span className="text-gray-600">{userInfo.email}</span></p>
              <p className="text-lg font-medium">Nom complet: <span className="text-gray-600">{userInfo.name || 'Non spécifié'}</span></p>
              <p className="text-lg font-medium">Téléphone: <span className="text-gray-600">{userInfo.phone || 'Non spécifié'}</span></p>
              <p className="text-lg font-medium">Adresse: <span className="text-gray-600">{userInfo.deliveryLocation || 'Non spécifié'}</span></p>
              <p className="text-lg font-medium">Sexe: <span className="text-gray-600">{userInfo.sexe || 'Non spécifié'}</span></p>
              <button
                onClick={handleEditClick}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Modifier
              </button>
              <Link to="/home">
                                <button className=" bg-[#6adbd5] px-4 py-2 rounded">
                                    Retour
                                </button>
                            </Link>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">Chargement des données utilisateur...</p>
      )}
    </div>
  );
};

export default UserProfile;