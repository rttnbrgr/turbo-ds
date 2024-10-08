import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"], // maybe move the test setup to another config package?
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
