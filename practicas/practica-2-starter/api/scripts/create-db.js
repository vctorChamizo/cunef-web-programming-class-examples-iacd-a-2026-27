import 'dotenv/config';
import pg from 'pg';

// Crea la base de datos de DATABASE_URL si no existe. No necesita psql ni createdb:
// se conecta a la base «postgres», que PostgreSQL crea siempre, con el mismo usuario.

// 1. Leer el nombre de la base de datos de DATABASE_URL.
if (!process.env.DATABASE_URL) {
  console.error('Falta DATABASE_URL. Copie api/.env.example a api/.env y revise sus valores.');
  process.exit(1);
}
const url = new URL(process.env.DATABASE_URL);
const name = decodeURIComponent(url.pathname.slice(1));

// CREATE DATABASE no admite parámetros ($1): el nombre se valida antes de insertarlo en el SQL.
if (!/^[a-z_][a-z0-9_]*$/.test(name)) {
  console.error(
    `El nombre de la base de datos («${name}») solo puede tener minúsculas, números y guiones bajos.`,
  );
  process.exit(1);
}

// 2. Conectar con la base «postgres».
url.pathname = '/postgres';
const client = new pg.Client({ connectionString: url.toString() });
try {
  await client.connect();
} catch (error) {
  console.error(`No se puede conectar con PostgreSQL: ${error.message}`);
  console.error(
    'Compruebe que PostgreSQL está en marcha y que el usuario y la contraseña de DATABASE_URL son correctos.',
  );
  process.exit(1);
}

// 3. Crear la base de datos solo si no existe.
try {
  const exists = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [name]);
  if (exists.rowCount > 0) {
    console.log(`La base de datos ${name} ya existe.`);
  } else {
    await client.query(`CREATE DATABASE ${name}`);
    console.log(`Base de datos ${name} creada.`);
  }
} finally {
  await client.end();
}
