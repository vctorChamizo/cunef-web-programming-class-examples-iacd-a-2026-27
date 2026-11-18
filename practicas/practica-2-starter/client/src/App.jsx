import { Link, Route, Routes, useNavigate } from 'react-router';
import { useAuth } from './auth/AuthContext';
import { Protected } from './components/Protected';
import { Items } from './pages/Items';
import { Login } from './pages/Login';
import { Private } from './pages/Private';
export default function App() {
  const { isLoggedIn, signOut } = useAuth();
  const navigate = useNavigate();
  function logout() { signOut(); navigate('/'); }
  return <><nav><Link to="/">Inicio</Link> <Link to="/privado">Zona protegida</Link> {isLoggedIn ? <button onClick={logout}>Salir</button> : <Link to="/login">Entrar</Link>}</nav><Routes><Route path="/" element={<Items />} /><Route path="/login" element={<Login />} /><Route path="/privado" element={<Protected><Private /></Protected>} /><Route path="*" element={<main><h1>Página no encontrada</h1></main>} /></Routes></>;
}
