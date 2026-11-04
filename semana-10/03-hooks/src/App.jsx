import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { Button } from "@/components/ui/button";
import TaskBoard from "./TaskBoard";
import TaskCounter from "./TaskCounter";

export default function App() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(previous => previous === "light" ? "dark" : "light");
  }

  // 2. Ofrecer el tema a todo el árbol. TaskBoard y TaskList no lo reciben por props.
  return (
    <ThemeContext.Provider value={theme}>
      <main className={`${theme} min-h-screen bg-background px-5 py-10 text-foreground`}>
        <div className="mx-auto max-w-2xl space-y-6">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <a className="text-primary underline" href="/">Todas las versiones</a>
            <Button variant="outline" onClick={toggleTheme}>
              Cambiar a tema {theme === "light" ? "oscuro" : "claro"}
            </Button>
          </header>
          <TaskBoard />
          <TaskCounter />
        </div>
      </main>
    </ThemeContext.Provider>
  );
}
