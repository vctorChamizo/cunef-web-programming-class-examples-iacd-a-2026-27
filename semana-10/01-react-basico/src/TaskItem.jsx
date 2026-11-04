// Las props son de solo lectura: esta función muestra datos, no los modifica.
export default function TaskItem({ title, done, priority = 1 }) {
  return (
    <li className={done ? "done" : ""}>
      <span>{title}</span>
      <small>
        Prioridad {priority} · {done ? "Completada" : "Pendiente"}
      </small>
    </li>
  );
}
