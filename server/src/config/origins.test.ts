import { describe, expect, it } from "bun:test";
import { getAllowedOrigins } from "./origins";

describe("getAllowedOrigins", () => {
  it("includes local dev origins by default", () => {
    const origins = getAllowedOrigins({});

    expect(origins).toContain("http://localhost:3000");
    expect(origins).toContain("http://localhost:5173");
    expect(origins).toContain("http://localhost:6173");
  });

  it("adds Vercel URL and custom app URLs", () => {
    const origins = getAllowedOrigins({
      VERCEL_URL: "elysia-playground.vercel.app",
      APP_URL: "https://notes.example.com/",
      CORS_ORIGINS: "https://staging.example.com, notes-preview.example.com",
      CLERK_AUTHORIZED_PARTIES: "https://auth.example.com",
    });

    expect(origins).toContain("https://elysia-playground.vercel.app");
    expect(origins).toContain("https://notes.example.com");
    expect(origins).toContain("https://staging.example.com");
    expect(origins).toContain("https://notes-preview.example.com");
    expect(origins).toContain("https://auth.example.com");
  });

  it("normalizes and de-duplicates origins", () => {
    const origins = getAllowedOrigins({
      APP_URL: "https://notes.example.com/",
      CORS_ORIGINS:
        "https://notes.example.com,http://localhost:5173,https://notes.example.com/path",
    });

    const notesMatches = origins.filter(
      (origin) => origin === "https://notes.example.com"
    );
    expect(notesMatches).toHaveLength(1);
  });
});
