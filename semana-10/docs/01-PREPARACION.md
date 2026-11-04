# Preparar el ejemplo

## 1. Comprobar Node y abrir la carpeta

Abrir Terminal en macOS o PowerShell en Windows y comprobar:

```text
node --version
npm --version
```

Este ejemplo requiere Node 22.12 o posterior. Node 22.0 no basta para la versión
de Vite incluida. Si no hay Node, instalar una versión LTS desde
[nodejs.org](https://nodejs.org/) y volver a abrir la terminal.

Abrir la carpeta del repositorio en el editor. Desde su terminal integrada:

```text
cd semana-10
npm ci
npm run dev
```

npm ci instala las versiones del package-lock.json. No se ejecuta npm create
dentro de esta carpeta: el ejemplo ya está preparado.

En PowerShell, si aparece un bloqueo de npm.ps1, usar npm.cmd ci y
npm.cmd run dev; no hace falta cambiar la política global.

## 2. Comprobar las tres versiones

Abrir http://127.0.0.1:5173 y seguir los tres enlaces:

1. React básico: tres tareas y contador de repaso en cero.
2. Componentes UI: las mismas tareas y contador, con tarjetas, badges y botón.
3. Hooks: añadir/completar/eliminar, filtro, tema y comparación del setter.

Dejar la terminal del servidor abierta. Guardar un cambio en App.jsx debe
actualizar el navegador. Ctrl+C detiene Vite. Para continuar, npm run dev.
Si 5173 está ocupado, detener el otro servidor; strictPort evita cambiar de
puerto silenciosamente y abrir por error otra aplicación.

## 3. Cómo se crearía un proyecto nuevo

Este bloque explica el comando de la slide 11. Ejecutarlo **fuera** de semana-10,
en una carpeta de trabajo que no contenga el ejemplo:

```text
npm create vite@latest mi-lista-react -- --template react
cd mi-lista-react
npm install
npm run dev
```

Se usa la plantilla react (JavaScript), no react-ts. La versión que descargue
latest puede cambiar: para ejecutar este material se usa su package-lock.json.

Localizar estos archivos en el proyecto creado:

| Archivo | Responsabilidad |
|---|---|
| index.html | Contiene div#root y carga main.jsx |
| src/main.jsx | Monta App en root; incluye StrictMode |
| src/App.jsx | Compone la pantalla |
| src/TaskList.jsx | Transforma el array en componentes |
| src/TaskItem.jsx | Presenta una tarea recibida por props |
| vite.config.js | Configuración del servidor y compilación |

La carpeta de esta semana repite ese recorrido para tres entradas HTML, para
poder comparar versiones sin sobrescribir los archivos anteriores.
El alias @ apunta a semana-10/src; no es sintaxis de React.

## 4. Antes de comenzar el recorrido

Tener abiertas las versiones 01 y 02 para comparar la misma funcionalidad.
Abrir App, TaskList, TaskItem y TaskCounter de la versión 01 en el editor.
Verificar que el contador cambia y que recargar lo reinicia.

No hace falta levantar la API de semana 8. La conexión HTTP se añadirá cuando
corresponda en el temario; aquí se parte de un array local conocido.
