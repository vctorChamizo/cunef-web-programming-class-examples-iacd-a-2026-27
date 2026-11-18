import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import bcrypt from 'bcryptjs';
import pg from 'pg';

// Ejecutar solo sobre la base de datos local del ejemplo.
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
try {
  const sql = await readFile(new URL('../db/migrations/001_initial.sql', import.meta.url), 'utf8');
  await pool.query(sql);
  const hash = await bcrypt.hash('ejemplo123', 10);
  const result = await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email RETURNING id', ['alumno@example.com', hash]);
  await pool.query('INSERT INTO items (name, owner_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM items WHERE name = $1 AND owner_id = $2)', ['Elemento de ejemplo', result.rows[0].id]);
  console.log('Migración y datos de ejemplo preparados.');
} finally { await pool.end(); }
