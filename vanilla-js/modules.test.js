/**
 * Unit tests for ES module imports/exports in the vanilla-js package.
 *
 * These tests verify:
 * 1. All existing ES module imports/exports function correctly after setting 'type': 'module'
 * 2. No errors related to module resolution or syntax after the change
 *
 * Note: Since this is a browser-based frontend, we mock DOM APIs for pure function testing.
 */

import { describe, expect, it, beforeAll, mock } from "bun:test";

// ── Mock browser globals before importing modules ────────────────────────────

// Mock minimal DOM APIs
globalThis.document = {
  createElement: (tag) => ({
    tagName: tag.toUpperCase(),
    textContent: "",
    innerHTML: "",
    className: "",
    setAttribute: () => {},
    getAttribute: () => null,
    appendChild: () => {},
    addEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
  }),
  querySelector: () => null,
  querySelectorAll: () => [],
  readyState: "complete",
  head: { appendChild: () => {} },
  body: { classList: { add: () => {}, remove: () => {} } },
};

globalThis.window = {
  __VANILLA_ENV__: {},
  addEventListener: () => {},
  Clerk: null,
};

globalThis.sessionStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

globalThis.fetch = mock(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));

// ── Test: utils.js exports ───────────────────────────────────────────────────

describe("utils.js ES module exports", () => {
  let utils;

  beforeAll(async () => {
    utils = await import("./utils.js");
  });

  it("exports $ function", () => {
    expect(typeof utils.$).toBe("function");
  });

  it("exports $$ function", () => {
    expect(typeof utils.$$).toBe("function");
  });

  it("exports escapeHtml function", () => {
    expect(typeof utils.escapeHtml).toBe("function");
  });

  it("exports formatDate function", () => {
    expect(typeof utils.formatDate).toBe("function");
  });

  it("escapeHtml works correctly", () => {
    // The function uses DOM to escape, so we need a working mock
    const mockDiv = {
      textContent: "",
      innerHTML: "",
    };
    Object.defineProperty(mockDiv, "innerHTML", {
      get() {
        return this.textContent
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      },
    });
    globalThis.document.createElement = () => mockDiv;

    const result = utils.escapeHtml("<script>alert('xss')</script>");
    expect(result).toContain("&lt;");
    expect(result).not.toContain("<script>");
  });

  it("formatDate handles valid dates", () => {
    const result = utils.formatDate("2024-01-15T10:30:00Z");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("formatDate handles empty/null input", () => {
    expect(utils.formatDate("")).toBe("");
    expect(utils.formatDate(null)).toBe("");
    expect(utils.formatDate(undefined)).toBe("");
  });

  it("formatDate handles invalid dates", () => {
    expect(utils.formatDate("not-a-date")).toBe("");
  });
});

// ── Test: api.js exports ─────────────────────────────────────────────────────

describe("api.js ES module exports", () => {
  let api;

  beforeAll(async () => {
    api = await import("./api.js");
  });

  it("exports fetchPublicNotes function", () => {
    expect(typeof api.fetchPublicNotes).toBe("function");
  });

  it("exports createPublicNote function", () => {
    expect(typeof api.createPublicNote).toBe("function");
  });

  it("exports updatePublicNote function", () => {
    expect(typeof api.updatePublicNote).toBe("function");
  });

  it("exports deletePublicNote function", () => {
    expect(typeof api.deletePublicNote).toBe("function");
  });

  it("exports fetchPrivateNotes function", () => {
    expect(typeof api.fetchPrivateNotes).toBe("function");
  });

  it("exports createPrivateNote function", () => {
    expect(typeof api.createPrivateNote).toBe("function");
  });

  it("exports deletePrivateNote function", () => {
    expect(typeof api.deletePrivateNote).toBe("function");
  });

  it("exports fetchAllNotesAdmin function", () => {
    expect(typeof api.fetchAllNotesAdmin).toBe("function");
  });

  it("exports deleteNoteAdmin function", () => {
    expect(typeof api.deleteNoteAdmin).toBe("function");
  });

  it("does not export internal helper functions", () => {
    // authHeaders and adminHeaders should be private
    expect(api.authHeaders).toBeUndefined();
    expect(api.adminHeaders).toBeUndefined();
  });
});

// ── Test: auth.js exports ────────────────────────────────────────────────────

describe("auth.js ES module exports", () => {
  let auth;

  beforeAll(async () => {
    auth = await import("./auth.js");
  });

  it("exports onChange function", () => {
    expect(typeof auth.onChange).toBe("function");
  });

  it("exports initAuth function", () => {
    expect(typeof auth.initAuth).toBe("function");
  });

  it("exports signIn function", () => {
    expect(typeof auth.signIn).toBe("function");
  });

  it("exports signOut function", () => {
    expect(typeof auth.signOut).toBe("function");
  });

  it("exports getToken function", () => {
    expect(typeof auth.getToken).toBe("function");
  });

  it("exports refreshToken function", () => {
    expect(typeof auth.refreshToken).toBe("function");
  });

  it("does not export internal variables", () => {
    expect(auth._clerk).toBeUndefined();
    expect(auth._token).toBeUndefined();
    expect(auth._listeners).toBeUndefined();
  });
});

// ── Test: components.js exports ──────────────────────────────────────────────

describe("components.js ES module exports", () => {
  let components;

  beforeAll(async () => {
    components = await import("./components.js");
  });

  it("exports noteCard function", () => {
    expect(typeof components.noteCard).toBe("function");
  });

  it("exports privateNoteCard function", () => {
    expect(typeof components.privateNoteCard).toBe("function");
  });

  it("exports emptyState function", () => {
    expect(typeof components.emptyState).toBe("function");
  });

  it("exports adminNotesTable function", () => {
    expect(typeof components.adminNotesTable).toBe("function");
  });

  it("exports createPublicNoteModal function", () => {
    expect(typeof components.createPublicNoteModal).toBe("function");
  });

  it("exports createPrivateNoteModal function", () => {
    expect(typeof components.createPrivateNoteModal).toBe("function");
  });

  it("exports editNoteModal function", () => {
    expect(typeof components.editNoteModal).toBe("function");
  });

  it("exports adminLoginModal function", () => {
    expect(typeof components.adminLoginModal).toBe("function");
  });

  it("does not export internal helper functions", () => {
    // el and modal should be private
    expect(components.el).toBeUndefined();
    expect(components.modal).toBeUndefined();
  });
});

// ── Test: Module resolution and syntax ───────────────────────────────────────

describe("ES module resolution", () => {
  it("can dynamically import utils.js without errors", async () => {
    const module = await import("./utils.js");
    expect(module).toBeDefined();
  });

  it("can dynamically import api.js without errors", async () => {
    const module = await import("./api.js");
    expect(module).toBeDefined();
  });

  it("can dynamically import auth.js without errors", async () => {
    const module = await import("./auth.js");
    expect(module).toBeDefined();
  });

  it("can dynamically import components.js without errors", async () => {
    const module = await import("./components.js");
    expect(module).toBeDefined();
  });
});

// ── Test: Cross-module imports work correctly ────────────────────────────────

describe("Cross-module imports", () => {
  it("components.js successfully imports from utils.js", async () => {
    // If components.js imports from utils.js fail, this import would throw
    const components = await import("./components.js");
    expect(components).toBeDefined();

    // Verify the imported functions are used (emptyState uses textContent)
    const emptyEl = components.emptyState("test");
    expect(emptyEl).toBeDefined();
  });

  it("app.js imports are all resolvable", async () => {
    // We can't fully test app.js as it has side effects,
    // but we can verify all its dependencies are importable
    const [utils, auth, api, components] = await Promise.all([
      import("./utils.js"),
      import("./auth.js"),
      import("./api.js"),
      import("./components.js"),
    ]);

    // Verify specific imports used by app.js
    expect(typeof utils.$).toBe("function");
    expect(typeof auth.initAuth).toBe("function");
    expect(typeof auth.onChange).toBe("function");
    expect(typeof auth.signIn).toBe("function");
    expect(typeof auth.signOut).toBe("function");
    expect(typeof auth.getToken).toBe("function");
    expect(typeof auth.refreshToken).toBe("function");
    expect(typeof api.fetchPublicNotes).toBe("function");
    expect(typeof components.noteCard).toBe("function");
    expect(typeof components.privateNoteCard).toBe("function");
    expect(typeof components.emptyState).toBe("function");
    expect(typeof components.adminNotesTable).toBe("function");
    expect(typeof components.createPublicNoteModal).toBe("function");
    expect(typeof components.createPrivateNoteModal).toBe("function");
    expect(typeof components.editNoteModal).toBe("function");
    expect(typeof components.adminLoginModal).toBe("function");
  });
});

// ── Test: No CommonJS syntax in ES modules ───────────────────────────────────

describe("Module syntax compliance", () => {
  it("modules use ES module syntax (export/import), not CommonJS", async () => {
    // If any file used CommonJS (module.exports, require), the dynamic imports above would fail
    // in a 'type': 'module' context. This test documents that expectation.
    const modules = await Promise.all([
      import("./utils.js"),
      import("./api.js"),
      import("./auth.js"),
      import("./components.js"),
    ]);

    // All modules should have been imported successfully
    expect(modules.length).toBe(4);
    modules.forEach((mod) => {
      expect(mod).toBeDefined();
      expect(typeof mod).toBe("object");
    });
  });
});
