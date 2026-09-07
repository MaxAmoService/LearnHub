import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Ausschließlich für die reinen Funktionen in lib/ — keine Firebase-, Component-
// oder E2E-Tests.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
