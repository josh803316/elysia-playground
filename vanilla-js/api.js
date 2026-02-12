/**
 * API wrappers for all /api/* endpoints.
 * Each function returns the parsed JSON response.
 */

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function adminHeaders(apiKey) {
  return { "X-API-Key": apiKey };
}

// ── Public Notes ──────────────────────────────────────────────

export async function fetchPublicNotes() {
  const res = await fetch("/api/public-notes");
  if (!res.ok) throw new Error("Failed to fetch public notes");
  return res.json();
}

export async function createPublicNote(content) {
  const res = await fetch("/api/public-notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Failed to create public note");
  return res.json();
}

export async function updatePublicNote(id, { title, content, isPublic }) {
  const res = await fetch(`/api/public-notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, isPublic }),
  });
  if (!res.ok) throw new Error("Failed to update public note");
  return res.json();
}

export async function deletePublicNote(id) {
  const res = await fetch(`/api/public-notes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete public note");
  return res.json();
}

// ── Private Notes (Bearer token) ─────────────────────────────

export async function fetchPrivateNotes(token) {
  const res = await fetch("/api/private-notes", {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch private notes");
  return res.json();
}

export async function createPrivateNote(token, data) {
  const res = await fetch("/api/private-notes", {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error("Failed to create private note");
  return res.json();
}

export async function deletePrivateNote(token, id) {
  const res = await fetch(`/api/private-notes/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to delete private note");
  return res.json();
}

// ── Admin (X-API-Key header) ─────────────────────────────────

export async function fetchAllNotesAdmin(apiKey) {
  const res = await fetch("/api/notes/all", {
    headers: adminHeaders(apiKey),
  });
  if (!res.ok) throw new Error("Failed to fetch admin notes");
  return res.json();
}

export async function deleteNoteAdmin(apiKey, id) {
  const res = await fetch(`/api/notes/${id}/admin`, {
    method: "DELETE",
    headers: adminHeaders(apiKey),
  });
  if (!res.ok) throw new Error("Failed to delete note (admin)");
  return res.json();
}
