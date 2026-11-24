import 'dotenv/config';
import { db } from './db.js';
import { createApp } from './app.js';

if (!process.env.DATABASE_URL || !process.env.JWT_SECRET || !process.env.CLIENT_ORIGIN) {
  throw new Error('Revise api/.env');
}

const port = process.env.PORT || 3000;
createApp(db).listen(port, () => {
  console.log('API disponible en http://localhost:' + port);
});
