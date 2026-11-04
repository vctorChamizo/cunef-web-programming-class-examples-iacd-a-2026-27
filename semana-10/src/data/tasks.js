// Las tres versiones empiezan con los mismos datos. Son locales, no una respuesta HTTP.
// Cada App recibe su propio estado; ninguna versión modifica este array original.
export const initialTasks = [
  { id: 1, title: "Repasar JSX", done: true },
  { id: 2, title: "Separar componentes", done: false },
  { id: 3, title: "Practicar los hooks", done: false },
];
