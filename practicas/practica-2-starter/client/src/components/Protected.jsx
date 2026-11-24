import { Navigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';

export function Protected({ children }) {
  const { isLoggedIn } = useAuth();

  // replace evita que «Atrás» vuelva a la ruta protegida y repita la redirección.
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
