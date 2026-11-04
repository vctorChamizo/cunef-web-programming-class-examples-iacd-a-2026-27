import { Button } from "@/components/ui/button";
import TaskStatus from "./TaskStatus";

// La tarea sigue siendo una prop: el hijo llama al padre para solicitar un cambio.
export default function TaskItem({ task, onToggle, onRemove }) {
  return (
    <li className="space-y-3 border-b py-4 last:border-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={task.done ? "line-through text-muted-foreground" : ""}>{task.title}</span>
        <TaskStatus done={task.done} />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" aria-label={`${task.done ? "Reabrir" : "Completar"}: ${task.title}`}
          onClick={() => onToggle(task.id)}>{task.done ? "Reabrir" : "Completar"}</Button>
        <Button size="sm" variant="outline" aria-label={`Eliminar: ${task.title}`}
          onClick={() => onRemove(task.id)}>Eliminar</Button>
      </div>
    </li>
  );
}
