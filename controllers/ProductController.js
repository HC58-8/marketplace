const Product = require('../models/ProductModel'); // Importation du modèle Product

const ProductController = {
    // Ajouter un produit
    async addProduct(req, res) {
        const { name, price, category, imgSrc, username } = req.body;
        try {
            // Création du produit via le modèle Product
            const newProduct = new Product(name, price, imgSrc, category, username);
            const addedProduct = await Product.addProduct(newProduct);
            res.status(201).json(addedProduct); // Réponse avec le produit ajouté
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
            res.status(500).json({ message: 'Erreur lors de l\'ajout du produit' });
        }
    },

    // Récupérer tous les produits
    async getAllProducts(req, res) {
        try {
            const products = await Product.getAllProducts();
            res.status(200).json(products); // Réponse avec la liste des produits
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
        }
    },

    // Récupérer les produits d'un utilisateur spécifique
    async getProductsByUser(req, res) {
        const { username } = req.query; // Récupération de l'utilisateur à partir des paramètres de requête
        try {
            const products = await Product.getProductsByUser(username);
            res.status(200).json(products); // Réponse avec la liste des produits de l'utilisateur
        } catch (error) {
            console.error('Erreur lors de la récupération des produits par utilisateur:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
        }
    },
 
       // Récupérer les produits par catégorie
       async getProductsByCategory(req, res) {
        const { category } = req.params; // Extraction du paramètre catégorie depuis l'URL
        try {
            const products = await Product.getProductsByCategory(category); // Appel au modèle pour récupérer les produits
            res.status(200).json(products); // Réponse avec les produits récupérés
        } catch (error) {
            console.error('Erreur lors de la récupération des produits par catégorie:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des produits par catégorie' });
        }
    },

    // Mettre à jour un produit 
    async updateProduct(req, res) {
        const { id } = req.params; // ID du produit à mettre à jour
        const { name, price, category, imgSrc, username } = req.body;
        try {
            const updatedProduct = new Product(name, price, imgSrc, category, username);
            const product = await Product.updateProduct(id, updatedProduct); //le produit mis à jour firebaseeee
            res.status(200).json(product); // Réponse avec le produit mis à jour
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit:', error);
            res.status(500).json({ message: 'Erreur lors de la mise à jour du produit' });
        }
    },

    // Supprimer un produit
    async deleteProduct(req, res) {
        const { id } = req.params; // ID du produit à supprimer
        try {
            await Product.deleteProduct(id);
            res.status(200).json({ message: 'Produit supprimé avec succès' }); // Réponse après suppression
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
            res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
        }
    }
};

module.exports = ProductController;
