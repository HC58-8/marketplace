const multer = require('multer');
const path = require('path');

// Configuration de stockage pour multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier cible pour les fichiers téléchargés
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Génère un nom de fichier unique
  },
});

// Filtrage des types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers JPEG et PNG sont acceptés.'), false);
  }
};

// Configuration de multer avec limites de taille
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB pour chaque fichier
});

module.exports = upload;
