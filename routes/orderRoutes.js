const express = require('express');
const OrderController = require('../controllers/orderController');
const router = express.Router();



router.get('/', OrderController.getAllOrders); // Nouvelle route pour récupérer toutes les commandes

router.post('/create', OrderController.createOrder); // Créer une commande et un paiement
router.get('/:orderId', OrderController.getOrderById); // Récupérer une commande par ID
router.patch('/:orderId/status', OrderController.updateOrderStatus); // Mettre à jour le statut d'une commande

module.exports = router;
