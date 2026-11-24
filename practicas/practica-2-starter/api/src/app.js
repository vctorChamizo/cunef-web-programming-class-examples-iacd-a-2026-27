import express from 'express';
import cors from 'cors';
import { createItemsModel } from './models/items.js';
import { createItemsController } from './controllers/items.js';
import { itemsRouter } from './routes/items.js';
import { createUsersModel } from './models/users.js';
import { createAuthController } from './controllers/auth.js';
import { authRouter } from './routes/auth.js';
import { errors } from './middleware/errors.js';

export function createApp(db) {
  const app = express();

  // El orden importa: Express ejecuta los middleware en el orden en que se registran.
  // 1. CORS. CLIENT_ORIGIN admite varios orígenes separados por comas
  //    (localhost y 127.0.0.1 son orígenes distintos para el navegador).
  const allowedOrigins = process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim());
  app.use(cors({ origin: allowedOrigins }));

  // 2. Lectura del cuerpo JSON, antes de las rutas que usan req.body.
  app.use(express.json());

  // 3. Rutas.
  app.get('/health', async (req, res) => {
    await db.query('SELECT 1');
    res.json({ status: 'ok', database: 'ok' });
  });
  app.use('/auth', authRouter(createAuthController(createUsersModel(db))));
  app.use('/items', itemsRouter(createItemsController(createItemsModel(db))));

  // 4. 404: solo se alcanza si ninguna ruta anterior ha respondido.
  app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada.' });
  });

  // 5. Manejador de errores: va el último porque recibe los errores de todo lo anterior.
  app.use(errors);

  return app;
}
