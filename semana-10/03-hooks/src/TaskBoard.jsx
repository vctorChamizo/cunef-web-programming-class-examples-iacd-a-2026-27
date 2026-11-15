import { useState, useEffect } from "react";
import { initialTasks } from "@/data/tasks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import TaskList from "./TaskList";

export default function TaskBoard() {
  // useState recuerda datos que cambian con la interacción, no variables normales.
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [onlyPending, setOnlyPending] = useState(false);

  // useEffect sincroniza algo externo: el título de la pestaña del navegador.
  // [tasks, title]: el efecto se repite al cambiar las tareas o el texto del input.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${tasks.length} ${title} tareas · React`;
    // Limpieza: recuperar el título al repetir el efecto o desmontar el componente.
    return () => {
      document.title = previousTitle;
    };
  }, [tasks, title]);

  function addTask(event) {
    event.preventDefault(); // El formulario no debe recargar toda la página.
    if (title.trim() === "") return;
    const newTask = { id: crypto.randomUUID(), title: title.trim(), done: false };
    // Añadir sin push: crear un array nuevo a partir del estado anterior.
    setTasks((previous) => [...previous, newTask]);
    setTitle("");
  }

  function toggleTask(id) {
    // map crea el array; ...task crea el objeto modificado. No mutamos el original.
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  }

  function removeTask(id) {
    // filter conserva todas las tareas salvo la elegida.
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  function onChangeInput(event) {
    const value = event.target.value;
    setTitle(value);
  }

  // Son valores calculados, no otro estado ni otro efecto que mantener sincronizado.
  const pending = tasks.filter((task) => !task.done).length;
  const visibleTasks = onlyPending ? tasks.filter((task) => !task.done) : tasks;

  return (
    <Card>
      <CardHeader>
        <Badge variant="secondary">03 · Hooks</Badge>
        <CardTitle className="text-3xl">
          <h1>Tareas de Ana - {title}</h1>
        </CardTitle>
        <CardDescription>
          {tasks.length} tareas · {pending} pendientes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form onSubmit={addTask} className="space-y-2">
          <label htmlFor="task-title" className="block font-medium">
            Nueva tarea
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              id="task-title"
              value={title}
              onChange={onChangeInput}
              className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2"
            />
            <Button type="submit">Añadir tarea</Button>
          </div>
        </form>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlyPending}
            onChange={(event) => setOnlyPending(event.target.checked)}
          />
          Solo pendientes
        </label>
        <TaskList tasks={visibleTasks} onToggle={toggleTask} onRemove={removeTask} />
        <Button variant="outline" onClick={() => setTasks(initialTasks)}>
          Restablecer tareas
        </Button>
      </CardContent>
    </Card>
  );
}
