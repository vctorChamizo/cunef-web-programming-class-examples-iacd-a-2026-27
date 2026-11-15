import axios from "axios";

// Una única dirección configurable para todas las operaciones.
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  // El login guarda el token. Cada petición posterior lo recupera aquí.
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Axios distingue respuesta HTTP de fallo de conexión.
export function messageFor(error) {
  if (!error.response) return "No se pudo conectar con la API. Comprueba el servidor y CORS.";
  if (error.response.status === 401) return "Sesión no válida o credenciales incorrectas. Inicia sesión de nuevo.";
  if (error.response.status === 403) return "Esta tarea pertenece a otra cuenta.";
  if (error.response.status === 404) return "No se encontró la tarea.";
  return `La API respondió con el código ${error.response.status}.`;
}
