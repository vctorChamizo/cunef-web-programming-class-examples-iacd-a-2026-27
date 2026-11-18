import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useLocation, useNavigate } from "react-router";

import { messageFor } from "../api/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Login({ notice }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("ana@example.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn(email, password);
      // Tras el éxito, la navegación se realiza desde código.
      const destination = location.state?.from;
      navigate(typeof destination === "string" && destination.startsWith("/") && !destination.startsWith("//") ? destination : "/tasks", { replace: true });
    } catch (problem) {
      setError(messageFor(problem));
    } finally {
      setLoading(false);
    }
  }

  return <Card><CardHeader><CardTitle><h1 className="text-2xl">Iniciar sesión</h1></CardTitle></CardHeader>
    <CardContent><form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">Email<input className="mt-1 block w-full rounded border p-2" type="email" value={email} onChange={event => setEmail(event.target.value)} required /></label>
      <label className="block">Contraseña<input className="mt-1 block w-full rounded border p-2" type="password" value={password} onChange={event => setPassword(event.target.value)} required /></label>
      {notice && !error && <p role="status">{notice}</p>}
      {error && <p role="alert">{error}</p>}
      <Button disabled={loading}>{loading ? "Entrando…" : "Entrar"}</Button>
    </form></CardContent></Card>;
}
