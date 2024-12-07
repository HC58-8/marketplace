const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const paymentRoutes = require('./routes/paymentRoutes');
const emailRoutes = require('./routes/emailRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/ProductRoutes');
const config = require('./config/config');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration CORS
const allowedOrigins = [
  'http://localhost:3000', // Frontend React local
  'https://1bde-197-30-220-251.ngrok-free.app', // URL Ngrok (remplacez avec la vôtre)
  'http://localhost:5000' // URL de votre backend
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware pour analyser les corps de requêtes JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Configuration Multer pour les uploads de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier de destination pour les fichiers uploadés
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Génération du nom du fichier
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers JPEG et PNG sont acceptés.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille de fichier 5 Mo
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
});

// Route pour l'upload de fichiers
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier uploadé.' });
  }
  res.json({
    message: 'Fichier uploadé avec succès !',
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Route de configuration (pour les configs générales)
app.get('/api/config', (req, res) => {
  res.json(config);  // Retourne la configuration en tant que réponse JSON
});

// Servir les fichiers statiques uploadés
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Utilisation des routes spécifiques
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/orders', orderRoutes); // Routes des commandes

// Routes de paiement
app.use('/api/payments', paymentRoutes);

// Serveur le fichier build React (production)
app.use(express.static(path.join(__dirname, '../front/build'))); // Assurez-vous que le chemin du build React est correct

// Route pour afficher la page d'accueil de React
app.get('/powerbi', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
});

// Routes spécifiques pour le paiement
app.get('/success', (req, res) => {
  res.send('Paiement réussi !');
});

app.get('/fail', (req, res) => {
  res.send('Paiement échoué.');
});

// Route pour toutes les autres demandes (SPA React)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
});

// Gestion des erreurs 404 pour les routes non définies
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Requête reçue de ${req.ip}`);
  next();
});


// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur https://localhost:${PORT}`);
});
