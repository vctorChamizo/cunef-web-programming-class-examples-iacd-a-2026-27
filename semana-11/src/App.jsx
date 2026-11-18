import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";

// Navigate evita entrar en una pantalla protegida sin token.
function Protected({ token, children }) {
  const location = useLocation();
  return token ? children : <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
}

export default function App() {
  // El estado actualiza la navegación al iniciar o cerrar sesión.
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    function sessionExpired() {
      setToken(null);
      setNotice("La sesión ha caducado. Inicia sesión de nuevo.");
    }
    function storageChanged(event) {
      if (event.key === "token" || event.key === null) setToken(localStorage.getItem("token"));
    }
    window.addEventListener("session-expired", sessionExpired);
    window.addEventListener("storage", storageChanged);
    return () => {
      window.removeEventListener("session-expired", sessionExpired);
      window.removeEventListener("storage", storageChanged);
    };
  }, []);
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setNotice("");
    navigate("/login");
  }
  const linkStyle = ({ isActive }) => isActive ? "font-bold underline" : "underline";
  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="flex flex-wrap items-center gap-4">
          <NavLink className={linkStyle} to="/" end>Inicio</NavLink>
          <NavLink className={linkStyle} to="/tasks">Tareas</NavLink>
          {!token && <NavLink className={linkStyle} to="/login">Entrar</NavLink>}
          {token && <Button variant="outline" onClick={logout}>Cerrar sesión</Button>}
        </header>
        <Routes>
          <Route path="/" element={<section><h1 className="text-3xl font-bold">Tareas con React</h1><p className="mt-3">Un cliente React que consulta la API de la semana 8.</p><Link className="text-primary underline" to="/tasks">Ver tareas</Link></section>} />
          <Route path="/login" element={<Login notice={notice} onLogin={(value) => { setNotice(""); setToken(value); }} />} />
          <Route path="/tasks" element={<Protected token={token}><Tasks /></Protected>} />
          <Route path="/tasks/:id" element={<Protected token={token}><TaskDetail /></Protected>} />
          <Route path="*" element={<section><h1>Página no encontrada</h1><Link className="underline" to="/">Volver al inicio</Link></section>} />
        </Routes>
      </div>
    </main>
  );
}
