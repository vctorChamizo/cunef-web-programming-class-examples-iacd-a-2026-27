import 'dotenv/config';
import { db } from './db.js';
import { createApp } from './app.js';
if (!process.env.DATABASE_URL || !process.env.JWT_SECRET || !process.env.CLIENT_ORIGIN) throw new Error('Revise api/.env');
createApp(db).listen(process.env.PORT || 3000, () => console.log('API disponible en http://localhost:' + (process.env.PORT || 3000)));
