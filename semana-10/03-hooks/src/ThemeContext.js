import { createContext } from "react";

// 1. Crear el canal. "light" solo se usa si no hay un Provider por encima.
export const ThemeContext = createContext("light");
