import { useState } from "react";
import { Button } from "@/components/ui/button";

// Cada hijo recibe solo lo que necesita. No mantiene otra copia de la tarea.
function TaskEditor({ title, onChange }) {
  return <label className="block">Título de la tarea
    <input className="mt-2 block w-full rounded border p-2" value={title} onChange={event => onChange(event.target.value)} />
  </label>;
}
function TaskPreview({ title }) {
  return <p>Vista previa: {title || "Sin título"}</p>;
}

export default function SharedState() {
  // El padre común es el único propietario del estado de ambos hijos.
  const [title, setTitle] = useState("Preparar React");
  return <section className="space-y-4">
    <h1 className="text-2xl font-bold">Una tarea compartida</h1>
    <p>El editor y la vista previa son hermanos. El dato baja y el evento sube.</p>
    <TaskEditor title={title} onChange={setTitle} />
    <TaskPreview title={title} />
    <Button variant="outline" onClick={() => setTitle("")}>Limpiar</Button>
  </section>;
}
