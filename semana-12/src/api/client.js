import axios from "axios";

// Una única dirección configurable para todas las operaciones.
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  if (!import.meta.env.VITE_API_URL) {
    throw new Error("Falta VITE_API_URL. Crea semana-12/.env a partir de .env.template y reinicia Vite.");
  }
  // El login guarda el token. Cada petición posterior lo recupera aquí.
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Una sesión caducada debe actualizar tanto el almacenamiento como React.
api.interceptors.response.use(undefined, (error) => {
  const token = localStorage.getItem("token");
  const sent = error.config?.headers?.Authorization;
  if (error.response?.status === 401 && token && sent === `Bearer ${token}` && !error.config.url?.startsWith("/auth/")) {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("session-expired"));
  }
  return Promise.reject(error);
});

// Axios distingue respuesta HTTP de fallo de conexión.
export function messageFor(error) {
  if (!import.meta.env.VITE_API_URL) return error.message;
  if (!error.response) return "No se pudo conectar con la API. Comprueba el servidor y CORS.";
  if (error.response.status === 400) return "Los datos enviados no son válidos. Revisa los campos e inténtalo de nuevo.";
  if (error.response.status === 401) return "Sesión no válida o credenciales incorrectas. Inicia sesión de nuevo.";
  if (error.response.status === 403) return "Esta tarea pertenece a otra cuenta.";
  if (error.response.status === 404) return "No se encontró la tarea.";
  return `La API respondió con el código ${error.response.status}.`;
}
