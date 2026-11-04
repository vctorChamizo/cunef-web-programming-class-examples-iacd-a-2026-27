# Comprobar el ejemplo

## Resultados esperados al recorrerlo

| Acción | Resultado |
|---|---|
| Abrir 01 o 02 | Tres tareas y contador Repasos: 0 |
| Pulsar el contador en 01 o 02 | Suma uno sin modificar las tareas |
| Recargar una versión | Recupera los datos y el estado iniciales |
| En 03, enviar una tarea con Enter | Aparece en la lista; el input se vacía |
| Enviar solo espacios | No añade una tarea |
| Completar y reabrir | Cambian el estado, texto del botón y pendientes |
| Activar Solo pendientes | Oculta las completadas; no las elimina |
| Completar todas con filtro activo | Muestra «No hay tareas en esta vista» |
| Eliminar todas | Lista vacía y título de pestaña «0 tareas · React» |
| Añadir/eliminar en 03 | Actualiza el título de pestaña mediante useEffect |
| Cambiar claro/oscuro | Cambian el tema y la variante de TaskStatus vía Context |
| Dos llamadas con valor | Suma uno, intencionadamente, para explicar el render |
| Dos llamadas con función | Suma dos a partir del estado anterior |
| Restablecer tareas | Recupera el array original, sin mutaciones acumuladas |

## Comprobaciones ejecutadas

Versión local revisada el **3 de noviembre de 2026**, en macOS:

- Instalación limpia con npm ci en Node 22.14.0, en una ruta con espacios y ñ.
- Build de las cuatro páginas con Node 22.14.0 y Node 24.22.1.
- Recorrido automatizado en Chrome real: las dos versiones iniciales, alta con
  Enter, espacios, edición, filtro vacío, borrado, título, setters, Context,
  restablecimiento y recarga. Ejecutado en desarrollo y en el build servido
  por preview, con Node 24.22.1.
- Sin errores en consola durante esos recorridos.
- Revisión visual en escritorio y a 390px; sin desbordamiento horizontal.
- npm audit: cero vulnerabilidades conocidas en la comprobación realizada.

Las comprobaciones de navegador se han ejecutado con herramientas externas
al ejemplo. No se añade un framework de pruebas al contenido inicial de React.
La tabla anterior permite repetir el mismo recorrido manualmente.

## Repetir el build

Desde semana-10:

```text
npm ci
npm run build
npm run preview
```

Abrir la URL que indique preview y repetir la tabla. npm run build empaqueta
las cuatro entradas; por sí solo no demuestra que los clics funcionen.

## Límites

No se ha ejecutado una instalación nativa de Windows. La guía incluye
PowerShell/npm.cmd y el código de aplicación no utiliza comandos Unix.
No hay API, persistencia, autenticación ni sincronización entre versiones.
StrictMode está habilitado: puede repetir el setup/cleanup de efectos durante
el desarrollo. El código generado por shadcn conserva su licencia MIT y se
separa del código docente para no convertir la sesión en una explicación de
Tailwind, Radix o variantes de estilo.
