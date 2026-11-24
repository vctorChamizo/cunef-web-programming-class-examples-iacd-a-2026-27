# Ejemplos de clase — G247

Ejemplos progresivos empleados en las clases de Programación de Aplicaciones Web.

| Semana | Contenido | Carpeta |
|---|---|---|
| 1 | HTML semántico sin estilos | [`semana-01/`](semana-01/) |
| 2 | El mismo documento con CSS básico | [`semana-02/`](semana-02/) |
| 3 | JavaScript: variables, tipos, control de flujo y funciones | [`semana-03/`](semana-03/) |
| 4 | Repaso de arrays/control de flujo y ejemplos básicos de DOM | [`semana-04/`](semana-04/) |
| 5 | Node.js, Express, rutas y middleware | [`semana-05/`](semana-05/) |
| 6 | Controladores, manejo de errores y API REST CRUD | [`semana-06/`](semana-06/) |
| 7 | Diseño relacional, PostgreSQL, migraciones y capa de modelos | [`semana-07/`](semana-07/) |
| 8 | JWT, autorización, contraseñas, CORS, validación y paginación | [`semana-08/`](semana-08/) |
| 10 | React progresivo: fundamentos, shadcn/ui y hooks | [`semana-10/`](semana-10/) |
| 11 | Axios, JWT, estados de petición y React Router | [`semana-11/`](semana-11/) |
| 12 | Estado compartido y Context API | [`semana-12/`](semana-12/) |

## Prácticas

| Material | Contenido | Carpeta |
|---|---|---|
| Arranque de P1 | Ejemplo funcional de la conexión entre interfaz de navegador y API Express. No es una plantilla entregable. | [`practicas/practica-1-starter/`](practicas/practica-1-starter/) |
| Arquitectura base de P2 | Ejemplo de API Express con PostgreSQL y cliente React con Axios, `AuthContext` y ruta protegida en un mismo proyecto. Se instala y arranca desde su propia carpeta, según su README. No es una plantilla entregable. | [`practicas/practica-2-starter/`](practicas/practica-2-starter/) |

La progresión pasa del JavaScript ejecutado en el navegador a una API de tareas en Node.js y Express. Los recursos `tasks` y `users` se mantienen como hilo conductor del bloque II.

## Arranque desde Orca

Abrir una terminal en la raíz del repositorio y ejecutar el comando de la semana.
`npm run` muestra todos los comandos disponibles. Estos comandos también funcionan
fuera de Orca.

| Semana | Comando | Dirección |
|---|---|---|
| 1–4 | `npm run start:01` a `npm run start:04` | http://127.0.0.1:8000 |
| 5–8 | `npm run start:05` a `npm run start:08` | http://localhost:3000 |
| 10 | `npm run start:10` | http://127.0.0.1:5173 |
| 11 | `npm run start:11` | http://localhost:5173 |
| 12 | `npm run start:12` | http://localhost:5173 |
| Arranque de P2 | `npm run start:p2` (API y cliente a la vez) | http://localhost:5173 · API en http://localhost:3000 |

Los comandos requieren Node.js y npm. Para todos los ejemplos se puede utilizar
Node.js 22.12 o posterior. Las semanas 1–4 requieren además Python 3.

### Preparación inicial

Para cada semana con dependencias, ejecutar una vez `npm run install:XX`,
sustituyendo `XX` por `05`, `06`, `07`, `08`, `10`, `11` o `12`. Repetir la instalación
si cambia el archivo de dependencias bloqueadas de esa semana.

Configurar los archivos `.env` siguiendo el README de cada ejemplo.
Las semanas 7 y 8 requieren PostgreSQL y la preparación de su base de datos,
con los comandos de creación, migración y datos de ejemplo que documentan sus
README. El comando de arranque presupone esa preparación completada.

### Semanas 11 y 12 con API

1. Preparar la base de datos y el `.env` de semana 8 siguiendo su README.
2. Ejecutar `npm run install:08` y `npm run start:08` en una terminal.
3. En otra terminal, ejecutar `npm run install:11` y `npm run start:11`, o
   `npm run install:12` y `npm run start:12`, con el `.env` de la semana elegida
   configurado. Solo puede ejecutarse uno de los dos clientes en el puerto 5173.
4. Abrir http://localhost:5173. El origen debe estar permitido por la
   configuración CORS de la API.

### Arranque de P2

El arranque de P2 contiene su propia API y su propio cliente, y no depende de
semana 8. Requiere PostgreSQL en marcha.

1. Copiar `api/.env.example` a `api/.env` y `client/.env.example` a
   `client/.env` dentro de `practicas/practica-2-starter/`, y ajustar
   `DATABASE_URL` como indica su README.
2. Ejecutar una vez `npm run install:p2` para instalar las dependencias de la
   carpeta, de `api/` y de `client/`.
3. Ejecutar una vez `npm run db:p2`, que crea la base de datos `p2_starter`,
   aplica la migración y añade los datos de ejemplo. Puede repetirse sin
   duplicar datos.
4. Ejecutar `npm run start:p2`. La API (puerto 3000) y el cliente (puerto 5173)
   se arrancan en la misma terminal y se detienen juntos con `Ctrl+C`.

### Detener y cambiar de ejemplo

Pulsar `Ctrl+C` en su terminal. Las semanas 1–4 comparten el puerto 8000,
las APIs comparten el 3000 y los clientes React comparten el 5173. Detener
el ejemplo anterior antes de arrancar otro que use el mismo puerto.
Los comandos React fallan si el puerto está ocupado, para conservar la URL
prevista y la configuración CORS.
