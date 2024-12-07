const { db } = require('../config/firebase');

class Product {
    constructor(name, price, imgSrc, category, userName) {
        this.name = name;
        this.price = price;
        this.imgSrc = imgSrc;
        this.category = category;
        this.userName = userName;
    }

    // Ajouter un produit
    static async addProduct(product) {
        try {
            const productRef = db.collection('products').doc(); // Créer un nouveau document
            await productRef.set({
                name: product.name,
                price: product.price,
                category: product.category,
                imgSrc: product.imgSrc,
                userName: product.userName
            });
            return { id: productRef.id, ...product }; // Retourne l'ID du document et les données
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
            throw new Error('Erreur lors de l\'ajout du produit');
        }
    }

    // Récupérer tous les produits
    static async getAllProducts() {
        try {
            const snapshot = await db.collection('products').get();
            const products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return products;
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            throw new Error('Erreur lors de la récupération des produits');
        }
    }

    // Récupérer des produits par utilisateur
    static async getProductsByUser(userName) {
        try {
            const snapshot = await db.collection('products').where('userName', '==', userName).get();
            const products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return products;
        } catch (error) {
            console.error('Erreur lors de la récupération des produits par utilisateur:', error);
            throw new Error('Erreur lors de la récupération des produits par utilisateur');
        }
    }

    // Mettre à jour un produit
  // Mettre à jour un produit
async updateProduct(req, res) {
    const { id } = req.params;  // ID du produit à mettre à jour
    const { name, price, category, imgSrc, username } = req.body;

    try {
        // Chercher le produit existant par son ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        // Mettre à jour les informations du produit
        product.name = name;
        product.price = price;
        product.category = category;
        product.imgSrc = imgSrc;
        product.username = username ; // Si username est fourni, l'utiliser sinon garder l'existant

        // Sauvegarder les changements
        await product.save();

        // Retourner le produit mis à jour
        res.status(200).json(product);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du produit' });
    }
}


    // Supprimer un produit
    static async deleteProduct(id) {
        try {
            const productRef = db.collection('products').doc(id);
            await productRef.delete(); // Supprimer le document
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
            throw new Error('Erreur lors de la suppression du produit');
        }
    }
     // Récupérer les produits par catégorie
    static async getProductsByCategory(category) {
        try {
            const snapshot = await db.collection('products').where('category', '==', category).get(); // Filtrer par catégorie
            const products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return products; // Retourne les produits correspondant à la catégorie
        } catch (error) {
            console.error('Erreur lors de la récupération des produits par catégorie:', error);
            throw new Error('Erreur lors de la récupération des produits par catégorie');
        }
    }
}

module.exports = Product;
