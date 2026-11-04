# Semana 10 - Una lista de tareas que evoluciona con React

Tres versiones del mismo ejemplo, con los mismos datos iniciales y una única
instalación. El punto de partida sigue el código del deck: App → TaskList →
TaskItem y un contador con estado. Después cambia la interfaz y, por último,
se amplía el comportamiento con hooks.

| Versión | Qué cambia | Dónde empezar |
|---|---|---|
| 01 · React básico | JSX, props, map/key, condicionales y primer useState | 01-react-basico/src/App.jsx |
| 02 · Componentes UI | Card, Badge y Button de shadcn/ui; misma lógica | 02-componentes-ui/src/App.jsx |
| 03 · Hooks | Estado de tareas, setter funcional, efecto y Context | 03-hooks/src/TaskBoard.jsx |

## Arrancar

Requisitos: Node **22.12 o posterior** (recomendado Node 24) y npm.
No necesita PostgreSQL, API, tokens ni .env.

Desde la raíz del repositorio:

```text
cd semana-10
npm ci
npm run dev
```

Abrir **http://127.0.0.1:5173** y elegir una versión. Todas están disponibles
simultáneamente; se pueden abrir en tres pestañas para compararlas. Si el puerto
está ocupado por otra semana, detener ese servidor antes de arrancar.
En PowerShell se puede usar npm.cmd si la política bloquea npm.ps1.

Cada versión tiene su propia página HTML y su árbol React. El índice es solo un
selector: navegar entre versiones recarga la página; no es React Router ni SSR.
Dentro de cada versión, las interacciones actualizan React sin recargar.

## Recorrido y documentación

- [Preparación paso a paso y creación de un proyecto desde cero](docs/01-PREPARACION.md).
- [Recorrido por versiones y relación con las slides](docs/02-RECORRIDO.md).
- [Cómo se incorpora shadcn/ui y qué archivos genera](docs/03-SHADCN.md).
- [Comprobaciones, resultados esperados y límites](docs/04-VALIDACION.md).

## Datos y alcance

Las tres versiones importan src/data/tasks.js. En 01 y 02 la lista es de solo
lectura y el contador cuenta clics de repaso; no representa tareas completadas.
En 03 la lista sí cambia mediante estado: añadir, completar/reabrir y eliminar.
Recargar reinicia los datos y el tema. No se guarda nada en localStorage ni DB.

useState ya aparece en el ejemplo básico porque forma parte de las slides 9–10.
La versión 03 profundiza en él e introduce useEffect y useContext.
No se añaden peticiones HTTP, autenticación, routing ni una solución de L8.

Los componentes de src/components/ui se obtienen del registro de shadcn/ui y
se comparten entre 02 y 03. Se conservan separados del código que se explica:
no es necesario entender sus variantes CSS para aprender props y hooks.

Para comprobar el empaquetado de las cuatro páginas:

```text
npm run build
npm run preview
```

Referencias: [React](https://react.dev/learn), [Vite](https://vite.dev/guide/),
[shadcn/ui con Vite](https://ui.shadcn.com/docs/installation/vite).
