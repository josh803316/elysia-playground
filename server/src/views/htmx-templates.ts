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
export function baseLayout(content: string, title: string = "Notes App - HTMX", clerkPublishableKey?: string): string {
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
  </style>
</head>
<body class="bg-gray-100 min-h-screen clerk-loading">
  <nav class="bg-indigo-600 text-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <a href="/htmx" class="text-2xl font-bold hover:text-indigo-200 transition-colors">
          📝 Notes App
        </a>
        <div class="flex gap-4 items-center">
          <span class="text-indigo-200 text-sm hidden md:inline">Powered by HTMX + Elysia</span>
          
          <!-- Auth buttons -->
          <div id="auth-container" class="flex items-center gap-3 show-when-loaded">
            <!-- Signed out state -->
            <button 
              id="sign-in-btn"
              class="show-when-signed-out text-sm bg-white text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
            
            <!-- Signed in state -->
            <div class="show-when-signed-in flex items-center gap-3">
              <div id="user-info" class="flex items-center gap-2">
                <img id="user-avatar" src="" alt="" class="w-8 h-8 rounded-full border-2 border-indigo-300" style="display:none;" />
                <span id="user-name" class="text-sm font-medium"></span>
              </div>
              <button 
                id="sign-out-btn"
                class="text-sm bg-indigo-500 hover:bg-indigo-400 px-3 py-1.5 rounded transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          <a href="/" class="text-sm bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded transition-colors">
            API Home
          </a>
        </div>
      </div>
    </div>
  </nav>
  
  <main class="max-w-6xl mx-auto px-4 py-8">
    ${content}
  </main>
  
  <footer class="bg-gray-800 text-gray-400 py-6 mt-12">
    <div class="max-w-6xl mx-auto px-4 text-center">
      <p>HTMX Notes Demo - Compare with <a href="http://localhost:5173" class="text-indigo-400 hover:underline">React</a> and <a href="http://localhost:5174" class="text-indigo-400 hover:underline">Svelte</a></p>
    </div>
  </footer>
  
  ${clerkPublishableKey ? `<script>
    // Initialize Clerk
    window.addEventListener('load', async () => {
      try {
        await window.Clerk.load();
        
        // Update body class based on auth state
        const updateAuthState = () => {
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
          } else {
            document.body.classList.remove('clerk-signed-in');
            document.body.classList.add('clerk-signed-out');
          }
        };
        
        updateAuthState();
        
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
        window.Clerk.addListener((event) => {
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
 * Main notes page content
 */
export function notesPage(notes: Note[], clerkPublishableKey?: string): string {
  return baseLayout(`
    <div class="space-y-8">
      <!-- Modal container -->
      <div id="modal-container"></div>
      
      <!-- Private Notes Section (only visible when signed in) -->
      <div class="show-when-signed-in show-when-loaded">
        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">My Private Notes</h2>
              <p class="text-gray-600 text-sm">Only you can see these notes</p>
            </div>
            <button 
              hx-get="/htmx/private-notes/new" 
              hx-target="#modal-container"
              hx-swap="innerHTML"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2"
            >
              <span class="text-xl">+</span> New Private Note
            </button>
          </div>
          
          <!-- Private notes grid -->
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
        <div class="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-6 border border-gray-200 text-center">
          <h2 class="text-xl font-semibold text-gray-700 mb-2">Want to create private notes?</h2>
          <p class="text-gray-600 mb-4">Sign in to create and manage your own private notes.</p>
          <button 
            id="sign-in-prompt-btn"
            onclick="document.getElementById('sign-in-btn')?.click()"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Sign In to Get Started
          </button>
        </div>
      </div>
      
      <!-- Public Notes Section -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Public Notes</h2>
            <p class="text-gray-600 text-sm">Visible to everyone</p>
          </div>
          <button 
            hx-get="/htmx/notes/new" 
            hx-target="#modal-container"
            hx-swap="innerHTML"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2"
          >
            <span class="text-xl">+</span> New Public Note
          </button>
        </div>
        
        <!-- Public notes grid -->
        <div id="notes-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${notes.length === 0 
            ? emptyState() 
            : notes.map(note => noteCard(note)).join('')
          }
        </div>
      </div>
    </div>
  `, "Notes App - HTMX", clerkPublishableKey);
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
          class="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
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
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
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
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-none"
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
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
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
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
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
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-none"
              placeholder="Write your note here..."
            >${escapeHtml(note.content)}</textarea>
          </div>
          <div class="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="isPublic" 
              name="isPublic" 
              ${note.isPublic === 'true' ? 'checked' : ''}
              class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
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
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
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
        <div class="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50">
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
