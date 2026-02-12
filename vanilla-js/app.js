/**
 * Main orchestrator – initialises auth, loads data, binds events, renders UI.
 */

import { $ } from "./utils.js";
import { initAuth, onChange, signIn, signOut, getToken, refreshToken } from "./auth.js";
import * as api from "./api.js";
import {
  noteCard,
  privateNoteCard,
  emptyState,
  adminNotesTable,
  createPublicNoteModal,
  createPrivateNoteModal,
  editNoteModal,
  adminLoginModal,
} from "./components.js";

// ── State ────────────────────────────────────────────────────

let isSignedIn = false;
let userName = "";
let adminApiKey = sessionStorage.getItem("adminApiKey") || "";
let publicNotes = [];
let privateNotes = [];
let adminNotes = [];

// ── DOM refs ─────────────────────────────────────────────────

const body = document.body;
const modalContainer = $("#modal-container");
const publicGrid = $("#public-notes-grid");
const privateGrid = $("#private-notes-grid");
const adminTableContainer = $("#admin-table-container");
const publicCountBadge = $("#public-count");
const privateCountBadge = $("#private-count");
const userNameEl = $("#user-name");

// ── Render helpers ───────────────────────────────────────────

function renderPublicNotes() {
  publicGrid.innerHTML = "";
  if (publicNotes.length === 0) {
    publicGrid.appendChild(emptyState("No public notes yet. Create one!"));
  } else {
    for (const note of publicNotes) {
      publicGrid.appendChild(
        noteCard(note, {
          canEdit: true,
          onEdit: (n) => openEditModal(n),
          onDelete: (id) => handleDeletePublic(id),
        })
      );
    }
  }
  publicCountBadge.textContent = publicNotes.length;
}

function renderPrivateNotes() {
  privateGrid.innerHTML = "";
  if (privateNotes.length === 0) {
    privateGrid.appendChild(emptyState("No private notes yet."));
  } else {
    for (const note of privateNotes) {
      privateGrid.appendChild(
        privateNoteCard(note, { onDelete: (id) => handleDeletePrivate(id) })
      );
    }
  }
  privateCountBadge.textContent = privateNotes.length;
}

function renderAdminNotes() {
  adminTableContainer.innerHTML = "";
  if (adminNotes.length === 0) {
    adminTableContainer.appendChild(emptyState("No notes found."));
  } else {
    adminTableContainer.appendChild(
      adminNotesTable(adminNotes, { onDelete: (id) => handleAdminDelete(id) })
    );
  }
}

// ── Data loaders ─────────────────────────────────────────────

async function loadPublicNotes() {
  try {
    publicNotes = await api.fetchPublicNotes();
    renderPublicNotes();
  } catch (err) {
    console.error(err);
    publicGrid.innerHTML = "";
    publicGrid.appendChild(emptyState("Error loading public notes."));
  }
}

async function loadPrivateNotes() {
  const token = getToken();
  if (!token) return;
  try {
    privateNotes = await api.fetchPrivateNotes(token);
    renderPrivateNotes();
  } catch (err) {
    console.error(err);
    privateGrid.innerHTML = "";
    privateGrid.appendChild(emptyState("Error loading private notes."));
  }
}

async function loadAdminNotes() {
  if (!adminApiKey) return;
  try {
    adminNotes = await api.fetchAllNotesAdmin(adminApiKey);
    renderAdminNotes();
  } catch (err) {
    console.error(err);
    adminApiKey = "";
    sessionStorage.removeItem("adminApiKey");
    body.classList.remove("admin-active");
    adminTableContainer.innerHTML = "";
    adminTableContainer.appendChild(emptyState("Invalid API key. Please log in again."));
  }
}

// ── Modal helpers ────────────────────────────────────────────

function openModal(modalEl) {
  modalContainer.innerHTML = "";
  modalContainer.appendChild(modalEl);
  modalContainer.classList.add("open");
}

function closeModal() {
  modalContainer.classList.remove("open");
  modalContainer.innerHTML = "";
}

// ── Action handlers ──────────────────────────────────────────

async function handleCreatePublic(content) {
  try {
    await api.createPublicNote(content);
    closeModal();
    await loadPublicNotes();
  } catch (err) {
    console.error(err);
    alert("Failed to create note.");
  }
}

async function handleCreatePrivate(content) {
  try {
    const token = await refreshToken();
    await api.createPrivateNote(token, content);
    closeModal();
    await loadPrivateNotes();
  } catch (err) {
    console.error(err);
    alert("Failed to create private note.");
  }
}

async function handleDeletePublic(id) {
  if (!confirm("Delete this public note?")) return;
  try {
    await api.deletePublicNote(id);
    await loadPublicNotes();
  } catch (err) {
    console.error(err);
    alert("Failed to delete note.");
  }
}

async function handleDeletePrivate(id) {
  if (!confirm("Delete this private note?")) return;
  try {
    const token = await refreshToken();
    await api.deletePrivateNote(token, id);
    await loadPrivateNotes();
  } catch (err) {
    console.error(err);
    alert("Failed to delete note.");
  }
}

async function handleEditPublic(id, data) {
  try {
    await api.updatePublicNote(id, data);
    closeModal();
    await loadPublicNotes();
  } catch (err) {
    console.error(err);
    alert("Failed to update note.");
  }
}

async function handleAdminDelete(id) {
  if (!confirm("Admin delete this note?")) return;
  try {
    await api.deleteNoteAdmin(adminApiKey, id);
    await loadAdminNotes();
    await loadPublicNotes();
    if (isSignedIn) await loadPrivateNotes();
  } catch (err) {
    console.error(err);
    alert("Failed to delete note.");
  }
}

function openEditModal(note) {
  openModal(
    editNoteModal(note, {
      onSubmit: (data) => handleEditPublic(note.id, data),
      onClose: closeModal,
    })
  );
}

// ── Event bindings ───────────────────────────────────────────

function bindNavButtons() {
  $("#btn-sign-in").addEventListener("click", signIn);
  $("#btn-sign-out").addEventListener("click", signOut);

  $("#btn-create-public").addEventListener("click", () => {
    openModal(createPublicNoteModal({ onSubmit: handleCreatePublic, onClose: closeModal }));
  });

  $("#btn-create-private").addEventListener("click", () => {
    openModal(createPrivateNoteModal({ onSubmit: handleCreatePrivate, onClose: closeModal }));
  });

  $("#btn-admin-login").addEventListener("click", () => {
    openModal(
      adminLoginModal({
        onSubmit: (key) => {
          adminApiKey = key;
          sessionStorage.setItem("adminApiKey", key);
          body.classList.add("admin-active");
          closeModal();
          loadAdminNotes();
        },
        onClose: closeModal,
      })
    );
  });

  $("#btn-admin-logout").addEventListener("click", () => {
    adminApiKey = "";
    sessionStorage.removeItem("adminApiKey");
    body.classList.remove("admin-active");
    adminNotes = [];
    adminTableContainer.innerHTML = "";
  });
}

// ── Auth state changes ───────────────────────────────────────

onChange(({ user, token }) => {
  isSignedIn = !!user;

  if (isSignedIn) {
    userName = user.firstName || user.emailAddresses?.[0]?.emailAddress || "User";
    body.classList.add("signed-in");
    body.classList.remove("signed-out");
    userNameEl.textContent = userName;
    loadPrivateNotes();
  } else {
    userName = "";
    body.classList.remove("signed-in");
    body.classList.add("signed-out");
    userNameEl.textContent = "";
    privateNotes = [];
    privateCountBadge.textContent = "0";
    privateGrid.innerHTML = "";
  }
});

// ── Init ─────────────────────────────────────────────────────

async function init() {
  body.classList.add("signed-out");
  bindNavButtons();

  // Restore admin session if key exists
  if (adminApiKey) {
    body.classList.add("admin-active");
  }

  await loadPublicNotes();
  await initAuth();

  // Load admin notes after auth (in case key was stored)
  if (adminApiKey) {
    loadAdminNotes();
  }
}

init();
