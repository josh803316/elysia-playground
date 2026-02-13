/**
 * HTMX HTML Templates for the Notes App
 * These functions generate HTML strings that are returned by the server
 */

export interface Note {
  id: number;
  title: string;
  content: string;
  isPublic: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number | null;
  user?: {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
  } | null;
}

export interface User {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  imageUrl?: string | null;
}

/**
 * Base HTML layout with HTMX script, Tailwind CSS, and Clerk JS
 */
export function baseLayout(content: string, title: string = "Elysia Notes - HTMX", clerkPublishableKey?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <script src="https://unpkg.com/htmx.org@1.9.10"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  ${clerkPublishableKey ? `<script
    async
    crossorigin="anonymous"
    data-clerk-publishable-key="${clerkPublishableKey}"
    src="https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js"
    type="text/javascript"
  ></script>` : ''}
  <style>
    .htmx-indicator {
      display: none;
    }
    .htmx-request .htmx-indicator {
      display: inline-block;
    }
    .htmx-request.htmx-indicator {
      display: inline-block;
    }
    /* Fade in animation for new content */
    .htmx-added {
      animation: fadeIn 0.3s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    /* Fade out animation for removed content */
    .htmx-swapping {
      opacity: 0;
      transition: opacity 0.2s ease-out;
    }
    /* Hide elements based on auth state */
    .clerk-loading .show-when-loaded { display: none !important; }
    .clerk-signed-in .show-when-signed-out { display: none !important; }
    .clerk-signed-out .show-when-signed-in { display: none !important; }
    .clerk-signed-in .show-when-signed-in { display: block !important; }
    /* Keep nav "My Notes" + badges in one row when signed in */
    .clerk-signed-in .show-when-signed-in.nav-notes-row { display: flex !important; }
  </style>
</head>
<body class="bg-gray-100 min-h-screen clerk-loading">
  <nav class="bg-white border-b border-gray-200 shadow-sm h-[60px] flex items-center">
    <div class="max-w-[1320px] w-full mx-auto px-4">
      <div class="flex justify-between items-center">
        <a href="/htmx" class="text-xl font-bold text-gray-900 hover:text-teal-700 transition-colors">
          Elysia Notes - HTMX
        </a>
        <div class="flex gap-4 items-center">
          <a href="/htmx" class="text-sm text-gray-700 hover:text-gray-900 font-medium">Home</a>
          <span class="show-when-signed-in nav-notes-row flex items-center gap-2 flex-nowrap">
            <a id="nav-notes-label" href="/htmx/notes" class="text-sm text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">My Notes</a>
            <span id="nav-note-counts" class="flex gap-1.5 items-center flex-shrink-0"></span>
          </span>
          <!-- Auth buttons -->
          <div id="auth-container" class="flex items-center gap-3 show-when-loaded">
            <button 
              id="sign-in-btn"
              class="show-when-signed-out text-sm bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
            <div class="show-when-signed-in flex items-center gap-3">
              <span id="user-name" class="text-sm text-gray-700"></span>
              <button 
                id="sign-out-btn"
                class="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
          <span id="admin-nav-area">
            <button type="button" id="admin-login-btn" hx-get="/htmx/admin/login-modal" hx-target="#modal-container" hx-swap="innerHTML" class="text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded font-medium">
              Admin Login
            </button>
          </span>
        </div>
      </div>
    </div>
  </nav>
  
  <main class="max-w-[1320px] mx-auto px-4 py-8">
    ${content}
  </main>
  
  <footer class="bg-gray-800 text-gray-400 py-6 mt-12">
    <div class="max-w-6xl mx-auto px-4 flex justify-between items-center">
      <span class="text-sm">© 2024 Notes App</span>
      <div class="flex gap-4 text-sm">
        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-white transition-colors">Contact Us</a>
      </div>
    </div>
  </footer>
  
  <script>
    // Admin: API key and nav
    window.getAdminApiKey = function() { return localStorage.getItem('adminApiKey'); };
    // Fetch and display Public/Private note counts in nav (match React/Svelte)
    window.refreshNavNoteCounts = async function(optionalToken) {
      var container = document.getElementById('nav-note-counts');
      if (!container) return;
      var adminKey = window.getAdminApiKey && window.getAdminApiKey();
      if (adminKey) {
        try {
          var r = await fetch('/api/notes/all', { headers: { 'X-API-Key': adminKey } });
          if (!r.ok) { container.innerHTML = ''; return; }
          var data = await r.json();
          var publicCount = Array.isArray(data) ? data.filter(function(n) { return n.isPublic === 'true'; }).length : 0;
          var privateCount = Array.isArray(data) ? data.length - publicCount : 0;
          container.innerHTML = '<span class="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">Public: ' + publicCount + '</span><span class="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">Private: ' + privateCount + '</span>';
        } catch (e) { container.innerHTML = ''; }
        return;
      }
      if (optionalToken) {
        try {
          var pubRes = await fetch('/api/public-notes');
          var privRes = await fetch('/api/private-notes', { headers: { 'Authorization': 'Bearer ' + optionalToken } });
          var pubData = pubRes.ok ? await pubRes.json() : [];
          var privData = privRes.ok ? await privRes.json() : [];
          var publicCount = Array.isArray(pubData) ? pubData.length : 0;
          var privateCount = Array.isArray(privData) ? privData.filter(function(n) { return n.isPublic !== 'true'; }).length : 0;
          container.innerHTML = '<span class="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">Public: ' + publicCount + '</span><span class="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">Private: ' + privateCount + '</span>';
        } catch (e) { container.innerHTML = ''; }
      } else {
        container.innerHTML = '';
      }
    };
    window.updateAdminNav = function() {
      var area = document.getElementById('admin-nav-area');
      if (!area) return;
      var notesLabel = document.getElementById('nav-notes-label');
      if (notesLabel) notesLabel.textContent = window.getAdminApiKey() ? 'All Notes' : 'My Notes';
      if (window.getAdminApiKey()) {
        area.innerHTML = '<button type="button" id="admin-logout-btn" class="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded font-medium">Admin Logout</button>';
        document.getElementById('admin-logout-btn')?.addEventListener('click', function() {
          localStorage.removeItem('adminApiKey');
          document.getElementById('admin-section')?.classList.add('hidden');
          window.updateAdminNav();
        });
      } else {
        area.innerHTML = '<button type="button" id="admin-login-btn" hx-get="/htmx/admin/login-modal" hx-target="#modal-container" hx-swap="innerHTML" class="text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded font-medium">Admin Login</button>';
        htmx.process(document.getElementById('admin-nav-area'));
      }
    };
    document.addEventListener('DOMContentLoaded', function() {
      if (window.getAdminApiKey()) {
        document.getElementById('admin-section')?.classList.remove('hidden');
        setTimeout(function() {
          if (typeof htmx !== 'undefined') htmx.trigger(document.body, 'refreshAdminNotes');
        }, 50);
      }
      window.updateAdminNav();
    });
    document.body.addEventListener('htmx:configRequest', function(evt) {
      var el = evt.detail && evt.detail.elt;
      var getUrl = el && el.getAttribute && el.getAttribute('hx-get');
      var putUrl = el && el.getAttribute && el.getAttribute('hx-put');
      var postUrl = el && el.getAttribute && el.getAttribute('hx-post');
      var deleteUrl = el && el.getAttribute && el.getAttribute('hx-delete');
      var pathInfoUrl = evt.detail.pathInfo && evt.detail.pathInfo.requestPath;
      var url = pathInfoUrl || getUrl || putUrl || postUrl || deleteUrl || '';
      if ((url.indexOf('/htmx/admin/notes') !== -1 || url === '/htmx/admin/notes') && window.getAdminApiKey()) {
        evt.detail.headers['X-API-Key'] = window.getAdminApiKey();
      }
      if (url.indexOf('/htmx/private-notes') !== -1 && window.__clerkToken) {
        evt.detail.headers['Authorization'] = 'Bearer ' + window.__clerkToken;
      }
    });
    document.body.addEventListener('htmx:afterRequest', function(evt) {
      var path = (evt.detail.pathInfo && evt.detail.pathInfo.requestPath) || (evt.detail.elt && evt.detail.elt.getAttribute && evt.detail.elt.getAttribute('hx-get')) || '';
      if (path.indexOf('/htmx/admin/') !== -1 && evt.detail.xhr && evt.detail.xhr.status === 401) {
        localStorage.removeItem('adminApiKey');
        if (window.updateAdminNav) window.updateAdminNav();
      }
    });
  </script>
  ${clerkPublishableKey ? `<script>
    // Initialize Clerk
    window.addEventListener('load', async () => {
      try {
        await window.Clerk.load();
        
        // Update body class based on auth state
        const updateAuthState = async () => {
          document.body.classList.remove('clerk-loading');
          if (window.Clerk.user) {
            document.body.classList.remove('clerk-signed-out');
            document.body.classList.add('clerk-signed-in');
            
            // Update user info
            const user = window.Clerk.user;
            const userName = document.getElementById('user-name');
            const userAvatar = document.getElementById('user-avatar');
            
            if (userName) {
              userName.textContent = user.firstName || user.emailAddresses?.[0]?.emailAddress || 'User';
            }
            if (userAvatar && user.imageUrl) {
              userAvatar.src = user.imageUrl;
              userAvatar.style.display = 'block';
            }
            
            // Refresh private notes section
            htmx.trigger('#private-notes-container', 'refreshPrivateNotes');
            // Refresh nav note counts (Public/Private badges)
            const token = await window.Clerk.session.getToken();
            window.__clerkToken = token || null;
            if (window.refreshNavNoteCounts) window.refreshNavNoteCounts(token);
          } else {
            window.__clerkToken = null;
            document.body.classList.remove('clerk-signed-in');
            document.body.classList.add('clerk-signed-out');
            if (window.refreshNavNoteCounts) window.refreshNavNoteCounts();
          }
        };
        
        await updateAuthState();
        
        // Sign in button
        document.getElementById('sign-in-btn')?.addEventListener('click', () => {
          window.Clerk.openSignIn({
            afterSignInUrl: window.location.href,
            afterSignUpUrl: window.location.href,
          });
        });
        
        // Sign out button
        document.getElementById('sign-out-btn')?.addEventListener('click', async () => {
          await window.Clerk.signOut();
          window.location.reload();
        });
        
        // Listen for auth changes
        window.Clerk.addListener(() => {
          updateAuthState();
        });
      } catch (e) {
        console.error('Clerk initialization error:', e);
        document.body.classList.remove('clerk-loading');
        document.body.classList.add('clerk-signed-out');
      }
    });
  </script>` : ''}
</body>
</html>`;
}

/**
 * Notes table page - full page with table of all notes (admin view, requires Admin API Key)
 */
export function notesTablePage(clerkPublishableKey?: string): string {
  return baseLayout(`
    <div class="space-y-6">
      <div id="modal-container"></div>
      <section class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <a href="/htmx" class="text-teal-600 hover:text-teal-800 text-sm font-medium mb-2 inline-block">← Back to Notes home</a>
            <h2 class="text-2xl font-bold text-gray-800">All Notes</h2>
            <p class="text-gray-600 text-sm">Table view – requires Admin Login</p>
          </div>
        </div>
        <div
          id="notes-table-container"
          hx-get="/htmx/admin/notes"
          hx-trigger="notesTableLoad from:body"
          hx-swap="innerHTML"
          class="min-h-[200px]"
        >
          <div class="text-center py-8 text-gray-500">Loading notes...</div>
        </div>
      </section>
    </div>
    <script>
      (function() {
        function loadNotesTable() {
          var container = document.getElementById('notes-table-container');
          if (!container) return;
          if (!window.getAdminApiKey || !window.getAdminApiKey()) {
            container.innerHTML = '<div class="text-center py-8 text-amber-700 bg-amber-50 rounded-lg border border-amber-200"><div class="text-4xl mb-2">🔑</div><p class="font-medium">Admin login required</p><p class="text-sm mt-1">Use Admin Login in the nav, then refresh this page.</p><a href="/htmx" class="inline-block mt-4 text-teal-600 hover:underline">Back to Notes home</a></div>';
            return;
          }
          if (typeof htmx !== 'undefined') htmx.trigger(document.body, 'notesTableLoad');
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', function() { setTimeout(loadNotesTable, 100); });
        } else {
          setTimeout(loadNotesTable, 100);
        }
      })();
    </script>
  `, "Notes – Table view", clerkPublishableKey);
}

/**
 * Main notes page content
 */
export function notesPage(notes: Note[], clerkPublishableKey?: string): string {
  return baseLayout(`
    <div class="space-y-8">
      <!-- Modal container -->
      <div id="modal-container"></div>
      
      <!-- Admin: All Notes (visible when admin is logged in) -->
      <div id="admin-section" class="hidden" data-testid="section-admin-table">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">All Notes (Admin View)</h2>
              <p class="text-gray-600 text-sm">View and manage all notes in the system</p>
            </div>
          </div>
          <div
            id="admin-notes-container"
            hx-get="/htmx/admin/notes"
            hx-trigger="refreshAdminNotes from:body"
            hx-swap="innerHTML"
            class="min-h-[100px]"
          >
            <div class="text-center py-8 text-gray-500">Loading admin notes...</div>
          </div>
        </div>
      </div>
      
      <!-- Public Notes Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200" data-testid="section-public-notes">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Public Notes</h2>
            <p class="text-gray-600 text-sm">Visible to everyone</p>
          </div>
          <button 
            hx-get="/htmx/notes/new" 
            hx-target="#modal-container"
            hx-swap="innerHTML"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2 font-medium"
          >
            <span class="text-xl">+</span> Create Public Note
          </button>
        </div>
        
        <div id="notes-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${notes.length === 0 
            ? emptyState() 
            : notes.map(note => noteCard(note)).join('')
          }
        </div>
      </div>
      
      <!-- Your Notes Section (only visible when signed in) -->
      <div class="show-when-signed-in show-when-loaded" data-testid="section-your-notes">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">Your Notes</h2>
              <p class="text-gray-600 text-sm">Only you can see these notes</p>
            </div>
            <button 
              hx-get="/htmx/private-notes/new" 
              hx-target="#modal-container"
              hx-swap="innerHTML"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2 font-medium"
            >
              <span class="text-xl">+</span> Create Private Note
            </button>
          </div>
          
          <div 
            id="private-notes-container"
            hx-get="/htmx/private-notes" 
            hx-trigger="load, refreshPrivateNotes from:body"
            hx-swap="innerHTML"
            class="min-h-[100px]"
          >
            <div class="text-center py-8 text-gray-500">
              <div class="animate-pulse">Loading your notes...</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Sign in prompt (only visible when signed out) -->
      <div class="show-when-signed-out show-when-loaded">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 text-center">
          <h2 class="text-xl font-semibold text-gray-700 mb-2">Want to create private notes?</h2>
          <p class="text-gray-600 mb-4">Sign in to create and manage your own private notes.</p>
          <button 
            id="sign-in-prompt-btn"
            onclick="document.getElementById('sign-in-btn')?.click()"
            class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Sign In to Get Started
          </button>
        </div>
      </div>
    </div>
  `, "Elysia Notes - HTMX", clerkPublishableKey);
}

/**
 * Empty state when no notes exist
 */
export function emptyState(): string {
  return `
    <div class="col-span-full text-center py-12 bg-white rounded-lg shadow">
      <div class="text-6xl mb-4">📭</div>
      <h3 class="text-xl font-semibold text-gray-600 mb-2">No notes yet</h3>
      <p class="text-gray-500">Create your first note to get started!</p>
    </div>
  `;
}

/**
 * Individual note card component
 */
export function noteCard(note: Note): string {
  const authorName = note.user 
    ? `${note.user.firstName || ''} ${note.user.lastName || ''}`.trim() || note.user.email
    : 'Anonymous';
  
  const createdDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return `
    <div id="note-${note.id}" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div class="p-5">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-lg font-semibold text-gray-800 line-clamp-1">${escapeHtml(note.title)}</h3>
          <span class="text-xs px-2 py-1 rounded-full ${note.isPublic === 'true' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
            ${note.isPublic === 'true' ? 'Public' : 'Private'}
          </span>
        </div>
        <p class="text-gray-600 text-sm mb-4 line-clamp-3">${escapeHtml(note.content)}</p>
        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>By ${escapeHtml(authorName ?? '')}</span>
          <span>${createdDate}</span>
        </div>
      </div>
      <div class="border-t bg-gray-50 px-5 py-3 flex justify-end gap-2">
        <button 
          hx-get="/htmx/notes/${note.id}/edit" 
          hx-target="#modal-container"
          hx-swap="innerHTML"
          class="text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors"
        >
          Edit
        </button>
        <button 
          hx-delete="/htmx/notes/${note.id}" 
          hx-target="#note-${note.id}"
          hx-swap="outerHTML swap:0.2s"
          hx-confirm="Are you sure you want to delete this note?"
          class="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  `;
}

/**
 * New note form modal
 */
export function newNoteModal(): string {
  return `
    <div id="note-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div class="flex justify-between items-center border-b px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-800">Create New Note</h2>
          <button 
            onclick="document.getElementById('modal-container').innerHTML = ''"
            class="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <form 
          hx-post="/htmx/notes" 
          hx-target="#notes-grid"
          hx-swap="afterbegin"
          hx-on::after-request="if(event.detail.successful) document.getElementById('modal-container').innerHTML = ''"
          class="p-6 space-y-4"
        >
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value="Public Note"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
              placeholder="Enter note title..."
            />
          </div>
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea 
              id="content" 
              name="content" 
              rows="4"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors resize-none"
              placeholder="Write your note here..."
            ></textarea>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button 
              type="button"
              onclick="document.getElementById('modal-container').innerHTML = ''"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <span class="htmx-indicator">
                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Edit note form modal
 */
export function editNoteModal(note: Note): string {
  return `
    <div id="note-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div class="flex justify-between items-center border-b px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-800">Edit Note</h2>
          <button 
            onclick="document.getElementById('modal-container').innerHTML = ''"
            class="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <form 
          hx-put="/htmx/notes/${note.id}" 
          hx-target="#note-${note.id}"
          hx-swap="outerHTML"
          hx-on::after-request="if(event.detail.successful) document.getElementById('modal-container').innerHTML = ''"
          class="p-6 space-y-4"
        >
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value="${escapeHtml(note.title)}"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
              placeholder="Enter note title..."
            />
          </div>
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea 
              id="content" 
              name="content" 
              rows="4"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors resize-none"
              placeholder="Write your note here..."
            >${escapeHtml(note.content)}</textarea>
          </div>
          <div class="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="isPublic" 
              name="isPublic" 
              ${note.isPublic === 'true' ? 'checked' : ''}
              class="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label for="isPublic" class="text-sm text-gray-700">Make this note public</label>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button 
              type="button"
              onclick="document.getElementById('modal-container').innerHTML = ''"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <span class="htmx-indicator">
                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Private notes grid component
 */
export function privateNotesGrid(notes: Note[]): string {
  if (notes.length === 0) {
    return `
      <div class="text-center py-8 text-gray-500">
        <div class="text-4xl mb-2">🔒</div>
        <p>No private notes yet. Create your first one!</p>
      </div>
    `;
  }
  
  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${notes.map(note => privateNoteCard(note)).join('')}
    </div>
  `;
}

/**
 * Individual private note card component
 */
export function privateNoteCard(note: Note): string {
  const createdDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return `
    <div id="private-note-${note.id}" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-purple-500">
      <div class="p-4">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-semibold text-gray-800 line-clamp-1">${escapeHtml(note.title)}</h3>
          <span class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
            🔒 Private
          </span>
        </div>
        <p class="text-gray-600 text-sm mb-3 line-clamp-2">${escapeHtml(note.content)}</p>
        <div class="flex justify-between items-center text-xs text-gray-500">
          <span>${createdDate}</span>
          <button 
            hx-delete="/htmx/private-notes/${note.id}" 
            hx-target="#private-note-${note.id}"
            hx-swap="outerHTML swap:0.2s"
            hx-confirm="Are you sure you want to delete this private note?"
            class="text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * New private note form modal
 */
export function newPrivateNoteModal(): string {
  return `
    <div id="note-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div class="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-purple-50 to-teal-50">
          <h2 class="text-xl font-semibold text-gray-800">🔒 Create Private Note</h2>
          <button 
            onclick="document.getElementById('modal-container').innerHTML = ''"
            class="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <form 
          hx-put="/htmx/private-notes" 
          hx-target="#private-notes-container"
          hx-swap="innerHTML"
          hx-on::after-request="if(event.detail.successful) document.getElementById('modal-container').innerHTML = ''"
          class="p-6 space-y-4"
        >
          <div>
            <label for="data" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea 
              id="data" 
              name="data" 
              rows="4"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors resize-none"
              placeholder="Write your private note here..."
            ></textarea>
          </div>
          <p class="text-sm text-gray-500 flex items-center gap-2">
            <span>🔒</span> This note will only be visible to you
          </p>
          <div class="flex justify-end gap-3 pt-2">
            <button 
              type="button"
              onclick="document.getElementById('modal-container').innerHTML = ''"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <span class="htmx-indicator">
                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Create Private Note
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Auth required message for private notes
 */
export function authRequiredMessage(): string {
  return `
    <div class="text-center py-8 text-gray-500">
      <div class="text-4xl mb-2">🔐</div>
      <p>Please sign in to view your private notes</p>
    </div>
  `;
}

/**
 * Admin unauthorized message (invalid or missing API key)
 */
export function adminUnauthorizedMessage(): string {
  return `
    <div class="text-center py-8 text-amber-700 bg-amber-50 rounded-lg border border-amber-200">
      <div class="text-4xl mb-2">🔑</div>
      <p class="font-medium">Invalid or expired admin key</p>
      <p class="text-sm mt-1">Please log in again with your Admin API Key.</p>
    </div>
  `;
}

/**
 * Admin view: table of all notes (public + private, all users)
 */
export function adminNotesGrid(notes: Note[]): string {
  if (notes.length === 0) {
    return `
      <div class="text-center py-8 text-gray-500" data-testid="admin-notes-table">
        <div class="text-4xl mb-2">📭</div>
        <p>No notes found in the system</p>
      </div>
    `;
  }
  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    ", " +
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const contentPreview = (c: string) =>
    !c ? "(No content)" : c.length > 50 ? escapeHtml(c.slice(0, 50)) + "..." : escapeHtml(c);
  const rows = notes
    .map(
      (note) => {
        const authorName = note.user
          ? `${note.user.firstName || ""} ${note.user.lastName || ""}`.trim() || note.user.email
          : "Anonymous";
        const createdDate = formatDate(new Date(note.createdAt));
        const updatedDate = note.updatedAt ? formatDate(new Date(note.updatedAt)) : "N/A";
        return `
    <tr id="admin-note-row-${note.id}" class="border-b border-gray-200 hover:bg-gray-50">
      <td class="px-4 py-3 text-sm text-gray-900">${escapeHtml(note.title || "Untitled")}</td>
      <td class="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">${contentPreview(note.content || "")}</td>
      <td class="px-4 py-3 text-sm">${note.isPublic === "true" ? '<span class="px-2 py-0.5 rounded bg-green-100 text-green-700">Public</span>' : '<span class="px-2 py-0.5 rounded bg-gray-100 text-gray-700">Private</span>'}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${escapeHtml(authorName ?? "")}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${createdDate}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${updatedDate}</td>
      <td class="px-4 py-3">
        <div class="flex gap-2">
          <button
            hx-get="/htmx/notes/${note.id}/edit"
            hx-target="#modal-container"
            hx-swap="innerHTML"
            class="text-teal-600 hover:text-teal-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            hx-delete="/htmx/admin/notes/${note.id}"
            hx-target="#admin-note-row-${note.id}"
            hx-swap="outerHTML swap:0.2s"
            hx-confirm="Are you sure you want to delete this note?"
            class="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>`;
      }
    )
    .join("");
  return `
    <div class="overflow-x-auto rounded-lg border border-gray-200" data-testid="admin-notes-table">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Content Preview</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Author</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Created</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Updated</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Admin view: single note table row (used when returning one row for swap)
 */
export function adminNoteCard(note: Note): string {
  const authorName = note.user
    ? `${note.user.firstName || ""} ${note.user.lastName || ""}`.trim() || note.user.email
    : "Anonymous";
  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    ", " +
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const createdDate = formatDate(new Date(note.createdAt));
  const updatedDate = note.updatedAt ? formatDate(new Date(note.updatedAt)) : "N/A";
  const contentPreview = !note.content ? "(No content)" : note.content.length > 50 ? escapeHtml(note.content.slice(0, 50)) + "..." : escapeHtml(note.content);
  return `
    <tr id="admin-note-row-${note.id}" class="border-b border-gray-200 hover:bg-gray-50">
      <td class="px-4 py-3 text-sm text-gray-900">${escapeHtml(note.title || "Untitled")}</td>
      <td class="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">${contentPreview}</td>
      <td class="px-4 py-3 text-sm">${note.isPublic === "true" ? '<span class="px-2 py-0.5 rounded bg-green-100 text-green-700">Public</span>' : '<span class="px-2 py-0.5 rounded bg-gray-100 text-gray-700">Private</span>'}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${escapeHtml(authorName ?? "")}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${createdDate}</td>
      <td class="px-4 py-3 text-sm text-gray-500">${updatedDate}</td>
      <td class="px-4 py-3">
        <div class="flex gap-2">
          <button
            hx-get="/htmx/notes/${note.id}/edit"
            hx-target="#modal-container"
            hx-swap="innerHTML"
            class="text-teal-600 hover:text-teal-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            hx-delete="/htmx/admin/notes/${note.id}"
            hx-target="#admin-note-row-${note.id}"
            hx-swap="outerHTML swap:0.2s"
            hx-confirm="Are you sure you want to delete this note?"
            class="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  `;
}

/**
 * Admin login modal (form to enter Admin API Key)
 */
export function adminLoginModal(): string {
  return `
    <div id="admin-login-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="flex justify-between items-center border-b px-6 py-4 bg-amber-50">
          <h2 class="text-xl font-semibold text-gray-800">🔑 Admin Login</h2>
          <button type="button" onclick="window.closeAdminLoginModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <form id="admin-login-form" class="p-6 space-y-4">
          <div>
            <label for="admin-api-key" class="block text-sm font-medium text-gray-700 mb-1">Admin API Key</label>
            <input type="password" id="admin-api-key" name="apiKey" required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              placeholder="Enter your admin API key" />
          </div>
          <div id="admin-login-error" class="text-red-600 text-sm hidden"></div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" onclick="window.closeAdminLoginModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">Cancel</button>
            <button type="submit" class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium">Log in as Admin</button>
          </div>
        </form>
      </div>
    </div>
    <script>
      (function() {
        window.closeAdminLoginModal = function() {
          var c = document.getElementById('modal-container');
          if (c) c.innerHTML = '';
        };
        var form = document.getElementById('admin-login-form');
        if (form) {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            var keyInput = document.getElementById('admin-api-key');
            var key = keyInput && keyInput.value ? keyInput.value.trim() : '';
            if (!key) return;
            localStorage.setItem('adminApiKey', key);
            window.closeAdminLoginModal();
            var section = document.getElementById('admin-section');
            if (section) section.classList.remove('hidden');
            if (typeof htmx !== 'undefined') htmx.trigger(document.body, 'refreshAdminNotes');
            if (window.updateAdminNav) window.updateAdminNav();
            if (window.refreshNavNoteCounts) window.refreshNavNoteCounts();
          });
        }
      })();
    </script>
  `;
}

/**
 * Error message component
 */
export function errorMessage(message: string): string {
  return `
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <strong>Error:</strong> ${escapeHtml(message)}
    </div>
  `;
}

/**
 * Success message component (for toast notifications)
 */
export function successMessage(message: string): string {
  return `
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      ${escapeHtml(message)}
    </div>
  `;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, char => htmlEscapes[char]);
}
