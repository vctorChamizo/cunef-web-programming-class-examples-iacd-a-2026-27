import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// Configuración preparada: las tres versiones comparten instalación y servidor.
const file = (path) => fileURLToPath(new URL(path, import.meta.url));
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": file("./src") } },
  server: { port: 5173, strictPort: true },
  build: {
    rolldownOptions: {
      input: {
        index: file("./index.html"),
        basic: file("./01-react-basico/index.html"),
        components: file("./02-componentes-ui/index.html"),
        hooks: file("./03-hooks/index.html"),
      },
    },
  },
});
