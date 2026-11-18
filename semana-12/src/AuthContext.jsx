import { createContext, useEffect, useState } from "react";
import { login } from "./api/auth";

// El contexto es el canal que comparten cabecera y rutas protegidas.
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [notice, setNotice] = useState("");

  // La respuesta 401 del cliente Axios avisa de la caducidad.
  useEffect(() => {
    function expired() {
      setToken(null);
      setNotice("La sesión ha caducado. Inicia sesión de nuevo.");
    }
    function storageChanged(event) {
      if (event.key === "token" || event.key === null) setToken(localStorage.getItem("token"));
    }
    window.addEventListener("session-expired", expired);
    window.addEventListener("storage", storageChanged);
    return () => {
      window.removeEventListener("session-expired", expired);
      window.removeEventListener("storage", storageChanged);
    };
  }, []);

  async function signIn(email, password) {
    const newToken = await login(email, password);
    localStorage.setItem("token", newToken);
    setNotice("");
    setToken(newToken);
  }

  function signOut() {
    localStorage.removeItem("token");
    setToken(null);
    setNotice("");
  }

  // Los consumidores reciben la sesión y las operaciones, sin props intermedias.
  return <AuthContext.Provider value={{ token, isLoggedIn: Boolean(token), notice, signIn, signOut }}>{children}</AuthContext.Provider>;
}
