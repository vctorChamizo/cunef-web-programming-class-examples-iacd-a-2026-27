# Preparar el entorno completo

## 1. Comprobar herramientas

Abrir una terminal en la raíz del repositorio y ejecutar:

```text
node --version
npm --version
```

Se necesita Node 22.12 o superior. En Windows, si PowerShell bloquea npm.ps1,
usar npm.cmd en los comandos. Instalar y arrancar PostgreSQL siguiendo la
[guía de instalación de semana 7](../../semana-07/docs/01-INSTALACION.md).
En macOS se puede usar Postgres.app. En Windows comprobar el servicio PostgreSQL
en la aplicación Servicios. pgAdmin es un cliente y no arranca por sí mismo el servidor.

## 2. Preparar la API

En una terminal, desde la raíz del repositorio:

```text
cd semana-08
npm ci
```

Si todavía no existe semana-08/.env, copiar la plantilla una vez:

```sh
# macOS
cp .env.template .env
```

```powershell
# Windows PowerShell
Copy-Item .env.template .env
```

Editar .env. DATABASE_URL debe contener el usuario y contraseña locales y una
base nueva llamada aula_web_semana08. La guía de semana 8 explica la codificación
de caracteres especiales y los permisos de creación. JWT_SECRET necesita un
secreto propio, generado con este comando en la terminal:

```text
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Copiar el resultado en JWT_SECRET. Mantener PORT=3000 y
CORS_ORIGINS=http://localhost:5173. No sobrescribir un .env ya configurado.

Con PostgreSQL arrancado, ejecutar:

```text
npm run db:create
npm run db:migrate
npm run db:seed
npm run db:check
npm start
```

db:check debe mostrar tres comprobaciones OK. Dejar la terminal abierta y
abrir http://localhost:3000/health/db, que debe responder status ok. En una base
nueva el seed crea Ana, Luis y diez tareas. Repetirlo no restaura tareas editadas.

## 3. Preparar React

Abrir otra terminal desde la raíz del repositorio:

```text
cd semana-11
npm ci
```

Si .env aún no existe, ejecutar cp .env.template .env en macOS o
Copy-Item .env.template .env en PowerShell. Su contenido debe incluir:

```text
VITE_API_URL=http://localhost:3000
```

Después ejecutar npm run dev y abrir exactamente http://localhost:5173.
Vite lee el .env al arrancar. Si se modifica, detenerlo con Ctrl+C y volverlo a
arrancar. localhost y 127.0.0.1 son orígenes distintos para CORS.

## 4. Verificación completa

1. Abrir /tasks sin sesión. Debe redirigir a /login.
2. Entrar con ana@example.com y AulaSegura8!. Deben aparecer las tareas de Ana.
3. Crear una tarea, abrirla y comprobar su fila en PostgreSQL con pgAdmin.
4. Acceder a un id inexistente y comprobar el mensaje 404.
5. Cerrar sesión, entrar con Luis y comprobar que solo aparecen sus tareas.
6. Detener la API, volver a abrir Tareas y comprobar el error de conexión.
   Arrancar la API y pulsar Reintentar.

Para volver a ejecutar más adelante basta arrancar PostgreSQL, ejecutar npm start
en semana-08 y npm run dev en semana-11. Los datos permanecen en la base.

## 5. Diagnóstico

| Resultado | Comprobación |
|---|---|
| ECONNREFUSED en db:check | PostgreSQL arrancado y host/puerto del .env de semana 8 |
| 28P01 | Usuario y contraseña locales de DATABASE_URL |
| 3D000 | Ejecutar db:create con permiso CREATEDB |
| 42P01 o 42703 | Revisar que se usa la base correcta y ejecutar db:migrate |
| Puerto 3000 o 5173 ocupado | Identificar el proceso y detener el servidor anterior |
| Falta VITE_API_URL | Copiar la plantilla y reiniciar Vite |
| Error de conexión en React | Comprobar /health/db, VITE_API_URL y CORS_ORIGINS |
| 401 | Hacer login de nuevo; el JWT del ejemplo caduca |
| 403 | La tarea pertenece a otra cuenta |
| 404 | Comprobar que existe la tarea solicitada |

No se ha realizado una instalación nativa de Windows durante esta revisión.
