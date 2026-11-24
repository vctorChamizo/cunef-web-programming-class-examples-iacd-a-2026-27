import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import bcrypt from 'bcryptjs';
import pg from 'pg';

// Ejecutar solo sobre la base de datos local del ejemplo.
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

try {
  // 1. Crear las tablas. La migración usa IF NOT EXISTS, así que puede repetirse.
  const migrationUrl = new URL('../db/migrations/001_initial.sql', import.meta.url);
  const sql = await readFile(migrationUrl, 'utf8');
  await pool.query(sql);

  // 2. Crear el usuario de prueba, con la contraseña cifrada como cualquier otro usuario.
  // ON CONFLICT ... RETURNING devuelve el id también cuando el usuario ya existía.
  const hash = await bcrypt.hash('ejemplo123', 10);
  const userResult = await pool.query(
    `INSERT INTO users (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
     RETURNING id`,
    ['alumno@example.com', hash],
  );
  const userId = userResult.rows[0].id;

  // 3. Crear el elemento de ejemplo solo si no existe, para no duplicarlo.
  await pool.query(
    `INSERT INTO items (name, owner_id)
     SELECT $1, $2
     WHERE NOT EXISTS (SELECT 1 FROM items WHERE name = $1 AND owner_id = $2)`,
    ['Elemento de ejemplo', userId],
  );

  console.log('Migración y datos de ejemplo preparados.');
} finally {
  await pool.end();
}
