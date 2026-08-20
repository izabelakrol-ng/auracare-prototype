import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// On GitHub Pages the app is served from /<repo-name>/, so the production
// build needs that base. Local dev stays at "/".
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/auracare-prototype/" : "/",
  server: { port: 5173, open: false },
}));
