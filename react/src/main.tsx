import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import App from "./App.tsx";
import "./index.css";
import { NoteProvider } from "./context/NoteContext";

// Import only necessary Mantine styles
import "@mantine/core/styles.css";

// Prefer runtime env from server (e.g. /react/env.js) so e2e and monolith use server's Clerk key
declare global {
  interface Window {
    __REACT_ENV__?: { clerkPublishableKey?: string; clerkFrontendApi?: string };
  }
}
const PUBLISHABLE_KEY =
  (typeof window !== "undefined" && window.__REACT_ENV__?.clerkPublishableKey?.trim())
    ? window.__REACT_ENV__.clerkPublishableKey!.trim()
    : import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Clerk publishable key. Set VITE_CLERK_PUBLISHABLE_KEY in .env or serve /react/env.js"
  );
}

// Create a performance-optimized app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      <MantineProvider theme={theme} defaultColorScheme="light">
        <NoteProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/+$/, '') || '/'}>
            <App />
          </BrowserRouter>
        </NoteProvider>
      </MantineProvider>
    </ClerkProvider>
  </React.StrictMode>
);
