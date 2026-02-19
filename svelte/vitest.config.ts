import { defineConfig } from "vitest/config";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: [
      // Stub server types in tests so the real server (initDB, DATABASE_URL, etc.) is never loaded
      {
        find: "$lib/api/server-types",
        replacement: resolve(__dirname, "src/lib/__tests__/server-stub.ts"),
      },
      { find: "$lib", replacement: resolve(__dirname, "src/lib") },
    ],
  },
});
