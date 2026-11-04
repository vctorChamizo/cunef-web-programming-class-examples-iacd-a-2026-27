import { useState } from "react";

export default function TaskCounter() {
  // Primer hook, como en la slide 9: valor recordado y función para actualizarlo.
  const [count, setCount] = useState(0);
  return (
    <section aria-label="Primer estado">
      <h2>Contador de repaso</h2>
      <p>Cuenta clics de práctica; todavía no modifica las tareas.</p>
      <button onClick={() => setCount(count + 1)}>Repasos: {count}</button>
    </section>
  );
}
