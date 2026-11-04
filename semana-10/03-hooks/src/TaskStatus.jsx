import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Badge } from "@/components/ui/badge";

export default function TaskStatus({ done }) {
  // 3. Leer directamente el tema del Provider: los componentes intermedios no lo pasan.
  const theme = useContext(ThemeContext);
  return (
    <Badge variant={theme === "dark" ? "outline" : "secondary"}>
      {done ? "Completada" : "Pendiente"}
    </Badge>
  );
}
