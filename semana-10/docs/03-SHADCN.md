# Incorporar componentes de shadcn/ui

## Qué está preparado

Button, Card y Badge se incorporan al código de src/components/ui mediante
el CLI oficial de shadcn/ui. No se sustituyen por componentes propios con el
mismo nombre. La configuración usa JavaScript (tsx:false), estilo new-york
y Tailwind 4. Los componentes son editables dentro del proyecto.
Tras generarlos, el import cn se ha dirigido a @/lib/utils para reutilizar la
utilidad local en lugar de instalar otra dependencia con la misma función.

Solo se usa esta familia de componentes; no se mezclan MUI y Ant Design.
React 19.2 se mantiene para coincidir con el temario.

## Qué archivos intervienen

| Archivo | Función |
|---|---|
| components.json | Destino de componentes, estilo, CSS y aliases del CLI |
| jsconfig.json | Alias @ para editor y CLI, sin introducir TypeScript |
| vite.config.js | Alias @ para Vite y plugin de Tailwind |
| src/styles/ui.css | Tailwind y variables de color del tema |
| src/lib/utils.js | Combina clases de los componentes mediante cn |
| src/components/ui/*.jsx | Código incorporado por el CLI |

Estos archivos son infraestructura preparada. La explicación de la slide 12
puede empezar directamente en los imports de 02 y en las props del Button.

## Reproducir la incorporación

Para **ejecutar** el ejemplo basta npm ci: los componentes ya están incluidos.
No ejecutar init de nuevo ni sobrescribirlos durante la demostración.

Si se quiere practicar cómo añadir un componente nuevo, desde semana-10:

```text
npx shadcn@4.23.0 add separator
```

El CLI añade el archivo y, si corresponde, sus dependencias. Revisar el diff.
Después se puede importar Separator desde @/components/ui/separator y usarlo
en una tarjeta. No hace falta conservar esa ampliación en el ejemplo.

Los tres componentes incluidos se obtuvieron con:

```text
npx shadcn@4.23.0 add button card badge
```

En un proyecto nuevo, seguir primero la
[instalación oficial para Vite](https://ui.shadcn.com/docs/installation/vite).
Activar JavaScript mediante tsx:false antes de añadir componentes, según la
[guía de JavaScript](https://ui.shadcn.com/docs/javascript). No copiar comandos
de TypeScript sin adaptar la configuración del proyecto.

## Prueba visible

En 02, TaskCounter usa Button. Cambiar variant="outline" o size="sm" y
guardar. El aspecto cambia; count y setCount siguen siendo código React propio.
Abrir card.jsx para observar que una Card también recibe children.
La librería aporta presentación y composición, no las reglas de las tareas.

El código upstream de shadcn/ui tiene licencia MIT; véase
LICENSE.shadcn-ui.txt. Sus dependencias conservan sus respectivas licencias.
