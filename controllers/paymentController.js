const axios = require('axios');
const config = require('../config/config');
const { db } = require('../config/firebase'); // Importer la configuration Firestore

class PaymentController {
    /**
     * Méthode pour initier un paiement avec Flouci.
     * Cette méthode envoie une requête POST pour initier un paiement avec Flouci.
     */
    static async addPayment(req, res) {
        try {
            console.log('=== Démarrage de la méthode addPayment ===');
            console.log('Corps de la requête:', req.body);

            // Validation des données du corps de la requête
            const { amount } = req.body;
            if (!amount || typeof amount !== 'number' || amount <= 0) {
                console.error('Montant non valide ou manquant.');
                return res.status(400).json({ message: 'Le montant est requis et doit être un nombre positif.' });
            }

            // Construire le payload pour Flouci
            const payload = {
                app_token: config.publicKey, // Utilisation de la clé publique de l'application
                app_secret: config.privateKey, // Utilisation de la clé privée de l'application
                amount,
                accept_card: true,
                session_timeout_secs: 1200, // Temps d'expiration de la session de paiement (20 minutes)
                success_link: 'http://localhost:5000/success', // Lien en cas de succès
                fail_link: 'http://localhost:5000/fail', // Lien en cas d'échec
                developer_tracking_id: '1a7bea84-181e-4e51-8a1e-6191e9fb22fa', // ID de suivi interne (peut être dynamique)
            };

            console.log('Payload envoyé à Flouci:', payload);

            // Appeler l'API Flouci pour initier un paiement
            const url = 'https://developers.flouci.com/api/generate_payment';
            const response = await axios.post(url, payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('Réponse de Flouci:', response.data);

            // Gérer la réponse de l'API
            if (response.data?.result?.success) {
                const paymentId = response.data.result.payment_id; // Utilisation de payment_id pour la gestion du paiement
                console.log(`Paiement initié avec succès. ID de transaction: ${paymentId}`);
                return res.status(200).json({
                    success: true,
                    message: 'Paiement initié avec succès.',
                    data: response.data.result,
                });
            } else {
                console.error('Échec de l\'initiation du paiement:', response.data);
                return res.status(400).json({
                    success: false,
                    message: 'Échec de l\'initiation du paiement.',
                    error: response.data.error_message || 'Erreur inconnue.',
                });
            }
        } catch (error) {
            console.error('Erreur lors de la tentative de paiement:', error.message);
            if (error.response) console.error('Détails supplémentaires:', error.response.data);

            return res.status(500).json({
                message: 'Une erreur est survenue lors du traitement du paiement.',
                error: error.response?.data || error.message || 'Erreur inconnue.',
            });
        }
    }

    /**
     * Méthode pour récupérer tous les paiements depuis Firestore
     * @param {Object} req - La requête HTTP.
     * @param {Object} res - La réponse HTTP.
     * @returns {Promise<void>}
     */
    static async getAllPayments(req, res) {
        try {
            // Interroger la collection "payments" dans Firestore
            const paymentsSnapshot = await db.collection('payments').get();
            
            // Si la collection est vide
            if (paymentsSnapshot.empty) {
                return res.status(404).json({
                    success: false,
                    message: 'Aucun paiement trouvé.',
                });
            }

            // Récupérer les paiements sous forme de tableau
            const payments = [];
            paymentsSnapshot.forEach(doc => {
                payments.push({ paymentId: doc.id, ...doc.data() });
            });

            // Retourner la liste des paiements
            return res.status(200).json({
                success: true,
                payments,
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des paiements:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des paiements.',
                error: error.message,
            });
        }
    }

}

module.exports = PaymentController;
