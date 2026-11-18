# Práctica 2 · Arquitectura base

Ejemplo local para entender cómo conviven una API Express, PostgreSQL y una aplicación React. `items` es un recurso genérico de demostración, no el dominio de la práctica. La entrega de P2 debe ampliar la P1 y cumplir el enunciado publicado. Este ejemplo no implementa el CRUD completo, los permisos por rol, las consultas paginadas, el detalle ni los agentes requeridos.

## Requisitos

- Node.js 22.12 o superior y npm.
- PostgreSQL instalado y en ejecución, con permiso para crear una base de datos.

## Estructura

```text
api/
  src/       # app y server separados; routes, controllers, models, validators y middleware
  db/migrations/ # SQL de la estructura mínima
  scripts/   # aplicación de la migración y datos iniciales
client/
  src/       # páginas React, AuthContext, ruta protegida y cliente Axios
AI/          # plantillas para documentar los agentes de la práctica
```

La API recibe las peticiones HTTP, valida los datos y utiliza el modelo para consultar PostgreSQL. El navegador no se conecta a la base de datos. `client/` es el nombre exigido por el enunciado; `client/src/` contiene React y `client/public/` puede contener archivos estáticos si hacen falta.

## Preparación

Desde un clon limpio, entrar en esta carpeta. Crear una base de datos vacía con el usuario de PostgreSQL disponible en la máquina:

```bash
createdb p2_starter
```

Copiar las configuraciones y adaptar los valores locales. En particular, `DATABASE_URL` debe incluir usuario y contraseña válidos para la base de datos creada. No subir los archivos `.env` al repositorio.

```bash
cp api/.env.example api/.env
cp client/.env.example client/.env
npm ci
npm run install:all
npm run db:setup
```

`db:setup` ejecuta la migración SQL y añade un usuario y un elemento de demostración. La credencial local es `alumno@example.com` / `ejemplo123`. La configuración es solo para desarrollo local.

## Arranque y comprobación

```bash
npm run dev
```

El comando arranca ambos procesos. También pueden utilizarse dos terminales desde esta carpeta:

```bash
npm run dev:api
npm run dev:web
```

Abrir `http://localhost:5173`. La lista solicita `GET /items` y permite actualizar. Sin sesión, la zona protegida redirige al login. Tras entrar con la credencial de ejemplo, la zona protegida solicita `GET /auth/me` con el token guardado en `localStorage`. El botón Salir borra la sesión. La API en `http://localhost:3000/health` comprueba también la conexión con PostgreSQL. `POST /items` requiere token y valida un nombre; se proporciona para observar el recorrido completo, no como solución de la práctica.

La API autoriza mediante CORS el origen indicado en `CLIENT_ORIGIN`. Si se cambia el puerto de Vite, debe cambiarse ese valor y reiniciarse la API. `VITE_API_URL` indica al navegador la dirección de Express. Ambos procesos deben seguir abiertos durante el uso.

## Continuación de P2

Conservar el historial y el dominio de P1. Sustituir el recurso de ejemplo, aplicar migraciones y datos propios, y completar el contrato, roles, validación, cliente, documentación y agentes del enunciado. La estructura del ejemplo deja acceso a datos en `api/src/models/`; al trasladarla al repositorio de la práctica debe respetarse el requisito `src/models/` del enunciado dentro de la aplicación API. La reutilización de un hook propio exigida en P2 se implementa en la práctica y no forma parte de este punto de partida.
