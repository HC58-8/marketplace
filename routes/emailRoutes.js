const express = require('express'); 
const router = express.Router();
const EmailController = require('../controllers/emailController');

router.post('/mailer', async (req, res) => {
    const { email, fullName, orderDetails } = req.body;

    // Log des données reçues pour vérifier ce qui est envoyé
    console.log('Données reçues dans le corps de la requête:', req.body);

    try {
        // Vérification des paramètres nécessaires
        if (!email || !fullName || !orderDetails || !orderDetails.products || orderDetails.products.length === 0) {
            console.log('Paramètres manquants ou incorrects:');
            console.log('email:', email);
            console.log('fullName:', fullName);
            console.log('orderDetails:', orderDetails);
            return res.status(400).json({
                success: false,
                message: 'Paramètres manquants ou incorrects pour envoyer l\'e-mail.',
            });
        }

        // Appel de la méthode pour envoyer l'email
        const emailSent = await EmailController.sendOrderConfirmation(email, fullName, {
            orderId: 'Non attribué', // Utilisation d'une valeur par défaut
            products: orderDetails.products, // Assurez-vous que "products" est bien envoyé
            // Si vous ne voulez pas envoyer shippingAddress, ne l'ajoutez pas ici
            shippingAddress: orderDetails.shippingAddress || 'Adresse non fournie', // Valeur par défaut si pas d'adresse
        });

        if (emailSent) {
            return res.status(200).json({ success: true, message: 'E-mail envoyé avec succès.' });
        } else {
            return res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'e-mail.' });
        }
    } catch (error) {
        console.error('Erreur backend:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
