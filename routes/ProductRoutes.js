const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Route pour ajouter un produit
router.post('/add', ProductController.addProduct);

// Route pour récupérer tous les produits
router.get('/all', ProductController.getAllProducts);

// Route pour récupérer les produits d'un utilisateur spécifique
router.get('/user', ProductController.getProductsByUser);

// Route pour récupérer les produits par catégorie
router.get('/category/:category', ProductController.getProductsByCategory); // Nouvelle route pour les produits par catégorie


// Route pour mettre à jour un produit
router.put('/update/:id', ProductController.updateProduct);
// Route pour mettre à jour un produit
router.put('/update/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
        res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
});

  
// Route pour supprimer un produit
router.delete('/delete/:id', ProductController.deleteProduct);


module.exports = router;
