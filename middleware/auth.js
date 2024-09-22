// middleware/auth.js
exports.isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token
    if (!decoded.isAdmin) return res.status(403).json({ message: 'Acesso negado' });
    next(); // Se for admin, continua
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
