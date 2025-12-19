const jwt = require('jsonwebtoken');

// Middleware para verificar el token 
function authenticateToken (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso denegado, no hay token' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    
    req.user = user;
    
    next();
  });
};

module.exports = authenticateToken; 