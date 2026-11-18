import pg from 'pg';
// El modelo recibe esta conexión para evitar acoplar las consultas a Express.
export const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
