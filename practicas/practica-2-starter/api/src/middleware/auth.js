import jwt from 'jsonwebtoken';
export function requireAuth(req, res, next) {
  const match = /^Bearer (.+)$/.exec(req.get('Authorization') || '');
  if (!match) return res.status(401).json({ message: 'Se requiere una sesión válida.' });
  try { req.user = jwt.verify(match[1], process.env.JWT_SECRET); next(); }
  catch { return res.status(401).json({ message: 'Se requiere una sesión válida.' }); }
}
