import { Badge } from "@/components/ui/badge";

// Mismas props que en 01. Badge sustituye el texto plano del estado.
export default function TaskItem({ title, done, priority = 1 }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 border-b py-4 last:border-0">
      <div>
        <span className={done ? "line-through text-muted-foreground" : ""}>{title}</span>
        <p className="text-sm text-muted-foreground">Prioridad {priority}</p>
      </div>
      <Badge variant={done ? "secondary" : "outline"}>{done ? "Completada" : "Pendiente"}</Badge>
    </li>
  );
}
