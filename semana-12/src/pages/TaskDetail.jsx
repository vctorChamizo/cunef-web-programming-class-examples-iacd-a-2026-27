import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getTask } from "../api/tasks";
import { messageFor } from "../api/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TaskDetail() {
  // :id viene de la URL como texto. La API valida su formato y propietario.
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try { setTask(await getTask(id)); }
      catch (problem) { setError(messageFor(problem)); }
      finally { setLoading(false); }
    }
    load();
  }, [id]);

  if (loading) return <p role="status">Cargando tarea…</p>;
  if (error) return <section><p role="alert">{error}</p><Link className="underline" to="/tasks">Volver a tareas</Link></section>;
  return <Card><CardHeader><CardTitle><h1 className="text-2xl">{task.title}</h1></CardTitle></CardHeader>
    <CardContent><p>{task.done ? "Completada" : "Pendiente"}</p><p>Identificador: {task.id}</p><Link className="text-primary underline" to="/tasks">Volver a tareas</Link></CardContent></Card>;
}
