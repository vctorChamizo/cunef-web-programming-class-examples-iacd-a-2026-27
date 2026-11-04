import { initialTasks } from "@/data/tasks";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TaskList from "./TaskList";
import TaskCounter from "./TaskCounter";

export default function App() {
  // Los datos y el árbol de tareas siguen siendo los de la versión 01.
  const name = "Ana";
  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground">
      <div className="mx-auto max-w-2xl space-y-6">
        <a className="text-primary underline" href="/">Todas las versiones</a>
        <Card>
          <CardHeader>
            <Badge variant="secondary">02 · shadcn/ui</Badge>
            <CardTitle className="text-3xl"><h1>Tareas de {name}</h1></CardTitle>
            <CardDescription>Los mismos datos y comportamiento; componentes de interfaz reutilizables.</CardDescription>
          </CardHeader>
          <CardContent><TaskList tasks={initialTasks} /></CardContent>
        </Card>
        <TaskCounter />
      </div>
    </main>
  );
}
