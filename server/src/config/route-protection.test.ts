import { describe, expect, it } from "bun:test";
import { isProtectedRoute } from "./route-protection";

describe("isProtectedRoute", () => {
  it("keeps root and public note routes public", () => {
    expect(isProtectedRoute("/")).toBe(false);
    expect(isProtectedRoute("/health")).toBe(false);
    expect(isProtectedRoute("/api/public-notes")).toBe(false);
    expect(isProtectedRoute("/api/public-notes/123")).toBe(false);
  });

  it("protects private API routes", () => {
    expect(isProtectedRoute("/api/private-notes")).toBe(true);
    expect(isProtectedRoute("/api/notes")).toBe(true);
    expect(isProtectedRoute("/auth-example")).toBe(true);
  });

  it("protects HTMX private note endpoints", () => {
    expect(isProtectedRoute("/htmx/private-notes")).toBe(true);
    expect(isProtectedRoute("/htmx/private-notes/1")).toBe(true);
  });

  it("keeps HTMX public pages public", () => {
    expect(isProtectedRoute("/htmx")).toBe(false);
    expect(isProtectedRoute("/htmx/notes")).toBe(false);
    expect(isProtectedRoute("/htmx/admin/login-modal")).toBe(false);
  });
});
