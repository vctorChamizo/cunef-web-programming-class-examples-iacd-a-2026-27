import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function TaskCounter() {
  const [count, setCount] = useState(0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contador de repaso</CardTitle>
        <CardDescription>El mismo useState. Button recibe onClick como un botón HTML.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => setCount(count + 1)}>Repasos: {count}</Button>
      </CardContent>
    </Card>
  );
}
