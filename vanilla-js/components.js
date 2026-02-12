/**
 * DOM builder functions.
 * Each function returns an HTMLElement (never raw HTML strings) to avoid XSS.
 */

import { escapeHtml, formatDate } from "./utils.js";

// ── Helpers ──────────────────────────────────────────────────

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "className") node.className = v;
    else if (k === "textContent") node.textContent = v;
    else if (k === "innerHTML") node.innerHTML = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  }
  for (const c of children) {
    if (typeof c === "string") node.appendChild(document.createTextNode(c));
    else if (c) node.appendChild(c);
  }
  return node;
}

// ── Public Note Card ─────────────────────────────────────────

export function noteCard(note, { onEdit, onDelete, canEdit = false }) {
  const user = note.user;
  const authorName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
    : "Anonymous";

  const card = el("div", { className: "note-card" }, [
    el("div", { className: "note-card-header" }, [
      el("span", { className: "note-card-author", textContent: authorName }),
      el("span", { className: "note-card-date", textContent: formatDate(note.createdAt) }),
    ]),
    el("h3", { className: "note-card-title", textContent: note.title || "Public Note" }),
    el("p", { className: "note-card-content", textContent: note.content }),
  ]);

  // Only show action buttons for anonymous (userId === null) public notes
  if (canEdit && note.userId === null) {
    const actions = el("div", { className: "note-card-actions" }, [
      el("button", { className: "btn btn-sm btn-secondary", textContent: "Edit", onClick: () => onEdit(note) }),
      el("button", { className: "btn btn-sm btn-danger", textContent: "Delete", onClick: () => onDelete(note.id) }),
    ]);
    card.appendChild(actions);
  }

  return card;
}

// ── Private Note Card ────────────────────────────────────────

export function privateNoteCard(note, { onDelete }) {
  return el("div", { className: "note-card note-card--private" }, [
    el("div", { className: "note-card-header" }, [
      el("span", { className: "badge badge--private", textContent: "Private" }),
      el("span", { className: "note-card-date", textContent: formatDate(note.createdAt) }),
    ]),
    el("h3", { className: "note-card-title", textContent: note.title || "Private Note" }),
    el("p", { className: "note-card-content", textContent: note.content }),
    el("div", { className: "note-card-actions" }, [
      el("button", { className: "btn btn-sm btn-danger", textContent: "Delete", onClick: () => onDelete(note.id) }),
    ]),
  ]);
}

// ── Empty state ──────────────────────────────────────────────

export function emptyState(message) {
  return el("div", { className: "empty-state", textContent: message });
}

// ── Admin Notes Table ────────────────────────────────────────

export function adminNotesTable(notes, { onDelete }) {
  const thead = el("thead", {}, [
    el("tr", {}, [
      el("th", { textContent: "ID" }),
      el("th", { textContent: "Title" }),
      el("th", { textContent: "Content" }),
      el("th", { textContent: "Public" }),
      el("th", { textContent: "Created" }),
      el("th", { textContent: "Actions" }),
    ]),
  ]);

  const rows = notes.map((n) =>
    el("tr", {}, [
      el("td", { textContent: String(n.id) }),
      el("td", { textContent: n.title || "-" }),
      el("td", { className: "table-content-cell", textContent: n.content }),
      el("td", { textContent: n.isPublic === "true" ? "Yes" : "No" }),
      el("td", { textContent: formatDate(n.createdAt) }),
      el("td", {}, [
        el("button", {
          className: "btn btn-sm btn-danger",
          textContent: "Delete",
          onClick: () => onDelete(n.id),
        }),
      ]),
    ])
  );

  const tbody = el("tbody", {}, rows);
  return el("table", { className: "admin-table" }, [thead, tbody]);
}

// ── Modals ───────────────────────────────────────────────────

function modal(title, bodyChildren, { onClose }) {
  const overlay = el("div", { className: "modal-overlay" });
  const box = el("div", { className: "modal" }, [
    el("div", { className: "modal-header" }, [
      el("h3", { textContent: title }),
      el("button", { className: "modal-close", innerHTML: "&times;", onClick: onClose }),
    ]),
    el("div", { className: "modal-body" }, bodyChildren),
  ]);
  overlay.appendChild(box);

  // Close on overlay click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) onClose();
  });

  return overlay;
}

export function createPublicNoteModal({ onSubmit, onClose }) {
  const textarea = el("textarea", {
    className: "input",
    rows: "4",
    placeholder: "Write your note here...",
  });

  const form = el("form", { className: "modal-form" }, [
    el("label", { className: "label", textContent: "Note Content" }),
    textarea,
    el("div", { className: "modal-actions" }, [
      el("button", { type: "button", className: "btn btn-secondary", textContent: "Cancel", onClick: onClose }),
      el("button", { type: "submit", className: "btn btn-primary", textContent: "Create" }),
    ]),
  ]);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = textarea.value.trim();
    if (val) onSubmit(val);
  });

  return modal("Create Public Note", [form], { onClose });
}

export function createPrivateNoteModal({ onSubmit, onClose }) {
  const textarea = el("textarea", {
    className: "input",
    rows: "4",
    placeholder: "Write your private note here...",
  });

  const form = el("form", { className: "modal-form" }, [
    el("label", { className: "label", textContent: "Note Content" }),
    textarea,
    el("div", { className: "modal-actions" }, [
      el("button", { type: "button", className: "btn btn-secondary", textContent: "Cancel", onClick: onClose }),
      el("button", { type: "submit", className: "btn btn-primary", textContent: "Create" }),
    ]),
  ]);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = textarea.value.trim();
    if (val) onSubmit(val);
  });

  return modal("Create Private Note", [form], { onClose });
}

export function editNoteModal(note, { onSubmit, onClose }) {
  const titleInput = el("input", {
    className: "input",
    type: "text",
    value: note.title || "Public Note",
  });
  const textarea = el("textarea", { className: "input", rows: "4" });
  textarea.value = note.content;

  const form = el("form", { className: "modal-form" }, [
    el("label", { className: "label", textContent: "Title" }),
    titleInput,
    el("label", { className: "label", textContent: "Content" }),
    textarea,
    el("div", { className: "modal-actions" }, [
      el("button", { type: "button", className: "btn btn-secondary", textContent: "Cancel", onClick: onClose }),
      el("button", { type: "submit", className: "btn btn-primary", textContent: "Save" }),
    ]),
  ]);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit({
      title: titleInput.value.trim(),
      content: textarea.value.trim(),
      isPublic: true,
    });
  });

  return modal("Edit Note", [form], { onClose });
}

export function adminLoginModal({ onSubmit, onClose }) {
  const input = el("input", {
    className: "input",
    type: "password",
    placeholder: "Enter admin API key",
  });

  const form = el("form", { className: "modal-form" }, [
    el("label", { className: "label", textContent: "API Key" }),
    input,
    el("div", { className: "modal-actions" }, [
      el("button", { type: "button", className: "btn btn-secondary", textContent: "Cancel", onClick: onClose }),
      el("button", { type: "submit", className: "btn btn-primary", textContent: "Login" }),
    ]),
  ]);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (val) onSubmit(val);
  });

  return modal("Admin Login", [form], { onClose });
}
