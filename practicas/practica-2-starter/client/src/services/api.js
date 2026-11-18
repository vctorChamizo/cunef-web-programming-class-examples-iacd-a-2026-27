import axios from 'axios';
// Cada petición comparte la dirección de la API y, si existe, el token.
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// Un 401 de una petición autenticada cierra la sesión y vuelve al login.
api.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401 && error.config?.url !== '/auth/login' && localStorage.getItem('token')) {
    localStorage.removeItem('token');
    window.location.assign('/login');
  }
  return Promise.reject(error);
});
