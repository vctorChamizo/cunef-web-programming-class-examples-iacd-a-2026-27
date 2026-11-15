# Recorrido de la petición y la navegación

## 1. Preparación y primera prueba

Comprobar en http://localhost:3000/health/db que la API responde status ok.
Abrir http://localhost:5173. Pulsar Tareas sin haber iniciado sesión. Protected
devuelve Navigate y la URL cambia a /login. Entrar con ana@example.com y
AulaSegura8!. Aparecen las tareas propias. Recargar y comprobar que la sesión
se recupera del localStorage.

## 2. Del formulario a PostgreSQL

1. pages/Login.jsx recibe el formulario y llama a login con async/await.
2. api/auth.js hace POST /auth/login con el cliente Axios.
3. La API comprueba el usuario y devuelve un token. Login lo guarda y usa
   useNavigate para ir a /tasks.
4. api/client.js lee el token en cada petición y añade Authorization: Bearer.
5. pages/Tasks.jsx declara data, loading y error. El efecto llama a una función
   async y getTasks realiza GET /tasks. La API devuelve items.
6. El componente pinta carga, error, lista vacía o tareas. finally termina la
   carga incluso cuando la petición falla.

Abrir Network en el navegador y observar login y GET. No compartir ni proyectar
el valor completo del token. La API, sus controladores, modelo y PostgreSQL se
pueden seguir con la documentación de semana 8.

## 3. Crear y consultar una tarea

Escribir un título y pulsar Añadir. El POST devuelve la tarea, que se añade al
estado. En pgAdmin ejecutar SELECT id, title, done, user_id FROM tasks ORDER BY id DESC.
La nueva fila pertenece a Ana. Pulsar el título y observar /tasks/:id.
TaskDetail obtiene id con useParams y hace GET /tasks/:id.

El listado usa el límite por defecto de la API, 20 tareas. La paginación no se
enseña esta semana. La tarea recién creada se añade visualmente hasta recargar.

## 4. Errores

- Credenciales incorrectas: 401 y mensaje en el formulario.
- Cambiar en la URL el id por uno que no existe: 404.
- Entrar con Ana e introducir el id de una tarea de Luis: 403.
- Detener la API y abrir Tareas: mensaje de conexión y botón Reintentar.
  Volver a arrancarla y pulsar Reintentar.
- Si el JWT caduca, cerrar sesión y hacer login de nuevo.

## 5. Relación con las slides

| Slides | Archivo | Punto a observar |
|---|---|---|
| 2–5 | api/tasks.js y pages/Tasks.jsx | Axios y async/await dentro del efecto |
| 6 | api/client.js y .env.template | axios.create y VITE_API_URL |
| 7 | pages/Login.jsx y api/client.js | login, localStorage e interceptor |
| 8–9 | api/tasks.js y api/client.js | GET, POST, errores HTTP y conexión |
| 10–12 | pages/Tasks.jsx | loading, error, datos y finally |
| 13–16 | main.jsx y App.jsx | BrowserRouter, Routes y Route |
| 17–18 | App.jsx | Link y NavLink |
| 19 | pages/TaskDetail.jsx | useParams |
| 20–22 | pages/Login.jsx y App.jsx | useNavigate, Navigate y Protected |
| 23 | Enunciado L9 | Práctica independiente |

Los datos se obtienen de la API. React Router controla la navegación de la
interfaz. La autorización de cada tarea se comprueba también en el servidor.

En desarrollo StrictMode puede ejecutar el efecto dos veces. El ejemplo sigue
el patrón de las slides sin añadir limpieza del efecto. localStorage permite
observar el flujo JWT, pero cualquier script de la página puede leerlo.
