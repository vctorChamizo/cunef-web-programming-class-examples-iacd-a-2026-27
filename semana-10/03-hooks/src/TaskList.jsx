import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onRemove }) {
  if (tasks.length === 0) return <p>No hay tareas en esta vista.</p>;
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  );
}
