import TaskItem from "./TaskItem";

// La lógica no depende de la librería visual: mismo if, some y map de 01.
export default function TaskList({ tasks }) {
  if (tasks.length === 0) return <p>No hay tareas.</p>;
  return (
    <>
      {tasks.some(task => task.done) && <p className="text-sm text-muted-foreground">Hay tareas completadas.</p>}
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} title={task.title} done={task.done} />
        ))}
      </ul>
    </>
  );
}
