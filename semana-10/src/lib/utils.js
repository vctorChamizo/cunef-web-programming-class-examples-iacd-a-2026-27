import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utilidad de los componentes shadcn: combina clases y resuelve conflictos Tailwind.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
