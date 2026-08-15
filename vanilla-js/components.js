/**
 * DOM builder functions.
 * Each function returns an HTMLElement (never raw HTML strings) to avoid XSS.
 */

import {escapeHtml, formatDate} from './utils.js';

// ── Helpers ──────────────────────────────────────────────────

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'className') node.className = v;
    else if (k === 'textContent') node.textContent = v;
    else if (k === 'innerHTML') node.innerHTML = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  }
  for (const c of children) {
    if (typeof c === 'string') node.appendChild(document.createTextNode(c));
    else if (c) node.appendChild(c);
  }
  return node;
}

// ── Public Note Card (matches HTMX layout exactly) ───────────

export function noteCard(note, {onEdit, onDelete, canEdit = false}) {
  const user = note.user;
  const authorName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'User'
    : 'Anonymous';

  // Card body
  const cardBody = el('div', {className: 'note-card-body'}, [
    // Header: title + badge
    el('div', {className: 'note-card-head'}, [
      el('h3', {className: 'note-card-title', textContent: note.title || 'Public Note'}),
      el('span', {className: 'badge badge-public', textContent: 'Public'}),
    ]),
    // Content
    el('p', {className: 'note-card-content', textContent: note.content}),
    // Meta: author + date
    el('div', {className: 'note-card-meta'}, [
      el('span', {textContent: `By ${authorName}`}),
      el('span', {textContent: formatDate(note.createdAt)}),
    ]),
  ]);

  const children = [cardBody];

  // Card footer: Edit | Delete (matches HTMX)
  if (canEdit && (onEdit || onDelete)) {
    const footer = el('div', {className: 'note-card-footer'});
    if (onEdit) {
      const editBtn = el('button', {className: 'card-action-edit', textContent: 'Edit'});
      editBtn.addEventListener('click', () => onEdit(note));
      footer.appendChild(editBtn);
    }
    if (onDelete) {
      const deleteBtn = el('button', {className: 'card-action-delete', textContent: 'Delete'});
      deleteBtn.addEventListener('click', () => onDelete(note.id));
      footer.appendChild(deleteBtn);
    }
    children.push(footer);
  }

  return el('div', {className: 'note-card'}, children);
}

// ── Private Note Card (matches HTMX private card layout) ─────

export function privateNoteCard(note, {onEdit, onDelete}) {
  const cardBody = el('div', {className: 'note-card-body'}, [
    el('div', {className: 'note-card-head'}, [
      el('h3', {className: 'note-card-title', textContent: note.title || 'Private Note'}),
      el('span', {className: 'badge badge-private', textContent: '🔒 Private'}),
    ]),
    el('p', {className: 'note-card-content', textContent: note.content}),
    el('div', {className: 'note-card-meta note-card-meta--right'}, [
      el('span', {textContent: formatDate(note.createdAt)}),
    ]),
  ]);

  const footer = el('div', {className: 'note-card-footer'});
  if (onEdit) {
    const editBtn = el('button', {className: 'card-action-edit', textContent: 'Edit'});
    editBtn.addEventListener('click', () => onEdit(note));
    footer.appendChild(editBtn);
  }
  const deleteBtn = el('button', {className: 'card-action-delete', textContent: 'Delete'});
  deleteBtn.addEventListener('click', () => onDelete(note.id));
  footer.appendChild(deleteBtn);

  return el('div', {className: 'note-card note-card--private'}, [cardBody, footer]);
}

// ── Empty state ──────────────────────────────────────────────

export function emptyState(message) {
  return el('div', {className: 'empty-state', textContent: message});
}

// ── Admin Notes Table (matches HTMX table columns) ───────────

export function adminNotesTable(notes, {onDelete}) {
  const thead = el('thead', {}, [
    el('tr', {}, [
      el('th', {textContent: 'Title'}),
      el('th', {textContent: 'Content Preview'}),
      el('th', {textContent: 'Status'}),
      el('th', {textContent: 'Author'}),
      el('th', {textContent: 'Created'}),
      el('th', {textContent: 'Actions'}),
    ]),
  ]);

  const rows = notes.map((n) => {
    const user = n.user;
    const authorName = user
      ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'User'
      : n.userId
        ? `User #${n.userId}`
        : 'Anonymous';
    const contentPreview =
      (n.content || '').length > 50 ? n.content.substring(0, 50) + '…' : n.content || '(No content)';
    const statusBadge = el('span', {
      className: n.isPublic === 'true' ? 'badge badge-public' : 'badge badge-private-sm',
      textContent: n.isPublic === 'true' ? 'Public' : 'Private',
    });
    return el('tr', {}, [
      el('td', {textContent: n.title || 'Untitled'}),
      el('td', {className: 'table-content-cell', textContent: contentPreview}),
      el('td', {}, [statusBadge]),
      el('td', {textContent: authorName}),
      el('td', {textContent: formatDate(n.createdAt)}),
      el('td', {}, [
        el('button', {
          className: 'card-action-delete',
          textContent: 'Delete',
          onClick: () => onDelete(n.id),
        }),
      ]),
    ]);
  });

  const tbody = el('tbody', {}, rows);
  const table = el('table', {className: 'admin-table'}, [thead, tbody]);
  return el('div', {className: 'admin-table-wrapper'}, [table]);
}

// ── Modals ───────────────────────────────────────────────────

function modal(title, bodyChildren, {onClose}) {
  const overlay = el('div', {className: 'modal-overlay'});
  const box = el('div', {className: 'modal'}, [
    el('div', {className: 'modal-header'}, [
      el('h3', {textContent: title}),
      el('button', {className: 'modal-close', innerHTML: '&times;', onClick: onClose}),
    ]),
    el('div', {className: 'modal-body'}, bodyChildren),
  ]);
  overlay.appendChild(box);

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) onClose();
  });

  return overlay;
}

export function createPublicNoteModal({onSubmit, onClose}) {
  const titleInput = el('input', {
    className: 'input',
    type: 'text',
    placeholder: 'Enter note title...',
  });
  const textarea = el('textarea', {
    className: 'input',
    rows: '4',
    placeholder: 'Write your note here...',
  });

  const form = el('form', {className: 'modal-form'}, [
    el('label', {className: 'label', textContent: 'Title'}),
    titleInput,
    el('label', {className: 'label', textContent: 'Content'}),
    textarea,
    el('div', {className: 'modal-actions'}, [
      el('button', {type: 'button', className: 'btn btn-secondary', textContent: 'Cancel', onClick: onClose}),
      el('button', {type: 'submit', className: 'btn btn-green', textContent: 'Create'}),
    ]),
  ]);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const content = textarea.value.trim();
    if (!title || !content) return;
    onSubmit({title, content});
  });

  return modal('Create Public Note', [form], {onClose});
}

export function createPrivateNoteModal({onSubmit, onClose}) {
  const titleInput = el('input', {
    className: 'input',
    type: 'text',
    placeholder: 'Enter note title...',
  });
  const textarea = el('textarea', {
    className: 'input',
    rows: '4',
    placeholder: 'Write your private note here...',
  });

  const form = el('form', {className: 'modal-form'}, [
    el('label', {className: 'label', textContent: 'Title'}),
    titleInput,
    el('label', {className: 'label', textContent: 'Content'}),
    textarea,
    el('p', {className: 'private-hint', textContent: '🔒 This note will only be visible to you'}),
    el('div', {className: 'modal-actions'}, [
      el('button', {type: 'button', className: 'btn btn-secondary', textContent: 'Cancel', onClick: onClose}),
      el('button', {type: 'submit', className: 'btn btn-purple', textContent: 'Create Private Note'}),
    ]),
  ]);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const content = textarea.value.trim();
    if (!title || !content) return;
    onSubmit({title, content});
  });

  return modal('🔒 Create Private Note', [form], {onClose});
}

export function editNoteModal(note, {onSubmit, onClose}) {
  const titleInput = el('input', {
    className: 'input',
    type: 'text',
    value: note.title || 'Public Note',
    placeholder: 'Enter note title...',
  });
  const textarea = el('textarea', {className: 'input', rows: '4'});
  textarea.value = note.content;

  const form = el('form', {className: 'modal-form'}, [
    el('label', {className: 'label', textContent: 'Title'}),
    titleInput,
    el('label', {className: 'label', textContent: 'Content'}),
    textarea,
    el('div', {className: 'modal-actions'}, [
      el('button', {type: 'button', className: 'btn btn-secondary', textContent: 'Cancel', onClick: onClose}),
      el('button', {type: 'submit', className: 'btn btn-teal', textContent: 'Save Changes'}),
    ]),
  ]);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit({
      title: titleInput.value.trim(),
      content: textarea.value.trim(),
      isPublic: true,
    });
  });

  return modal('Edit Note', [form], {onClose});
}

export function editPrivateNoteModal(note, {onSubmit, onClose}) {
  const titleInput = el('input', {
    className: 'input',
    type: 'text',
    value: note.title || 'Private Note',
    placeholder: 'Enter note title...',
  });
  const textarea = el('textarea', {className: 'input', rows: '4'});
  textarea.value = note.content;

  const form = el('form', {className: 'modal-form'}, [
    el('label', {className: 'label', textContent: 'Title'}),
    titleInput,
    el('label', {className: 'label', textContent: 'Content'}),
    textarea,
    el('p', {className: 'private-hint', textContent: '🔒 This note will only be visible to you'}),
    el('div', {className: 'modal-actions'}, [
      el('button', {type: 'button', className: 'btn btn-secondary', textContent: 'Cancel', onClick: onClose}),
      el('button', {type: 'submit', className: 'btn btn-purple', textContent: 'Save Changes'}),
    ]),
  ]);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit({
      title: titleInput.value.trim(),
      content: textarea.value.trim(),
    });
  });

  return modal('🔒 Edit Private Note', [form], {onClose});
}

export function adminLoginModal({onSubmit, onClose}) {
  const input = el('input', {
    className: 'input',
    type: 'password',
    placeholder: 'Enter your admin API key',
  });

  const form = el('form', {className: 'modal-form'}, [
    el('label', {className: 'label', textContent: 'Admin API Key'}),
    input,
    el('div', {className: 'modal-actions'}, [
      el('button', {type: 'button', className: 'btn btn-secondary', textContent: 'Cancel', onClick: onClose}),
      el('button', {type: 'submit', className: 'btn btn-amber', textContent: 'Log in as Admin'}),
    ]),
  ]);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (val) onSubmit(val);
  });

  return modal('🔑 Admin Login', [form], {onClose});
}
