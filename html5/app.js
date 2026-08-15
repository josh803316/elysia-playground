/**
 * Main orchestrator for the HTML5 Notes SPA.
 *
 * Uses native HTML5 features:
 * - <dialog> elements (already in HTML) opened via .showModal() / .close()
 * - <template> elements for note card rendering (no innerHTML for user data)
 * - <details>/<summary> for code expanders (no JS toggle needed)
 * - Native form validation (required attributes on inputs)
 */

import {$, formatDate} from './utils.js';
import {initAuth, onChange, signIn, signOut, getToken, refreshToken} from './auth.js';
import * as api from './api.js';

// ── State ────────────────────────────────────────────────────

let isSignedIn = false;
let adminApiKey = localStorage.getItem('adminApiKey') || '';
let publicNotes = [];
let privateNotes = [];
let adminNotes = [];

// ── DOM refs ─────────────────────────────────────────────────

const body = document.body;
const publicGrid = $('#public-notes-grid');
const privateGrid = $('#private-notes-grid');
const adminTableContainer = $('#admin-table-container');
const publicCountBadge = $('#public-count');
const privateCountBadge = $('#private-count');
const userNameEl = $('#user-name');

// ── Native dialog refs ────────────────────────────────────────

const dialogCreatePublic = /** @type {HTMLDialogElement} */ (document.getElementById('dialog-create-public'));
const dialogCreatePrivate = /** @type {HTMLDialogElement} */ (document.getElementById('dialog-create-private'));
const dialogEditNote = /** @type {HTMLDialogElement} */ (document.getElementById('dialog-edit-note'));
const dialogEditPrivateNote = /** @type {HTMLDialogElement} */ (document.getElementById('dialog-edit-private-note'));
const dialogAdminLogin = /** @type {HTMLDialogElement} */ (document.getElementById('dialog-admin-login'));

// ── Template refs ─────────────────────────────────────────────

const tplPublicNote = /** @type {HTMLTemplateElement} */ (document.getElementById('tpl-public-note'));
const tplPrivateNote = /** @type {HTMLTemplateElement} */ (document.getElementById('tpl-private-note'));
const tplAdminRow = /** @type {HTMLTemplateElement} */ (document.getElementById('tpl-admin-row'));

// ── Render helpers ───────────────────────────────────────────

function updateCounts() {
  publicCountBadge.textContent = String(publicNotes.length);
  const publicCountSignedIn = $('#public-count-signed-in');
  if (publicCountSignedIn) {
    publicCountSignedIn.textContent = String(publicNotes.length);
  }
}

function renderPublicNotes() {
  publicGrid.innerHTML = '';
  if (publicNotes.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No public notes yet. Create one!';
    publicGrid.appendChild(empty);
    updateCounts();
    return;
  }
  for (const note of publicNotes) {
    const fragment = tplPublicNote.content.cloneNode(true);
    // Use textContent for user data to prevent XSS
    fragment.querySelector('.note-card-title').textContent = note.title || '';
    fragment.querySelector('.note-card-content').textContent = note.content || '';
    fragment.querySelector('.note-card-date').textContent = formatDate(note.createdAt);
    const editBtn = fragment.querySelector('.btn-edit-note');
    const deleteBtn = fragment.querySelector('.btn-delete-note');
    editBtn.dataset.id = note.id;
    deleteBtn.dataset.id = note.id;
    editBtn.addEventListener('click', () => openEditDialog(note));
    deleteBtn.addEventListener('click', () => handleDeletePublic(note.id));
    publicGrid.appendChild(fragment);
  }
  updateCounts();
}

function renderPrivateNotes() {
  privateGrid.innerHTML = '';
  if (privateNotes.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No private notes yet.';
    privateGrid.appendChild(empty);
    privateCountBadge.textContent = '0';
    return;
  }
  for (const note of privateNotes) {
    const fragment = tplPrivateNote.content.cloneNode(true);
    fragment.querySelector('.note-card-title').textContent = note.title || '';
    fragment.querySelector('.note-card-content').textContent = note.content || note.data || '';
    fragment.querySelector('.note-card-date').textContent = formatDate(note.createdAt);
    const editBtn = fragment.querySelector('.btn-edit-note');
    const deleteBtn = fragment.querySelector('.btn-delete-note');
    editBtn.dataset.id = note.id;
    deleteBtn.dataset.id = note.id;
    editBtn.addEventListener('click', () => openEditPrivateDialog(note));
    deleteBtn.addEventListener('click', () => handleDeletePrivate(note.id));
    privateGrid.appendChild(fragment);
  }
  privateCountBadge.textContent = String(privateNotes.length);
}

function renderAdminNotes() {
  adminTableContainer.innerHTML = '';
  if (adminNotes.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No notes found.';
    adminTableContainer.appendChild(empty);
    return;
  }
  const wrapper = document.createElement('div');
  wrapper.className = 'admin-table-wrapper';
  const table = document.createElement('table');
  table.className = 'admin-table';
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr><th>ID</th><th>Title</th><th>Content</th><th>Type</th><th>Actions</th></tr>';
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  for (const note of adminNotes) {
    const fragment = tplAdminRow.content.cloneNode(true);
    fragment.querySelector('.col-id').textContent = note.id || '';
    fragment.querySelector('.col-title').textContent = note.title || '';
    fragment.querySelector('.col-content').textContent = note.content || note.data || '';
    const typeCell = fragment.querySelector('.col-type');
    const badge = document.createElement('span');
    badge.className = 'badge-private-sm';
    badge.textContent = note.isPublic ? 'Public' : 'Private';
    typeCell.innerHTML = '';
    typeCell.appendChild(badge);
    const deleteBtn = fragment.querySelector('.btn-admin-delete');
    deleteBtn.dataset.id = note.id;
    deleteBtn.addEventListener('click', () => handleAdminDelete(note.id));
    tbody.appendChild(fragment);
  }
  table.appendChild(tbody);
  wrapper.appendChild(table);
  adminTableContainer.appendChild(wrapper);
}

// ── Data loaders ─────────────────────────────────────────────

async function loadPublicNotes() {
  try {
    publicNotes = await api.fetchPublicNotes();
    renderPublicNotes();
  } catch (err) {
    console.error(err);
    publicGrid.innerHTML = '';
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Error loading public notes.';
    publicGrid.appendChild(empty);
  }
}

async function loadPrivateNotes() {
  const token = getToken();
  if (!token) {
    return;
  }
  try {
    privateNotes = await api.fetchPrivateNotes(token);
    renderPrivateNotes();
  } catch (err) {
    console.error(err);
    privateGrid.innerHTML = '';
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Error loading private notes.';
    privateGrid.appendChild(empty);
  }
}

async function loadAdminNotes() {
  const key = adminApiKey;
  if (!key) {
    return;
  }
  try {
    adminNotes = await api.fetchAllNotesAdmin(key);
    renderAdminNotes();
  } catch (err) {
    console.error(err);
    // eslint-disable-next-line require-atomic-updates
    adminApiKey = '';
    localStorage.removeItem('adminApiKey');
    body.classList.remove('admin-active');
    adminTableContainer.innerHTML = '';
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Invalid or missing admin key. Use Admin Login and try again.';
    adminTableContainer.appendChild(empty);
  }
}

// ── Dialog helpers ────────────────────────────────────────────

function openEditDialog(note) {
  document.getElementById('edit-note-id').value = note.id;
  document.getElementById('edit-note-title').value = note.title || '';
  document.getElementById('edit-note-content').value = note.content || '';
  dialogEditNote.showModal();
}

function openEditPrivateDialog(note) {
  document.getElementById('edit-private-note-id').value = note.id;
  document.getElementById('edit-private-note-title').value = note.title || '';
  document.getElementById('edit-private-note-content').value = note.content || note.data || '';
  dialogEditPrivateNote.showModal();
}

// ── Action handlers ──────────────────────────────────────────

async function handleCreatePublic(title, content) {
  try {
    await api.createPublicNote({title, content});
    dialogCreatePublic.close();
    await loadPublicNotes();
  } catch (err) {
    console.error(err);
    alert('Failed to create note.');
  }
}

async function handleCreatePrivate(title, content) {
  try {
    const token = await refreshToken();
    await api.createPrivateNote(token, {title, content});
    dialogCreatePrivate.close();
    await loadPrivateNotes();
  } catch (err) {
    console.error(err);
    alert('Failed to create private note.');
  }
}

async function handleDeletePublic(id) {
  if (!confirm('Delete this public note?')) {
    return;
  }
  try {
    await api.deletePublicNote(id);
    await loadPublicNotes();
  } catch (err) {
    console.error(err);
    alert('Failed to delete note.');
  }
}

async function handleDeletePrivate(id) {
  if (!confirm('Delete this private note?')) {
    return;
  }
  try {
    const token = await refreshToken();
    await api.deletePrivateNote(token, id);
    await loadPrivateNotes();
  } catch (err) {
    console.error(err);
    alert('Failed to delete note.');
  }
}

async function handleEditNote(id, title, content) {
  try {
    await api.updatePublicNote(id, {title, content, isPublic: true});
    dialogEditNote.close();
    await loadPublicNotes();
  } catch (err) {
    console.error(err);
    alert('Failed to update note.');
  }
}

async function handleEditPrivate(id, title, content) {
  try {
    const token = await refreshToken();
    await api.updatePrivateNote(token, id, {title, content});
    dialogEditPrivateNote.close();
    await loadPrivateNotes();
  } catch (err) {
    console.error(err);
    alert('Failed to update private note.');
  }
}

async function handleAdminDelete(id) {
  if (!confirm('Admin delete this note?')) {
    return;
  }
  try {
    await api.deleteNoteAdmin(adminApiKey, id);
    await loadAdminNotes();
    await loadPublicNotes();
    if (isSignedIn) {
      await loadPrivateNotes();
    }
  } catch (err) {
    console.error(err);
    alert('Failed to delete note.');
  }
}

// ── Event bindings ───────────────────────────────────────────

function bindNavButtons() {
  $('#btn-sign-in').addEventListener('click', signIn);
  $('#btn-sign-out').addEventListener('click', signOut);

  $('#btn-create-public').addEventListener('click', () => {
    document.getElementById('form-create-public').reset();
    dialogCreatePublic.showModal();
  });

  $('#btn-create-private').addEventListener('click', () => {
    document.getElementById('form-create-private').reset();
    dialogCreatePrivate.showModal();
  });

  $('#btn-admin-login').addEventListener('click', () => {
    document.getElementById('form-admin-login').reset();
    dialogAdminLogin.showModal();
  });

  $('#btn-admin-logout').addEventListener('click', () => {
    adminApiKey = '';
    localStorage.removeItem('adminApiKey');
    body.classList.remove('admin-active');
    adminNotes = [];
    adminTableContainer.innerHTML = '';
  });

  const regexInput = $('#admin-regex-input');
  const btnDeleteByRegex = $('#btn-delete-by-regex');
  if (btnDeleteByRegex && regexInput) {
    btnDeleteByRegex.addEventListener('click', async () => {
      const regex = regexInput.value.trim();
      if (!regex || !adminApiKey) {
        return;
      }
      btnDeleteByRegex.disabled = true;
      try {
        await api.deleteNotesByRegexAdmin(adminApiKey, regex);
        regexInput.value = '';
        await loadAdminNotes();
        await loadPublicNotes();
        if (isSignedIn) {
          await loadPrivateNotes();
        }
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to delete by regex.');
      } finally {
        btnDeleteByRegex.disabled = false;
      }
    });
  }
}

function bindDialogForms() {
  // Create Public Note form
  document.getElementById('form-create-public').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const title = form.elements['title'].value.trim();
    const content = form.elements['content'].value.trim();
    await handleCreatePublic(title, content);
  });

  // Close buttons for Create Public dialog
  document.getElementById('dialog-create-public-close').addEventListener('click', () => dialogCreatePublic.close());
  document.getElementById('dialog-create-public-cancel').addEventListener('click', () => dialogCreatePublic.close());

  // Create Private Note form
  document.getElementById('form-create-private').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const title = form.elements['title'].value.trim();
    const content = form.elements['content'].value.trim();
    await handleCreatePrivate(title, content);
  });

  // Close buttons for Create Private dialog
  document.getElementById('dialog-create-private-close').addEventListener('click', () => dialogCreatePrivate.close());
  document.getElementById('dialog-create-private-cancel').addEventListener('click', () => dialogCreatePrivate.close());

  // Edit Note form
  document.getElementById('form-edit-note').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const id = form.elements['id'].value;
    const title = form.elements['title'].value.trim();
    const content = form.elements['content'].value.trim();
    await handleEditNote(id, title, content);
  });

  // Close buttons for Edit dialog
  document.getElementById('dialog-edit-note-close').addEventListener('click', () => dialogEditNote.close());
  document.getElementById('dialog-edit-note-cancel').addEventListener('click', () => dialogEditNote.close());

  // Edit Private Note form
  document.getElementById('form-edit-private-note').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const id = form.elements['id'].value;
    const title = form.elements['title'].value.trim();
    const content = form.elements['content'].value.trim();
    await handleEditPrivate(id, title, content);
  });

  // Close buttons for Edit Private Note dialog
  document
    .getElementById('dialog-edit-private-note-close')
    .addEventListener('click', () => dialogEditPrivateNote.close());
  document
    .getElementById('dialog-edit-private-note-cancel')
    .addEventListener('click', () => dialogEditPrivateNote.close());

  // Admin Login form
  document.getElementById('form-admin-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const key = form.elements['apiKey'].value.trim();
    adminApiKey = key;
    localStorage.setItem('adminApiKey', key);
    body.classList.add('admin-active');
    dialogAdminLogin.close();
    await loadAdminNotes();
  });

  // Close buttons for Admin Login dialog
  document.getElementById('dialog-admin-login-close').addEventListener('click', () => dialogAdminLogin.close());
  document.getElementById('dialog-admin-login-cancel').addEventListener('click', () => dialogAdminLogin.close());

  // Close dialogs on backdrop click
  for (const dialog of [
    dialogCreatePublic,
    dialogCreatePrivate,
    dialogEditNote,
    dialogEditPrivateNote,
    dialogAdminLogin,
  ]) {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  }
}

// ── Auth state changes ───────────────────────────────────────

onChange(({user}) => {
  isSignedIn = !!user;

  if (isSignedIn) {
    const name = user.firstName || user.emailAddresses?.[0]?.emailAddress || 'User';
    body.classList.add('signed-in');
    body.classList.remove('signed-out');
    userNameEl.textContent = name;
    loadPrivateNotes();
  } else {
    body.classList.remove('signed-in');
    body.classList.add('signed-out');
    userNameEl.textContent = '';
    privateNotes = [];
    privateCountBadge.textContent = '0';
    privateGrid.innerHTML = '';
  }
});

// ── Versions (footer) ─────────────────────────────────────────

let versionsData = null;
let versionsError = null;

function renderVersionsPanel() {
  const panel = $('#versions-panel');
  if (!panel) {
    return;
  }
  if (versionsError) {
    panel.innerHTML = `<p class="versions-error">${versionsError}</p>`;
    return;
  }
  if (!versionsData) {
    panel.innerHTML = '<p class="versions-loading">Loading…</p>';
    return;
  }
  const d = versionsData;
  let html =
    '<div class="versions-panel-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem"><span style="font-weight:600;color:#1f2937">Versions</span><button type="button" id="versions-close" style="background:none;border:none;font-size:1.25rem;cursor:pointer;color:#6b7280">×</button></div>';
  html += '<dl>';
  html += `<div style="margin-bottom:0.5rem"><dt style="color:#6b7280">App</dt><dd style="font-weight:500;margin:0">${d.name || ''} @ ${d.version || ''}</dd></div>`;
  if (d.elysia) {
    html += `<div style="margin-bottom:0.5rem"><dt style="color:#6b7280">Elysia</dt><dd style="font-weight:500;margin:0">${d.elysia}</dd></div>`;
  }
  if (d.commitSha) {
    html += `<div style="margin-bottom:0.5rem"><dt style="color:#6b7280">Commit</dt><dd style="font-family:monospace;font-size:0.75rem;word-break:break-all;margin:0">${d.commitSha}</dd></div>`;
  }
  html += `<div style="margin-bottom:0.5rem"><dt style="color:#6b7280">Environment</dt><dd style="margin:0">${d.environment || ''}</dd></div>`;
  html += '</dl>';
  panel.innerHTML = html;
  $('#versions-close')?.addEventListener('click', () => {
    panel.setAttribute('aria-hidden', 'true');
  });
}

function initVersions() {
  fetch('/versions')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((d) => {
      versionsData = d;
    })
    .catch((e) => {
      versionsError = e?.message ?? 'Failed to load versions';
    });
  const panel = $('#versions-panel');
  const btn = $('#versions-btn');
  btn?.addEventListener('click', () => {
    const hidden = panel.getAttribute('aria-hidden') !== 'false';
    panel.setAttribute('aria-hidden', String(!hidden));
    if (!hidden) {
      return;
    }
    renderVersionsPanel();
  });
}

// ── Prism highlight on <details> open ────────────────────────

document.addEventListener(
  'toggle',
  (evt) => {
    const details = evt.target;
    if (details.tagName !== 'DETAILS' || !details.open) {
      return;
    }
    if (window.Prism) {
      window.Prism.highlightAllUnder(details);
    }
  },
  true,
);

// ── Init ─────────────────────────────────────────────────────

async function init() {
  body.classList.add('signed-out');
  bindNavButtons();
  bindDialogForms();
  initVersions();

  // Restore admin session if key exists
  if (adminApiKey) {
    body.classList.add('admin-active');
  }

  await loadPublicNotes();
  await initAuth();

  // Load admin notes after auth (in case key was stored)
  if (adminApiKey) {
    loadAdminNotes();
  }
}

init();
