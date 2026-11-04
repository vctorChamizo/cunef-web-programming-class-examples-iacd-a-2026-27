import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  // Retorno anticipado: probar pasando tasks={[]} desde App.
  if (tasks.length === 0) return <p>No hay tareas.</p>;
  return (
    <>
      {/* && muestra el párrafo solo cuando alguna tarea cumple la condición. */}
      {tasks.some((task) => task.done) && <p>Hay tareas completadas.</p>}
      <ul>
        {tasks.map((task) => (
          // key identifica la tarea; las otras props son datos para TaskItem.
          <TaskItem key={task.id} title={task.title} done={task.done} />
        ))}
      </ul>
    </>
  );
}
