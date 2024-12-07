const axios = require('axios');
const { db } = require('../config/firebase'); // Assurez-vous d'importer Firestore

class PaymentModel {
  /**
   * Méthode pour créer un paiement en interagissant avec l'API Flouci et en enregistrant les informations dans Firestore.
   * @param {Object} paymentData - Les données du paiement (par exemple : orderId, totalAmount).
   * @returns {Promise<string>} L'ID du paiement généré par Flouci.
   */
  static async createPayment(paymentData) {
    try {
      // Valider les données du paiement
      const { totalAmount, orderId } = paymentData;
      if (!totalAmount || typeof totalAmount !== 'number' || totalAmount <= 0) {
        throw new Error('Montant invalide.');
      }

      // Construire le payload pour l'API de Flouci
      const payload = {
        app_token: 'c59059e7-dd11-4382-94be-b2f53a203e9e', // Utilisation de la clé publique de l'application
        app_secret: 'aa26839c-f048-4bbf-b9e6-81c7c7cf33e8', // Utilisation de la clé privée de l'application
        amount: totalAmount,
        accept_card: true,
        session_timeout_secs: 1200, // Temps d'expiration de la session (20 minutes)
        success_link: 'http://localhost:5000/success', // Lien en cas de succès
        fail_link: 'http://localhost:5000/fail', // Lien en cas d'échec
        developer_tracking_id: orderId, // ID de suivi (utilisé pour lier la commande au paiement)
      };

      // Appeler l'API Flouci pour initier un paiement
      const url = 'https://developers.flouci.com/api/generate_payment';
      const response = await axios.post(url, payload, {
          headers: { 'Content-Type': 'application/json' },
      });
      // Vérifier si le paiement a été initié avec succès
      if (response.data.result.success) {
        // Sauvegarder les détails du paiement dans Firestore
        const paymentRef = db.collection('payments').doc(); // Créer un nouveau document dans Firestore
        await paymentRef.set({
          orderId: orderId,
          paymentId: response.data.result.payment_id, // ID du paiement retourné par Flouci
          link: response.data.result.link, // Lien de paiement pour rediriger l'utilisateur
          status: 'Success', // Statut initial du paiement
          createdAt: new Date().toISOString(), // Timestamp de création
        });

        return response.data.result.payment_id; // Retourner l'ID du paiement
      } else {
        throw new Error('Échec de l’initiation du paiement.');
      }
    } catch (error) {
      // Capturer et retourner l'erreur
      throw new Error('Erreur lors de la création du paiement: ' + error.message);
    }
  }

  /**
   * Méthode pour récupérer tous les paiements depuis Firestore
   * @returns {Promise<Array>} Liste de tous les paiements.
   */
  static async getAllPayments() {
    try {
      const paymentsSnapshot = await db.collection('payments').get();
      if (paymentsSnapshot.empty) {
        throw new Error('Aucun paiement trouvé.');
      }

      const payments = [];
      paymentsSnapshot.forEach(doc => {
        payments.push({ paymentId: doc.id, ...doc.data() });
      });

      return payments;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des paiements: ' + error.message);
    }
  }
}

module.exports = PaymentModel;
