export interface FrameworkSnippet {
  id: string;
  name: string;
  path: string;
  badge: string;
  admin: string;
  public: string;
  private: string;
}

export const FRAMEWORK_SNIPPETS: FrameworkSnippet[] = [
  {
    id: 'react',
    name: 'React',
    path: '/react',
    badge: 'SPA',
    admin: `// Fetch all notes with admin API key
const fetchAllNotes = useCallback(async () => {
  if (!adminApiKey) return;
  const res = await fetch('/api/notes/all', {
    headers: { 'X-API-Key': adminApiKey },
  });
  const data = await res.json();
  setAllNotes(Array.isArray(data) ? data : []);
}, [adminApiKey]);

useEffect(() => {
  if (isAdminLoggedIn) fetchAllNotes();
}, [isAdminLoggedIn, fetchAllNotes]);`,
    public: `// Fetch public notes on mount
const fetchPublicNotes = useCallback(async () => {
  const res = await fetch('/api/public-notes');
  const data = await res.json();
  setPublicNotes(Array.isArray(data) ? data : []);
}, []);

useEffect(() => { fetchPublicNotes(); }, [fetchPublicNotes]);

// Create a public note
const handleSubmit = async ({ title, content }) => {
  await fetch('/api/public-notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, isPublic: true }),
  });
  fetchPublicNotes();
};`,
    private: `// Fetch private notes with Clerk token
const fetchPrivateNotes = useCallback(async () => {
  const token = await getToken();
  const res = await fetch('/api/private-notes', {
    headers: { Authorization: \`Bearer \${token}\` },
  });
  const data = await res.json();
  setPrivateNotes(Array.isArray(data) ? data : []);
}, [getToken]);

useEffect(() => {
  if (isSignedIn) fetchPrivateNotes();
}, [isSignedIn, fetchPrivateNotes]);`,
  },
  {
    id: 'svelte',
    name: 'SvelteKit',
    path: '/svelte',
    badge: 'SSR',
    admin: `// Fetch all notes with admin API key
async function fetchAllNotes() {
  const res = await fetch('/api/notes/all', {
    headers: { 'X-API-Key': adminApiKey },
  });
  allNotes = await res.json();
}
$: if (isAdminLoggedIn) fetchAllNotes();`,
    public: `// Fetch public notes on mount
import { onMount } from 'svelte';
let publicNotes = [];

onMount(async () => {
  const res = await fetch('/api/public-notes');
  publicNotes = await res.json();
});

// Create a public note
async function createNote(title, content) {
  await fetch('/api/public-notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, isPublic: true }),
  });
  const res = await fetch('/api/public-notes');
  publicNotes = await res.json();
}`,
    private: `// Fetch private notes with Clerk token
let privateNotes = [];

async function fetchPrivateNotes(token) {
  const res = await fetch('/api/private-notes', {
    headers: { Authorization: \`Bearer \${token}\` },
  });
  privateNotes = await res.json();
}

// Reactive: fetch when userToken is available
$: if (userToken) fetchPrivateNotes(userToken);`,
  },
  {
    id: 'angular',
    name: 'Angular',
    path: '/angular',
    badge: 'SPA',
    admin: `// admin.ts — Inject NotesApiService and load all notes
@Component({ selector: 'app-admin', ... })
export class AdminComponent implements OnChanges {
  private api = inject(NotesApiService);
  notes = signal<Note[]>([]);

  @Input() apiKey: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['apiKey'] && this.apiKey) this.loadNotes();
  }

  async loadNotes() {
    const data = await this.api.fetchAllNotes(this.apiKey!);
    this.notes.set(Array.isArray(data) ? data : []);
  }

  async deleteNote(id: number) {
    await this.api.deleteNote(id, this.apiKey!);
    await this.loadNotes();
  }
}`,
    public: `// Inject NotesApiService — handles fetch('/api/public-notes')
@Component({ selector: 'app-public-notes', ... })
export class PublicNotesComponent implements OnInit {
  private api = inject(NotesApiService);
  notes = signal<Note[]>([]);

  ngOnInit() { this.loadNotes(); }

  async loadNotes() {
    const data = await this.api.fetchPublicNotes();
    this.notes.set(Array.isArray(data) ? data : []);
  }

  async saveNote(title: string, content: string) {
    await this.api.createPublicNote({ title, content });
    await this.loadNotes();
    this.notesChanged.emit();
  }
}`,
    private: `// private-notes.ts — Token passed from parent (AuthService)
@Component({ selector: 'app-private-notes', ... })
export class PrivateNotesComponent implements OnChanges {
  private api = inject(NotesApiService);
  notes = signal<Note[]>([]);

  @Input() token: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['token'] && this.token) this.loadNotes();
  }

  async loadNotes() {
    const data = await this.api.fetchPrivateNotes(this.token!);
    this.notes.set(Array.isArray(data) ? data : []);
  }

  async createNote(content: string) {
    await this.api.createPrivateNote(this.token!, content);
    await this.loadNotes();
    this.notesChanged.emit();
  }
}`,
  },
  {
    id: 'vue',
    name: 'Vue 3',
    path: '/vue',
    badge: 'SPA',
    admin: `// composables/useAdmin.ts
const fetchAllNotes = async () => {
  const res = await fetch('/api/notes/all', {
    headers: { 'X-API-Key': adminApiKey.value },
  });
  allNotes.value = await res.json();
};
watch(isAdminLoggedIn, (val) => { if (val) fetchAllNotes(); });`,
    public: `// composables/usePublicNotes.ts
const fetchPublicNotes = async () => {
  const res = await fetch('/api/public-notes');
  notes.value = await res.json();
};
onMounted(() => fetchPublicNotes());

// Create a public note
const createNote = async (title, content) => {
  await fetch('/api/public-notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, isPublic: true }),
  });
  await fetchPublicNotes();
};`,
    private: `// composables/usePrivateNotes.ts
const fetchPrivateNotes = async (token) => {
  const res = await fetch('/api/private-notes', {
    headers: { Authorization: \`Bearer \${token}\` },
  });
  notes.value = await res.json();
};
watch(isSignedIn, async (val) => {
  if (val) {
    const token = await getToken.value();
    if (token) fetchPrivateNotes(token);
  }
});`,
  },
  {
    id: 'vanilla-js',
    name: 'Vanilla JS',
    path: '/vanilla-js',
    badge: 'No-framework',
    admin: `// Fetch all notes with admin API key
async function loadAdminNotes() {
  const key = localStorage.getItem('adminApiKey');
  const res = await fetch('/api/notes/all', {
    headers: { 'X-API-Key': key },
  });
  const notes = await res.json();
  renderAdminTable(notes);
}

// Delete note via REST API
async function deleteNote(id) {
  const key = localStorage.getItem('adminApiKey');
  await fetch(\`/api/notes/\${id}/admin\`, {
    method: 'DELETE',
    headers: { 'X-API-Key': key },
  });
  await loadAdminNotes();
}`,
    public: `// In-memory state for this page
let publicNotes = [];

// Fetch public notes (no auth required)
async function loadPublicNotes() {
  const res = await fetch('/api/public-notes');
  publicNotes = await res.json();
  renderPublicNotes();
}

// Create a public note then refresh the grid
async function createPublicNote(title, content) {
  await fetch('/api/public-notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, isPublic: true }),
  });
  await loadPublicNotes();
}`,
    private: `// Fetch private notes with Bearer token from Clerk
let privateNotes = [];

async function loadPrivateNotes(token) {
  const res = await fetch('/api/private-notes', {
    headers: { Authorization: \`Bearer \${token}\` },
  });
  privateNotes = await res.json();
  renderPrivateNotes();
}

// Create a private note then refresh the grid
async function createPrivateNote(title, content, token) {
  await fetch('/api/private-notes', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: \`Bearer \${token}\`,
    },
    body: JSON.stringify({ title, content, isPublic: false }),
  });
  await loadPrivateNotes(token);
}`,
  },
  {
    id: 'htmx',
    name: 'HTMX',
    path: '/htmx',
    badge: 'HTML-first',
    admin: `<!-- Admin notes loaded via HTMX -->
<div
  id="admin-notes-container"
  hx-get="/htmx/admin/notes"
  hx-trigger="refreshAdminNotes from:body"
  hx-swap="innerHTML"
></div>

// X-API-Key injected via htmx:configRequest:
document.body.addEventListener('htmx:configRequest', (evt) => {
  const url = evt.detail.pathInfo?.requestPath ?? '';
  if (url.includes('/htmx/admin/notes')) {
    evt.detail.headers['X-API-Key'] =
      localStorage.getItem('adminApiKey');
  }
});`,
    public: `<!-- Public notes server-rendered by Elysia on page load -->
<div id="notes-grid">
  <!-- noteCard() renders each note server-side -->
</div>

<!-- HTMX loads the create-note form into a modal -->
<button
  hx-get="/htmx/notes/new"
  hx-target="#modal-container"
  hx-swap="innerHTML"
>+ Create Public Note</button>`,
    private: `<!-- Private notes lazy-loaded after Clerk auth -->
<div
  id="private-notes-container"
  hx-get="/htmx/private-notes"
  hx-trigger="load, refreshPrivateNotes from:body"
  hx-swap="innerHTML"
></div>

// Authorization header injected via htmx:configRequest:
document.body.addEventListener('htmx:configRequest', (evt) => {
  const url = evt.detail.pathInfo?.requestPath ?? '';
  if (url.includes('/htmx/private-notes')) {
    evt.detail.headers['Authorization'] =
      'Bearer ' + window.__clerkToken;
  }
});`,
  },
  {
    id: 'jquery',
    name: 'jQuery',
    path: '/jquery',
    badge: 'Showcase',
    admin: `// Fetch all notes as admin
$.ajax({
  url: '/api/notes/all',
  headers: { 'X-API-Key': localStorage.getItem('adminApiKey') },
  success: function(notes) {
    var rows = notes.map(buildAdminRow).join('');
    $('#admin-notes-container').html(buildAdminTable(rows));
  }
});

// Admin delete any note
$.ajax({
  url: '/api/notes/' + id + '/admin',
  method: 'DELETE',
  headers: { 'X-API-Key': localStorage.getItem('adminApiKey') }
});`,
    public: `// Load all public notes on page init
$.get('/api/public-notes', function(notes) {
  if (!notes.length) {
    $('#public-notes-grid').html('<p>No notes yet.</p>');
    return;
  }
  $('#public-notes-grid').html(notes.map(buildNoteCard).join(''));
});

// POST new public note (no auth required)
$('#create-public-note-form').on('submit', function(e) {
  e.preventDefault();
  $.ajax({
    url: '/api/public-notes',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ title: title, content: content }),
    success: function(note) {
      $('#public-notes-grid').prepend(buildNoteCard(note));
    }
  });
});`,
    private: `// Load private notes — requires Clerk session token
var token = await window.Clerk.session.getToken();

$.ajax({
  url: '/api/private-notes',
  headers: { 'Authorization': 'Bearer ' + token },
  success: function(notes) {
    $('#private-notes-container').html(
      notes.map(buildPrivateNoteCard).join('')
    );
  }
});

// Create private note with auth header
$.ajax({
  url: '/api/private-notes',
  method: 'PUT',
  contentType: 'application/json',
  headers: { 'Authorization': 'Bearer ' + window.__jqClerkToken },
  data: JSON.stringify({ title: title, data: content }),
  success: function() { loadPrivateNotes(); }
});`,
  },
];
