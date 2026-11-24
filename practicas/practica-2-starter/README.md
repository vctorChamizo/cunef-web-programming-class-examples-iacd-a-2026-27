# Práctica 2 · Arquitectura base

Ejemplo local para entender cómo conviven una API Express, PostgreSQL y una aplicación React. `items` es un recurso genérico de demostración, no el dominio de la práctica. La entrega de P2 debe ampliar la P1 y cumplir el enunciado publicado. Este ejemplo no implementa el CRUD completo, los permisos por rol, las consultas paginadas, el detalle ni los agentes requeridos.

## Requisitos

- **Node.js 22.12 o superior** y npm. Comprobarlo con `node -v`.
- **PostgreSQL instalado y en marcha**: Postgres.app o Homebrew en macOS, o el instalador oficial en Windows. No hace falta tener `psql` ni `createdb` en el terminal: la base de datos se crea con `npm run db:create`.
- Conocer el **usuario y la contraseña de PostgreSQL** de la máquina (paso 2).

## Estructura

```text
api/
  src/
    app.js       # orden de los middleware: cors → express.json → rutas → 404 → errores
    server.js    # lee api/.env y arranca la app
    routes/      # auth.js (/auth/login, /auth/me) e items.js (/items)
    controllers/ # auth.js (login en cuatro pasos) e items.js
    models/      # users.js e items.js: consultas parametrizadas con pg
    validators/  # items.js (Zod)
    middleware/  # auth.js (requireAuth) y errors.js
  db/migrations/ # SQL de la estructura mínima
  scripts/       # creación de la base de datos, migración y datos iniciales
client/
  src/           # páginas React, AuthContext, ruta protegida y cliente Axios
AI/              # plantillas para documentar los agentes de la práctica
```

La API recibe las peticiones HTTP, valida los datos y utiliza el modelo para consultar PostgreSQL. El navegador no se conecta a la base de datos. `client/` es el nombre exigido por el enunciado; `client/src/` contiene React y `client/public/` puede contener archivos estáticos si hacen falta.

## Preparación

Todos los comandos se ejecutan **desde esta carpeta** (`practicas/practica-2-starter/`), en el orden indicado.

### 1. Copiar la configuración

macOS o Linux:

```bash
cp api/.env.example api/.env
cp client/.env.example client/.env
```

Windows (PowerShell):

```powershell
Copy-Item api/.env.example api/.env
Copy-Item client/.env.example client/.env
```

Sin `api/.env`, la API se detiene con el mensaje `Revise api/.env`. Los archivos `.env` no se suben al repositorio (están en `.gitignore`).

### 2. Ajustar `DATABASE_URL` en `api/.env`

El formato es `postgresql://USUARIO:CONTRASEÑA@localhost:5432/p2_starter`. El valor de ejemplo usa el usuario `postgres` con la contraseña `postgres`; hay que cambiarlo por los datos de la máquina:

| Instalación de PostgreSQL | Usuario | Contraseña | `DATABASE_URL` |
|---|---|---|---|
| Postgres.app o Homebrew (macOS) | El usuario del Mac (el que muestra `whoami`) | Ninguna | `postgresql://USUARIO_DEL_MAC@localhost:5432/p2_starter` |
| Instalador oficial (Windows o macOS) | `postgres` | La que se eligió al instalar | `postgresql://postgres:CONTRASEÑA@localhost:5432/p2_starter` |

El resto de valores puede quedarse como está:

- `JWT_SECRET`: cualquier texto; solo se usa en local.
- `CLIENT_ORIGIN`: las direcciones desde las que React puede llamar a la API (CORS).
- `client/.env`, con `VITE_API_URL=http://localhost:3000`: la dirección de la API para el navegador.

### 3. Instalar las dependencias

```bash
npm ci
npm run install:all
```

`npm ci` instala en esta carpeta la herramienta que arranca los dos procesos a la vez (`concurrently`). `install:all` instala las dependencias de `api/` y de `client/`, que tienen cada una su `package.json`.

### 4. Crear la base de datos

```bash
npm run db:create
```

Crea la base de datos de `DATABASE_URL` (`p2_starter`) si no existe y muestra `Base de datos p2_starter creada.` o `La base de datos p2_starter ya existe.`

Si el terminal tiene las herramientas de PostgreSQL, se puede usar en su lugar `createdb p2_starter` o `psql -d postgres -c "CREATE DATABASE p2_starter"`.

### 5. Crear las tablas y los datos de ejemplo

```bash
npm run db:setup
```

Ejecuta la migración SQL de `api/db/migrations/` y añade el **usuario de prueba** (siguiente sección) y un elemento de demostración. Debe terminar con `Migración y datos de ejemplo preparados.` Se puede repetir sin problema: no duplica el usuario ni el elemento.

## Usuario de prueba

`npm run db:setup` deja creado un usuario para entrar en la aplicación sin tener que registrarse:

| Correo | Contraseña |
|---|---|
| `alumno@example.com` | `ejemplo123` |

- Se guarda en la tabla `users` con la contraseña cifrada con `bcryptjs`, como cualquier otro usuario.
- Sirve para iniciar sesión en «Entrar» y para obtener un token desde un cliente HTTP:
  `POST http://localhost:3000/auth/login` con el cuerpo `{ "email": "alumno@example.com", "password": "ejemplo123" }`.
- Es **solo para desarrollo local**. En la P2, los usuarios de prueba propios se crean en los datos iniciales (*seed*) de la práctica.

## Arranque y comprobación

```bash
npm run dev
```

El comando arranca la API (`[API]`, puerto 3000) y React (`[CLIENT]`, puerto 5173) en la misma terminal. También pueden utilizarse dos terminales desde esta carpeta, una con `npm run dev:api` y otra con `npm run dev:web`. Los dos procesos deben seguir abiertos mientras se usa la aplicación; se detienen con `Ctrl+C`.

Abrir la dirección que muestra Vite (`http://127.0.0.1:5173`) o `http://localhost:5173`; las dos están autorizadas en `CLIENT_ORIGIN`. Para comprobar que todo funciona:

1. `http://localhost:3000/health` responde `{"status":"ok","database":"ok"}`: la API está en marcha y conecta con PostgreSQL.
2. La página de inicio muestra «Elemento de ejemplo»: React llama a `GET /items` y la API consulta PostgreSQL.
3. «Zona protegida» sin sesión redirige al login.
4. Tras entrar con el usuario de prueba (`alumno@example.com` / `ejemplo123`), la zona protegida muestra «La API ha aceptado el token.»: el token se guarda en `localStorage` y se envía en cada petición. La sesión se mantiene al recargar y el botón «Salir» la borra.

`POST /items` requiere token y valida un nombre; se proporciona para observar el recorrido completo (`requireAuth` → `validateItem` → controlador → modelo), no como solución de la práctica.

## Problemas frecuentes

| Mensaje | Causa | Solución |
|---|---|---|
| `Error: Revise api/.env` | No existe `api/.env` o le falta alguna variable | Paso 1 |
| `password authentication failed` o `role "postgres" does not exist` | El usuario o la contraseña de `DATABASE_URL` no son los de la máquina | Paso 2 |
| `No se puede conectar con PostgreSQL` o `ECONNREFUSED` | PostgreSQL no está en marcha | Arrancar Postgres.app, el servicio de Homebrew (`brew services start postgresql@16`) o el servicio de Windows |
| `database "p2_starter" does not exist` | No se ha creado la base de datos | Paso 4 |
| `command not found: psql` o `createdb` | Las herramientas de PostgreSQL no están en el terminal | Usar `npm run db:create` (paso 4) |
| «No se ha podido iniciar sesión» con el usuario de prueba | No se ha ejecutado `npm run db:setup`, o la API no está arrancada | Paso 5 y `http://localhost:3000/health` |
| `concurrently: command not found` | Falta `npm ci` en esta carpeta | Paso 3 |
| `Port 5173 is in use` o `EADDRINUSE :3000` | Otro proceso usa ese puerto (por ejemplo, otro ejemplo de clase) | Cerrarlo con `Ctrl+C` en su terminal |
| La página dice «No se ha podido consultar la API» | La API no está arrancada, o la dirección del navegador no está en `CLIENT_ORIGIN` (la consola muestra `blocked by CORS policy`) | Comprobar `http://localhost:3000/health`. Si se usa otro puerto u otra dirección, añadirla a `CLIENT_ORIGIN` y reiniciar la API |
| Un cambio en un `.env` no tiene efecto | Node y Vite leen el `.env` al arrancar | Detener con `Ctrl+C` y volver a ejecutar `npm run dev` |

## Arquitectura

La API autoriza mediante CORS los orígenes de `CLIENT_ORIGIN`, separados por comas. Si se cambia el puerto de Vite, hay que añadir la nueva dirección y reiniciar la API. `VITE_API_URL` indica al navegador la dirección de Express.

```text
React (client/)  ── HTTP + JSON ──▶  Express (api/)                                        ──▶  PostgreSQL
services/api.js                      cors → express.json → routes → requireAuth → validator
(Axios + token)                      → controller → model (pg, $1)
```

## Continuación de P2

Conservar el historial y el dominio de P1. Sustituir el recurso de ejemplo, aplicar migraciones y datos propios, y completar el contrato, roles, validación, cliente, documentación y agentes del enunciado. La estructura del ejemplo deja acceso a datos en `api/src/models/`; al trasladarla al repositorio de la práctica debe respetarse el requisito `src/models/` del enunciado dentro de la aplicación API. La reutilización de un hook propio exigida en P2 se implementa en la práctica y no forma parte de este punto de partida.
