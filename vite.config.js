import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // يسمح بالاستماع لجميع الواجهات
    port: 5173, // أو أي منفذ تفضله
  },
  plugins: [tailwindcss(), react()],
});
