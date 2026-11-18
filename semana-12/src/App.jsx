import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import SharedState from "./pages/SharedState";
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";

// Navigate evita entrar en una pantalla protegida sin token.
function Protected({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  return isLoggedIn ? children : <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
}

export default function App() {
  const { token, notice, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  function logout() {
    signOut();
    navigate("/login");
  }
  const linkStyle = ({ isActive }) => isActive ? "font-bold underline" : "underline";
  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="flex flex-wrap items-center gap-4">
          <NavLink className={linkStyle} to="/" end>Inicio</NavLink>
          <NavLink className={linkStyle} to="/tasks">Tareas</NavLink>
          <NavLink className={linkStyle} to="/compartir">Estado compartido</NavLink>
          {!token && <NavLink className={linkStyle} to="/login">Entrar</NavLink>}
          {token && <Button variant="outline" onClick={logout}>Cerrar sesión</Button>}
        </header>
        <Routes>
          <Route path="/" element={<section><h1 className="text-3xl font-bold">Tareas con React</h1><p className="mt-3">Un cliente React que consulta la API de la semana 8.</p><Link className="text-primary underline" to="/tasks">Ver tareas</Link></section>} />
          <Route path="/compartir" element={<SharedState />} />
          <Route path="/login" element={<Login notice={notice} />} />
          <Route path="/tasks" element={<Protected><Tasks /></Protected>} />
          <Route path="/tasks/:id" element={<Protected><TaskDetail /></Protected>} />
          <Route path="*" element={<section><h1>Página no encontrada</h1><Link className="underline" to="/">Volver al inicio</Link></section>} />
        </Routes>
      </div>
    </main>
  );
}
