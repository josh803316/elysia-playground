/** Same-origin API base for Vue app; use when building fetch URLs so dev proxy works without CORS. */
export function useApiBase(): string {
  return window.location.origin;
}
