import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export function createAuthController(usersModel) {
  return {
    async login(req, res) {
      // 1. Leer las credenciales.
      const { email, password } = req.body || {};
      if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }

      // 2. Buscar el usuario.
      const user = await usersModel.findByEmail(email);

      // 3. Comparar la contraseña con el hash guardado.
      // El mismo mensaje para «no existe» y «contraseña incorrecta» evita revelar qué correos están registrados.
      const passwordMatches = user ? await bcrypt.compare(password, user.password_hash) : false;
      if (!passwordMatches) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }

      // 4. Firmar el token.
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
      res.json({ token });
    },

    me(req, res) {
      res.json({ id: req.user.id });
    },
  };
}
