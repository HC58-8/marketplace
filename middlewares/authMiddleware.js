const checkAuth = async (req, res, next) => {
  console.log('En-têtes de la requête :', req.headers); // Debug

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Token manquant ou invalide.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Erreur de vérification du token :', error.message);
    res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};
