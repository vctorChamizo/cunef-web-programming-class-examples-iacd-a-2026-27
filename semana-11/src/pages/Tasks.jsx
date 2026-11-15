import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getTasks, createTask } from "../api/tasks";
import { messageFor } from "../api/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  async function loadTasks() {
    setLoading(true);
    setError("");
    try {
      setTasks(await getTasks());
    } catch (problem) {
      setError(messageFor(problem));
    } finally {
      setLoading(false);
    }
  }

  // El efecto no es async. Declara una función async y la ejecuta.
  useEffect(() => {
    async function load() { await loadTasks(); }
    load();
  }, []);

  async function handleCreate(event) {
    event.preventDefault();
    if (!title.trim()) {
      setSaveError("Escribe un título.");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      const task = await createTask(title.trim());
      setTasks(previous => [...previous, task]);
      setTitle("");
    } catch (problem) {
      setSaveError(messageFor(problem));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p role="status">Cargando tareas…</p>;
  if (error) return <section><p role="alert">{error}</p><Button onClick={loadTasks}>Reintentar</Button></section>;

  return <Card><CardHeader><CardTitle><h1 className="text-2xl">Mis tareas</h1></CardTitle></CardHeader>
    <CardContent className="space-y-5">
      <form onSubmit={handleCreate} className="flex flex-wrap items-end gap-2">
        <label className="block flex-1">Nueva tarea<input className="mt-1 block w-full rounded border p-2" value={title} onChange={event => setTitle(event.target.value)} /></label>
        <Button disabled={saving}>{saving ? "Guardando…" : "Añadir"}</Button>
      </form>
      {saveError && <p role="alert">{saveError}</p>}
      {tasks.length === 0 ? <p>No hay tareas.</p> : <ul>{tasks.map(task =>
        <li className="flex items-center justify-between border-b py-3" key={task.id}>
          <Link className="text-primary underline" to={`/tasks/${task.id}`}>{task.title}</Link>
          <Badge variant="secondary">{task.done ? "Completada" : "Pendiente"}</Badge>
        </li>
      )}</ul>}
    </CardContent></Card>;
}
