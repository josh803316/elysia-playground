/** Shorthand querySelector */
export const $ = (sel, root = document) => root.querySelector(sel);

/** Shorthand querySelectorAll */
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Escape HTML to prevent XSS */
export function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/** Format a date string for display */
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
