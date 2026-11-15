# Semana 11 · Datos y navegación en React

La lista de tareas de semana 10 consulta la API de semana 8. El recorrido
incluye Axios, login con JWT, estados de carga y error y navegación SPA con
React Router. Se utilizan componentes shadcn/ui ya preparados.

Requisitos: Node 22.12 o posterior, PostgreSQL y la API de semana 8 configurada.

Desde la raíz del repositorio, en una primera terminal:

```text
cd semana-08
npm ci
npm run db:create
npm run db:migrate
npm run db:seed
npm run db:check
npm start
```

Antes de esos comandos hay que configurar semana-08/.env siguiendo su
[guía de preparación](../semana-08/docs/01-PREPARACION.md). Mantener la API
abierta en localhost:3000.

En una segunda terminal, desde la raíz del repositorio:

```text
cd semana-11
npm ci
```

Copiar .env.template como .env. En macOS: `cp .env.template .env`.
En PowerShell: `Copy-Item .env.template .env`. Después ejecutar:

```text
npm run dev
```

Abrir http://localhost:5173. El origen debe coincidir con CORS_ORIGINS de la
API. Si el puerto está ocupado, detener el otro servidor. En PowerShell se
puede usar npm.cmd si npm.ps1 está bloqueado.

Datos ficticios del seed: ana@example.com o luis@example.com, contraseña
AulaSegura8!. La base recién creada contiene siete tareas de Ana y tres de Luis.
El seed no restablece modificaciones previas.

Seguir la [guía paso a paso](docs/01-RECORRIDO.md). La práctica L9 conserva su
propio enunciado y proyecto.
