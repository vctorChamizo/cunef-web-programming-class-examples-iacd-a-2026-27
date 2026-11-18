import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createItemsModel } from './models/items.js';
import { createItemsController } from './controllers/items.js';
import { itemsRouter } from './routes/items.js';
import { requireAuth } from './middleware/auth.js';
import { errors } from './middleware/errors.js';

export function createApp(db) {
  const app = express();
  app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
  app.use(express.json());
  app.get('/health', async (req, res) => { await db.query('SELECT 1'); res.json({ status: 'ok', database: 'ok' }); });
  app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (typeof email !== 'string' || typeof password !== 'string') return res.status(401).json({ message: 'Credenciales incorrectas.' });
    const result = await db.query('SELECT id, email, password_hash FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ message: 'Credenciales incorrectas.' });
    res.json({ token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' }) });
  });
  app.get('/auth/me', requireAuth, (req, res) => res.json({ id: req.user.id }));
  app.use('/items', itemsRouter(createItemsController(createItemsModel(db))));
  app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada.' }));
  app.use(errors);
  return app;
}
