const express = require('express');
const PaymentController = require('../controllers/paymentController');

const router = express.Router();

// Route pour initier un paiement
router.post('/add', PaymentController.addPayment);
router.get('/all', PaymentController.getAllPayments);

 
module.exports = router;
