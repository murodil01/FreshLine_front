import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/", 
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://freshline-production.up.railway.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
