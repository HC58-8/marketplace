const { db } = require('../config/firebase'); // Importer la configuration Firestore 

class OrderModel {
  // Méthode pour créer une commande
  static async createOrder(orderData) {
    try {
      const orderRef = db.collection('orders').doc(); // Génère un nouvel ID pour la commande
      const newOrder = {
        userId: orderData.userId,
        products: orderData.products,
        shippingAddress: orderData.shippingAddress,
        totalAmount: orderData.totalAmount,
        status: 'Success', // Statut initial
        createdAt: new Date().toISOString(),
      };

      await orderRef.set(newOrder); // Enregistrer la commande dans Firestore

      return { orderId: orderRef.id, ...newOrder }; // Retourne l'ID de la commande et les détails
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error); // Journalisation de l'erreur
      throw new Error('Erreur lors de la création de la commande: ' + error.message);
    }
  }

  // Méthode pour récupérer une commande par ID
  static async getOrderById(orderId) {
    try {
      const orderSnapshot = await db.collection('orders').doc(orderId).get();
      if (orderSnapshot.exists) {
        const orderData = orderSnapshot.data();
        return { orderId, ...orderData }; // Retourne l'ID de la commande et ses détails
      } else {
        throw new Error('Commande non trouvée.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la commande:', error); // Journalisation de l'erreur
      throw new Error('Erreur lors de la récupération de la commande: ' + error.message);
    }
  }
    // Méthode pour récupérer toutes les commandes
    static async getAllOrders() {
      try {
        const ordersSnapshot = await db.collection('orders').get(); // Récupérer tous les documents de la collection 'orders'
        if (ordersSnapshot.empty) {
          throw new Error('Aucune commande trouvée.');
        }
  
        const orders = [];
        ordersSnapshot.forEach(doc => {
          orders.push({ orderId: doc.id, ...doc.data() }); // Ajouter chaque commande à la liste
        });
  
        return orders; // Retourner la liste de toutes les commandes
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error); // Journalisation de l'erreur
        throw new Error('Erreur lors de la récupération des commandes: ' + error.message);
      }
    }
  // Méthode pour mettre à jour le statut de la commande
  static async updateOrderStatus(orderId, status) {
    try {
      const orderRef = db.collection('orders').doc(orderId);
      await orderRef.update({
        status,
        updatedAt: new Date().toISOString(), // Met à jour la date de mise à jour
      });

      // Récupérer la commande mise à jour
      const updatedOrderSnapshot = await orderRef.get();
      return { orderId, ...updatedOrderSnapshot.data() }; // Retourne les informations mises à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la commande:', error); // Journalisation de l'erreur
      throw new Error('Erreur lors de la mise à jour du statut de la commande: ' + error.message);
    }
  }
  
}

module.exports = OrderModel;
