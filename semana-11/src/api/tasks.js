import { api } from "./client";

// Las funciones por recurso ocultan la ruta HTTP, no los estados de la pantalla.
export async function getTasks() {
  const response = await api.get("/tasks");
  return response.data.items;
}
export async function getTask(id) {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
}
export async function createTask(title) {
  const response = await api.post("/tasks", { title });
  return response.data;
}
