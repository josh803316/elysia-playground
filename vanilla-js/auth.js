/**
 * Clerk SDK wrapper for the Vanilla JS frontend.
 *
 * We avoid hard‑coding any Clerk keys in the static assets by:
 * 1. Having the backend expose /vanilla-js/env.js which sets window.__VANILLA_ENV__
 *    with a public publishableKey derived from server environment variables.
 * 2. Dynamically injecting the Clerk JS <script> tag at runtime using that key.
 * 3. Calling Clerk.load({ publishableKey }) once the script has loaded.
 */

const VANILLA_ENV = window.__VANILLA_ENV__ || {};
const CLERK_PUBLISHABLE_KEY = VANILLA_ENV.clerkPublishableKey || "";
const CLERK_FRONTEND_API = VANILLA_ENV.clerkFrontendApi || "";

let _clerk = null;
let _token = null;
const _listeners = [];

/** Register a callback: fn({ user, token }) */
export function onChange(fn) {
  _listeners.push(fn);
}

function _notify() {
  const user = _clerk?.user ?? null;
  const payload = { user, token: _token };
  for (const fn of _listeners) fn(payload);
}

/**
 * Returns a promise that resolves once the window 'load' event has fired.
 * If it already fired (document.readyState === 'complete'), resolves immediately.
 * This guarantees all async scripts (including Clerk) have executed.
 */
function windowLoaded() {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }
  return new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
}

/**
 * Dynamically load the Clerk JS SDK from the official CDN using the
 * publishable key and frontend API host provided by the backend (via VANILLA_ENV).
 */
function loadClerkScript() {
  if (!CLERK_PUBLISHABLE_KEY) {
    console.error(
      "[auth] Missing Clerk publishable key. Ensure CLERK_PUBLISHABLE_KEY is set on the server."
    );
    return Promise.reject(new Error("Missing Clerk publishable key"));
  }

  if (!CLERK_FRONTEND_API) {
    console.error(
      "[auth] Missing Clerk frontend API host. Ensure CLERK_FRONTEND_API is set on the server."
    );
    return Promise.reject(new Error("Missing Clerk frontend API"));
  }

  // If the script is already present, don't add it again.
  const existing = document.querySelector(
    'script[data-clerk-publishable-key]'
  );
  if (existing) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.type = "text/javascript";
    // Match the official <script> pattern from Clerk docs:
    // https://clerk.com/docs/js-frontend/getting-started/quickstart
    //   src="https://{{fapi_url}}/npm/@clerk/clerk-js@5/dist/clerk.browser.js"
    script.src = `https://${CLERK_FRONTEND_API}/npm/@clerk/clerk-js@5/dist/clerk.browser.js`;
    script.setAttribute("data-clerk-publishable-key", CLERK_PUBLISHABLE_KEY);

    script.onload = () => resolve();
    script.onerror = (err) => {
      console.error("[auth] Failed to load Clerk script", err);
      reject(err);
    };

    document.head.appendChild(script);
  });
}

/** Initialise Clerk following the official quickstart pattern. */
export async function initAuth() {
  // Step 1: wait for the page to finish loading
  await windowLoaded();

  // Step 2: dynamically load the Clerk JS SDK using the publishable key
  try {
    await loadClerkScript();
  } catch {
    return;
  }

  console.log(
    "[auth] window loaded. window.Clerk exists:",
    !!window.Clerk,
    "type:",
    typeof window.Clerk
  );

  if (!window.Clerk) {
    console.error("[auth] Clerk CDN script did not create window.Clerk");
    return;
  }

  // Step 3: call Clerk.load() with our publishable key
  console.log("[auth] Calling Clerk.load()…");
  try {
    await window.Clerk.load({
      publishableKey: CLERK_PUBLISHABLE_KEY,
    });
  } catch (err) {
    console.error("[auth] Clerk.load() failed:", err);
    return;
  }

  _clerk = window.Clerk;
  console.log("[auth] Clerk ready. isSignedIn:", _clerk.isSignedIn, "user:", _clerk.user?.firstName ?? "none");

  // Step 3: fire initial state and listen for changes
  if (_clerk.user) {
    _token = await _clerk.session.getToken();
  }
  _notify();

  _clerk.addListener(async ({ user }) => {
    if (user) {
      _token = await _clerk.session.getToken();
    } else {
      _token = null;
    }
    _notify();
  });
}

export async function signIn() {
  if (!_clerk) {
    console.warn("[auth] signIn called but Clerk is not ready");
    return;
  }
  await _clerk.openSignIn();
}

export async function signOut() {
  if (!_clerk) {
    console.warn("[auth] signOut called but Clerk is not ready");
    return;
  }
  await _clerk.signOut();
  _token = null;
  _notify();
}

/** Return the current Bearer token (or null). */
export function getToken() {
  return _token;
}

/** Refresh the token (useful before long-running requests). */
export async function refreshToken() {
  if (_clerk?.session) {
    _token = await _clerk.session.getToken();
  }
  return _token;
}
