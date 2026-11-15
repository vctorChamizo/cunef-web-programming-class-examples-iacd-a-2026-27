# Recorrer la misma aplicación en tres pasos

## 01 · React básico

Abrir /01-react-basico/ y sus archivos de src.

| Slides | Archivo | Qué observar o cambiar |
|---|---|---|
| 2–3 | index.html y main.jsx | root, carga de JSX y montaje de App |
| 4 | App.jsx | Cambiar name y observar {name}; className en TaskItem |
| 5–6 | TaskItem.jsx | Una función con props; priority tiene default 1 |
| 7 | TaskList.jsx | map crea una fila por tarea; key usa id |
| 8 | TaskList.jsx | Retorno con array vacío, some y &&; ternario en TaskItem |
| 9–10 | TaskCounter.jsx | useState y evento; el contador es estado propio |
| 11 | Guía de preparación | Crear un proyecto con Vite desde terminal |

Pruebas pequeñas para ver qué controla cada componente:

1. Cambiar name en App. Solo cambia el saludo de la pantalla.
2. Añadir priority={3} al TaskItem de TaskList y ver que se reemplaza el default.
3. Cambiar temporalmente App a TaskList tasks={[]} y ver «No hay tareas».
4. Recuperar initialTasks y pulsar el contador: cambia el número, no la lista.

Las tareas son props. El contador recuerda sus clics. Son datos diferentes:
un contador de clics no demuestra que una tarea haya cambiado de estado.
Los hooks se llaman arriba del componente, nunca dentro de onClick o de map.

## 02 · La misma lógica, componentes UI

Abrir /02-componentes-ui/ junto a 01 y comparar TaskList y TaskCounter.
La lista y el contador se comportan igual. Los imports nuevos son Card,
Badge y Button, desde src/components/ui. Es el contenido de la slide 12.

Comparaciones concretas:

- button → Button: sigue recibiendo onClick y children.
- Texto «Pendiente» → Badge: la prop variant cambia su presentación.
- section → Card, CardHeader, CardContent: composición de componentes.

Cambiar Button variant="outline" y comparar el aspecto. La función que
actualiza count no cambia. Cambiar la librería visual no sustituye el estado
ni introduce una conexión con el servidor.

shadcn copia componentes al proyecto: se puede abrir button.jsx y localizar
sus variantes. No es necesario explicar CVA, Radix o todas las clases generadas.
El recorrido de instalación se documenta por separado en 03-SHADCN.md.

## 03 · El estado empieza a controlar las tareas

Abrir /03-hooks/ y comenzar por TaskBoard.jsx, no por la configuración CSS.

### useState, inmutabilidad y actualizaciones funcionales · slides 13–15

1. tasks empieza con el mismo array; ahora es estado de TaskBoard.
2. Escribir en el input cambia title; enviar el formulario añade una tarea.
3. addTask usa [...previous, newTask], no push.
4. Completar usa map y un objeto nuevo; eliminar usa filter.
5. El listado visible y el número de pendientes se calculan durante el render:
   no necesitan otro useState ni useEffect.

TaskItem recibe callbacks que solicitan esos cambios. Es el mínimo necesario
para usar las operaciones del array del deck; no introduce un gestor de estado.

El contador de repaso de 01 evoluciona en TaskCounter.jsx. Pulsar «Dos llamadas
con valor (+1)»: suma uno. Reiniciar y pulsar «Dos llamadas con función (+2)»:
suma dos. Ambas llamadas con valor leen la misma instantánea del render;
las funciones se aplican una tras otra sobre el resultado anterior.

### useEffect · slides 16–18

Mirar el título de la pestaña. Al escribir en el input aparece el texto y, al
añadir o eliminar una tarea, cambia el número. El cambio externo ocurre en
useEffect, no en el JSX. Las dependencias son [tasks, title], una ampliación
del ejemplo de la slide 17 para observar dos valores.

Cambiar solo el tema o pulsar el contador no cambia tasks ni title. No se necesita un
efecto para calcular pending: ese número se deriva del array al renderizar.
La función return del efecto restaura el título anterior antes de repetirlo
y al desmontar. StrictMode puede ejecutar un ciclo adicional de setup/cleanup
durante el desarrollo; no significa que haya dos tareas añadidas.

Para la tabla de dependencias del deck: [] se asocia al montaje; [tasks, title]
al montaje y cambios de cualquiera de esos valores; omitir el segundo argumento
repite tras cada render. No introducir llamadas HTTP todavía.

### useContext · slides 19–21

Abrir tres archivos y señalar una pieza en cada uno:

1. ThemeContext.js: createContext("light") crea el canal y su fallback.
2. App.jsx: Provider ofrece theme a todo el árbol.
3. TaskStatus.jsx: useContext lee theme y elige la variante del Badge.

El árbol es App → TaskBoard → TaskList → TaskItem → TaskStatus.
Los intermedios no reciben theme. Al cambiar a oscuro, se actualizan el fondo
y la variante del estado de las tareas. En React DevTools se puede inspeccionar
el valor de Context en TaskStatus. No trasladar tasks al contexto: pertenece
a TaskBoard y sus consumidores cercanos.

## Cerrar el recorrido

Volver a 01: siguen los mismos tres datos iniciales. No hay estado compartido
entre páginas ni persistencia. La evolución conserva el dominio y añade una
responsabilidad cada vez. La práctica L8 conserva su propio enunciado.
