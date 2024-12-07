const OrderModel = require('../models/OrderModel'); // Modèle de commande
const PaymentModel = require('../models/PaymentModel'); // Modèle de paiement

class OrderController {
    // Méthode pour créer une commande
    static async createOrder(req, res) {
        try {
            const { userId, products, shippingAddress, totalAmount, cardDetails } = req.body;
            console.log('Données reçuesssssss:', req.body);

            
            

            // Créer la commande
            const order = await OrderModel.createOrder({
                userId,
                products,
                shippingAddress,
                totalAmount,
            });

            if (!order) {
                return res.status(500).json({
                    success: false,
                    message: 'Échec de la création de la commande.',
                });
            }

            // Initier le paiement
            const payment = await PaymentModel.createPayment({
                orderId: order.orderId,
                totalAmount,
                cardDetails,
            });

            if (!payment) {
                return res.status(500).json({
                    success: false,
                    message: 'Échec du traitement du paiement.',
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Commande et paiement créés avec succès.',
                orderId: order.orderId,
                paymentId: payment.paymentId,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Erreur lors de la création de la commande.',
            });
        }
    }

    // Méthode pour récupérer une commande par ID
    static async getOrderById(req, res) {
        const { orderId } = req.params;
        try {
            const order = await OrderModel.getOrderById(orderId);
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Commande non trouvée.',
                });
            }
            return res.status(200).json({ success: true, order });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async getAllOrders(req, res) {
      try {
          const orders = await OrderModel.getAllOrders(); // Appeler la méthode pour récupérer toutes les commandes
          if (orders.length === 0) {
              return res.status(404).json({
                  success: false,
                  message: 'Aucune commande trouvée.',
              });
          }
          return res.status(200).json({
              success: true,
              orders, // Retourner la liste des commandes
          });
      } catch (error) {
          return res.status(500).json({
              success: false,
              message: error.message,
          });
      }
  }

    // Méthode pour mettre à jour le statut de la commande
    static async updateOrderStatus(req, res) {
        const { orderId } = req.params;
        const { status } = req.body;

        try {
            const isUpdated = await OrderModel.updateOrderStatus(orderId, status);
            if (isUpdated) {
                return res.status(200).json({
                    success: true,
                    message: 'Statut de la commande mis à jour avec succès.',
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Échec de la mise à jour du statut.',
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = OrderController;
