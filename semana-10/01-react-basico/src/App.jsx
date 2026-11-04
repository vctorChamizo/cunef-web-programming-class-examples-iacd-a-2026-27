import { initialTasks } from "@/data/tasks";
import TaskList from "./TaskList";
import TaskCounter from "./TaskCounter";

export default function App() {
  // JSX mezcla estructura y expresiones. name es un dato normal, no estado.
  const name = "Ana";
  return (
    <main>
      <a href="/">Todas las versiones</a>
      <p>01 · React básico</p>
      <h1>Tareas de {name}</h1>
      <p>Los datos llegan por props; el contador recuerda sus propios clics.</p>
      <TaskList tasks={initialTasks} />
      <TaskCounter />
    </main>
  );
}
