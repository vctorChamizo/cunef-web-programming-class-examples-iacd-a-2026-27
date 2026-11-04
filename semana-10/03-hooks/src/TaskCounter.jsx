import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function TaskCounter() {
  const [count, setCount] = useState(0);

  function addTwoWithValue() {
    // Demostración de la slide 15: ambas llamadas leen el MISMO count del render.
    setCount(count + 1);
    setCount(count + 1); // El resultado es +1. Se deja así para compararlo.
  }

  function addTwoWithFunction() {
    // React entrega a cada función el resultado de la actualización anterior.
    setCount(previous => previous + 1);
    setCount(previous => previous + 1); // El resultado es +2.
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contador de repaso</CardTitle>
        <CardDescription>Dos llamadas al setter: valor fijo frente a función del anterior.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p role="status">Repasos: {count}</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={addTwoWithValue}>Dos llamadas con valor (+1)</Button>
          <Button onClick={addTwoWithFunction}>Dos llamadas con función (+2)</Button>
          <Button variant="ghost" onClick={() => setCount(0)}>Reiniciar contador</Button>
        </div>
      </CardContent>
    </Card>
  );
}
