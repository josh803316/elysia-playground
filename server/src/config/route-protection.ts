export const publicPaths = [
  "/",
  "/health",
  "/docs",
  "/docs/json",
  "/webhooks",
  "/versions",
  "/api/public-notes",
  "/htmx",
  "/react",
  "/svelte",
  "/vanilla-js",
];

export const isProtectedRoute = (path: string): boolean => {
  // Private HTMX endpoints require auth even though /htmx pages are public.
  if (path.startsWith("/htmx/private-notes")) {
    return true;
  }

  const isPublic = publicPaths.some((publicPath) => {
    // Root path should only match the root route.
    if (publicPath === "/") return path === "/";
    return path === publicPath || path.startsWith(`${publicPath}/`);
  });

  return !isPublic;
};
