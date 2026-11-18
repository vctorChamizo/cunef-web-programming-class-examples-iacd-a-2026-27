import { Navigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
export function Protected({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
