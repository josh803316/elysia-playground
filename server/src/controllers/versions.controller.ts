import { Elysia } from "elysia";
import fs from "fs";
import path from "path";

// Read package.json directly since dynamic imports can be troublesome
const packageJsonPath = path.resolve(__dirname, "../../package.json");
const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
const packageJson = JSON.parse(packageJsonContent);

export const versionsController = new Elysia({ prefix: "/versions" }).get(
  "/",
  () => {
    console.log("Versions endpoint called");
    return {
      version: packageJson.version,
      name: packageJson.name,
      environment: process.env.NODE_ENV || "production",
      timestamp: new Date().toISOString(),
    };
  }
);
