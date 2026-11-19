# Semana 12 · Estado compartido y Context API

La aplicación de tareas de semana 11 evoluciona para compartir datos entre
componentes y gestionar la sesión con Context. El ejemplo mantiene Axios,
React Router y la API de semana 8.

## Preparación

Requisitos: Node 22.12 o superior, PostgreSQL y la base de semana 8 configurada.
Seguir la [preparación de la API](../semana-11/docs/02-ENTORNO.md) hasta tener
`http://localhost:3000/health/db` funcionando. Mantener la API arrancada.

En otra terminal, desde la raíz del repositorio:

```text
npm run install:12
```

Copiar `semana-12/.env.template` a `semana-12/.env`. En macOS:

```sh
cp semana-12/.env.template semana-12/.env
```

En PowerShell:

```powershell
Copy-Item semana-12/.env.template semana-12/.env
```

Comprobar que contiene `VITE_API_URL=http://localhost:3000`. Desde la raíz:

```text
npm run start:12
```

Abrir http://localhost:5173. Detener el servidor de la semana 11 si ocupa el
puerto. La API debe permitir ese origen en CORS_ORIGINS. Si cambia el .env,
reiniciar Vite. Las credenciales ficticias del seed son `ana@example.com` y
`AulaSegura8!`.

## Recorrido

1. Abrir «Estado compartido». Escribir en el editor y observar la vista previa.
   En `src/pages/SharedState.jsx`, el padre guarda `title` y pasa el valor y
   `setTitle` a sus hijos. Probar «Limpiar» y el mensaje «Sin título».
2. Abrir «Tareas» sin sesión. La ruta protegida redirige al login.
3. Entrar con Ana. `src/pages/Login.jsx` llama a `signIn` del contexto. La API
   devuelve el token, que el Provider guarda en estado y localStorage.
4. Seguir `src/main.jsx` → `src/AuthContext.jsx` → `src/App.jsx` → `Login.jsx`.
   El Provider rodea la aplicación. La cabecera, Protected y Login leen el
   mismo contexto mediante `useContext`, sin pasar el token por props.
5. Recargar: el Provider recupera la sesión. Cerrar sesión y abrir de nuevo
   Tareas: se vuelve a login. Un token caducado provoca 401 y mensaje de sesión.
6. Crear una tarea y comprobarla en PostgreSQL. La API continúa comprobando la
   autenticación y la propiedad, como en la semana 11.

La pantalla de estado compartido usa datos locales. Las tareas de la API se
persisten en PostgreSQL. El contexto agrupa la sesión, no todas las tareas.
El flujo es un ejemplo docente y conserva el contrato de la semana anterior.

La instalación nativa en Windows queda pendiente de verificar. `npm audit`
no informó vulnerabilidades en la última comprobación realizada.

Las semanas 11 y 12 comparten la sesión del navegador cuando se abren desde
el mismo origen. Para comenzar la demostración sin sesión, pulsar «Cerrar sesión».
El listado muestra la primera página de la API, hasta 20 tareas. Si hay más,
una tarea creada aparecerá en pantalla, pero podría quedar fuera al recargar.

Referencias: [estado compartido en React](https://react.dev/learn/sharing-state-between-components)
y [Context](https://react.dev/learn/passing-data-deeply-with-context).
