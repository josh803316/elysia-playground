/**
 * jQuery HTML Templates for the Notes App
 *
 * Single-page app served at GET /jquery/ — all data fetched client-side via
 * jQuery calling the same JSON REST API used by the other frontends. Each major
 * section includes a collapsible code-expander (slideToggle) that shows the
 * exact jQuery running for that section.
 */

function escapeHtml(text: string): string {
  return text.replace(
    /[&<>"']/g,
    (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c] ?? c,
  );
}

/** Escape code snippets for display inside <code> blocks inside HTML */
function escapeCode(code: string): string {
  return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** A `</>  Code ▼` toggle + hidden Prism-highlighted panel */
function codeExpander(code: string, id: string): string {
  return `
  <div class="border-t border-gray-100 mt-4">
    <button
      type="button"
      class="jq-code-toggle w-full flex items-center gap-1.5 px-0 py-2.5 text-xs font-mono text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-left"
      aria-controls="${id}-panel"
      aria-expanded="false"
    >
      <span class="text-gray-300">&lt;/&gt;</span> jQuery code
      <span class="jq-chevron ml-1 inline-block transition-transform duration-200">▼</span>
    </button>
    <div id="${id}-panel" class="jq-code-panel" style="display:none">
      <pre class="language-javascript rounded-lg text-xs overflow-x-auto m-0"><code class="language-javascript">${escapeCode(code)}</code></pre>
    </div>
  </div>`;
}

export function baseLayout(content: string, title = 'Elysia Notes - jQuery', clerkPublishableKey?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js"></script>
  ${
    clerkPublishableKey
      ? `<script
    async
    crossorigin="anonymous"
    data-clerk-publishable-key="${clerkPublishableKey}"
    src="https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js"
    type="text/javascript"
  ></script>`
      : ''
  }
  <style>
    .jq-chevron.rotated { transform: rotate(180deg); }
    /* Hide elements based on auth state */
    .clerk-loading .show-when-loaded { display: none !important; }
    .clerk-signed-in .show-when-signed-out { display: none !important; }
    .clerk-signed-out .show-when-signed-in { display: none !important; }
    .clerk-signed-in .show-when-signed-in { display: block !important; }
    .clerk-signed-in .show-when-signed-in.nav-notes-row { display: flex !important; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .note-card-enter { animation: fadeIn 0.25s ease-out; }
    pre[class*="language-"] { margin: 0; border-radius: 0.5rem; font-size: 0.8rem; }
  </style>
</head>
<body class="bg-gray-100 min-h-screen clerk-loading">
  <nav class="bg-white border-b border-gray-200 shadow-sm h-[60px] flex items-center">
    <div class="max-w-[1320px] w-full mx-auto px-4">
      <div class="flex justify-between items-center">
        <a href="/jquery/" class="text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors">
          Elysia Notes - jQuery
        </a>
        <div class="flex gap-4 items-center">
          <a href="/jquery/" class="text-sm text-gray-700 hover:text-gray-900 font-medium">Home</a>
          <span id="nav-public-standalone" class="show-when-signed-out text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">Public: 0</span>
          <span class="show-when-signed-in nav-notes-row flex items-center gap-2 flex-nowrap">
            <a id="nav-notes-label" href="/jquery/" class="text-sm text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap">My Notes</a>
            <span id="nav-note-counts" class="flex gap-1.5 items-center flex-shrink-0"></span>
          </span>
          <div id="auth-container" class="flex items-center gap-3 show-when-loaded">
            <button id="sign-in-btn" class="show-when-signed-out text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Sign In
            </button>
            <div class="show-when-signed-in flex items-center gap-3">
              <span id="user-name" class="text-sm text-gray-700"></span>
              <button id="sign-out-btn" class="text-sm text-gray-600 hover:text-gray-900 font-medium">Sign Out</button>
            </div>
          </div>
          <span id="admin-nav-area">
            <button type="button" id="admin-login-btn" class="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-medium">
              Admin Login
            </button>
          </span>
        </div>
      </div>
    </div>
  </nav>

  <!-- Top nav / auth / admin code sample (separate row under nav) -->
  <div class="max-w-[1320px] mx-auto px-4 mt-3">
    <div class="border-t border-gray-100">
      <button
        type="button"
        class="jq-nav-code-toggle w-full flex items-center gap-1.5 px-0 py-2.5 text-xs font-mono text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-left"
        aria-controls="jq-nav-code-panel"
        aria-expanded="false"
      >
        <span class="text-gray-300">&lt;/&gt;</span> jQuery nav &amp; auth code
        <span class="jq-chevron ml-1 inline-block transition-transform duration-200">▼</span>
      </button>
      <div id="jq-nav-code-panel" class="jq-nav-code-panel" style="display:none">
        <pre class="language-javascript rounded-lg text-xs overflow-x-auto m-0"><code class="language-javascript">// jQuery layout: nav counts, auth, and admin wiring
// Helper: read Admin API key from localStorage
window.getAdminApiKey = function() { return localStorage.getItem('adminApiKey'); };

// Update the "Public: N" badges in the nav
function updateNavCounts() {
  var adminKey = window.getAdminApiKey();
  if (adminKey) {
    $.ajax({
      url: '/api/notes/all',
      headers: { 'X-API-Key': adminKey },
      success: function(data) {
        var pub = Array.isArray(data) ? data.filter(function(n) { return n.isPublic === 'true'; }).length : 0;
        var priv = Array.isArray(data) ? data.length - pub : 0;
        $('#nav-public-standalone').text('Public: ' + pub);
        $('#nav-note-counts').html(
          '&lt;span class="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium"&gt;Public: ' + pub + '&lt;/span&gt;' +
          '&lt;span class="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium"&gt;Private: ' + priv + '&lt;/span&gt;'
        );
      }
    });
    return;
  }

  $.get('/api/public-notes', function(pub) {
    var pubCount = Array.isArray(pub) ? pub.length : 0;
    $('#nav-public-standalone').text('Public: ' + pubCount);
  });
}

// Admin nav: swap between Login and Logout buttons
function updateAdminNav() {
  var $area = $('#admin-nav-area');
  var $label = $('#nav-notes-label');
  if (window.getAdminApiKey()) {
    if ($label.length) $label.text('All Notes');
    $area.html('&lt;button type="button" id="admin-logout-btn" class="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded font-medium"&gt;Admin Logout&lt;/button&gt;');
    $('#admin-logout-btn').on('click', function() {
      localStorage.removeItem('adminApiKey');
      $('#admin-section').addClass('hidden');
      updateAdminNav();
      updateNavCounts();
    });
  } else {
    if ($label.length) $label.text('My Notes');
    $area.html('&lt;button type="button" id="admin-login-btn" class="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-medium"&gt;Admin Login&lt;/button&gt;');
    $('#admin-login-btn').on('click', showAdminLoginModal);
  }
}

// Clerk auth: toggle body classes and load private notes
window.addEventListener('load', async function() {
  try {
    await window.Clerk.load();
    async function updateAuthState() {
      document.body.classList.remove('clerk-loading');
      if (window.Clerk.user) {
        document.body.classList.remove('clerk-signed-out');
        document.body.classList.add('clerk-signed-in');
        var user = window.Clerk.user;
        var nameEl = document.getElementById('user-name');
        if (nameEl) nameEl.textContent =
          user.firstName ||
          (user.emailAddresses &amp;&amp; user.emailAddresses[0] &amp;&amp; user.emailAddresses[0].emailAddress) ||
          'User';
        var token = await window.Clerk.session.getToken();
        window.__jqClerkToken = token || null;
        loadPrivateNotes();
        updateNavCounts();
      } else {
        window.__jqClerkToken = null;
        document.body.classList.remove('clerk-signed-in');
        document.body.classList.add('clerk-signed-out');
        updateNavCounts();
      }
    }
    await updateAuthState();
    document.getElementById('sign-in-btn').addEventListener('click', function() {
      window.Clerk.openSignIn({ afterSignInUrl: window.location.href, afterSignUpUrl: window.location.href });
    });
    document.getElementById('sign-out-btn').addEventListener('click', async function() {
      await window.Clerk.signOut();
      window.location.reload();
    });
    window.Clerk.addListener(function() { updateAuthState(); });
  } catch (e) {
    console.error('Clerk init error:', e);
    document.body.classList.remove('clerk-loading');
    document.body.classList.add('clerk-signed-out');
  }
});</code></pre>
      </div>
    </div>
  </div>

  <main class="max-w-[1320px] mx-auto px-4 py-8">
    ${content}
  </main>

  <footer class="bg-gray-800 text-gray-400 py-6 mt-12 relative">
    <div id="versions-panel" class="hidden absolute bottom-full right-4 mb-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-left text-sm max-w-sm max-h-[70vh] overflow-auto z-50 text-gray-800" style="width:360px"></div>
    <div class="max-w-[1320px] mx-auto px-4 flex justify-between items-center">
      <span class="text-sm">© 2024 Notes App</span>
      <div class="flex gap-4 text-sm items-center">
        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-white transition-colors">Contact Us</a>
        <button type="button" id="versions-btn" class="bg-transparent border-none text-gray-400 hover:text-white transition-colors cursor-pointer p-0 text-sm">Versions</button>
      </div>
    </div>
  </footer>

  <!-- Modal container -->
  <div id="modal-container"></div>

  <script>
    // ─── Helpers ─────────────────────────────────────────────────────────────
    window.getAdminApiKey = function() { return localStorage.getItem('adminApiKey'); };

    function escHtml(s) {
      return String(s || '').replace(/[&<>"']/g, function(c) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
      });
    }

    function formatDate(d) {
      var dt = new Date(d);
      return dt.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
    }

    // ─── Note card DOM builder (public) ──────────────────────────────────────
    function buildNoteCard(note) {
      var author = note.user
        ? ((note.user.firstName || '') + ' ' + (note.user.lastName || '')).trim() || note.user.email
        : 'Anonymous';
      return '<div id="note-' + note.id + '" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden note-card-enter">'
        + '<div id="notes-grid" class="h-full flex flex-col">'
        + '<div class="p-5 flex-1 flex flex-col">'
        + '<div class="flex justify-between items-start mb-3">'
        + '<h3 class="text-lg font-semibold text-gray-800 line-clamp-1">' + escHtml(note.title) + '</h3>'
        + '<span class="text-xs px-2 py-1 rounded-full ' + (note.isPublic === 'true' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600') + '">'
        + (note.isPublic === 'true' ? 'Public' : 'Private') + '</span>'
        + '</div>'
        + '<p class="text-gray-600 text-sm mb-4 line-clamp-3">' + escHtml(note.content) + '</p>'
        + '<div class="flex justify-between items-center text-xs text-gray-500 mt-auto">'
        + '<span>By ' + escHtml(author) + '</span>'
        + '<span>' + formatDate(note.createdAt) + '</span>'
        + '</div>'
        + '</div>'
        + '<div class="border-t bg-gray-50 px-5 py-3 flex justify-end gap-2">'
        + '<button class="edit-note-btn text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors" data-id="' + note.id + '" data-title="' + escHtml(note.title) + '" data-content="' + escHtml(note.content) + '" data-public="' + note.isPublic + '">Edit</button>'
        + '<button class="delete-note-btn text-red-600 hover:text-red-800 text-sm font-medium transition-colors" data-id="' + note.id + '">Delete</button>'
        + '</div>'
        + '</div>'
        + '</div>';
    }

    // ─── Private note card DOM builder ───────────────────────────────────────
    function buildPrivateNoteCard(note) {
      return '<div id="private-note-' + note.id + '" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-purple-500 note-card-enter">'
        + '<div class="p-4">'
        + '<div class="flex justify-between items-start mb-2">'
        + '<h3 class="text-lg font-semibold text-gray-800 line-clamp-1">' + escHtml(note.title) + '</h3>'
        + '<span class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">🔒 Private</span>'
        + '</div>'
        + '<p class="text-gray-600 text-sm mb-3 line-clamp-2">' + escHtml(note.content) + '</p>'
        + '<div class="flex justify-between items-center text-xs text-gray-500">'
        + '<span>' + formatDate(note.createdAt) + '</span>'
        + '<button class="delete-private-note-btn text-red-600 hover:text-red-800 font-medium transition-colors" data-id="' + note.id + '">Delete</button>'
        + '</div>'
        + '</div>'
        + '</div>';
    }

    // ─── Admin table row DOM builder ─────────────────────────────────────────
    function buildAdminRow(note) {
      var author = note.user
        ? ((note.user.firstName || '') + ' ' + (note.user.lastName || '')).trim() || note.user.email
        : 'Anonymous';
      var preview = (note.content || '').length > 50
        ? escHtml(note.content.slice(0, 50)) + '...'
        : escHtml(note.content || '(No content)');
      var created = note.createdAt
        ? new Date(note.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})
          + ', ' + new Date(note.createdAt).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})
        : '';
      var updated = note.updatedAt
        ? new Date(note.updatedAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})
          + ', ' + new Date(note.updatedAt).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})
        : 'N/A';
      var statusBadge = note.isPublic === 'true'
        ? '<span class="px-2 py-0.5 rounded bg-green-100 text-green-700">Public</span>'
        : '<span class="px-2 py-0.5 rounded bg-gray-100 text-gray-700">Private</span>';
      return '<tr id="admin-note-row-' + note.id + '" class="border-b border-gray-200 hover:bg-gray-50">'
        + '<td class="px-4 py-3 text-sm text-gray-900">' + escHtml(note.title || 'Untitled') + '</td>'
        + '<td class="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">' + preview + '</td>'
        + '<td class="px-4 py-3 text-sm">' + statusBadge + '</td>'
        + '<td class="px-4 py-3 text-sm text-gray-500">' + escHtml(author) + '</td>'
        + '<td class="px-4 py-3 text-sm text-gray-500">' + created + '</td>'
        + '<td class="px-4 py-3 text-sm text-gray-500">' + updated + '</td>'
        + '<td class="px-4 py-3"><div class="flex gap-2">'
        + '<button class="admin-edit-btn text-blue-600 hover:text-blue-800 text-sm font-medium" data-id="' + note.id + '" data-title="' + escHtml(note.title) + '" data-content="' + escHtml(note.content) + '" data-public="' + note.isPublic + '">Edit</button>'
        + '<button class="admin-delete-btn text-red-600 hover:text-red-800 text-sm font-medium" data-id="' + note.id + '">Delete</button>'
        + '</div></td>'
        + '</tr>';
    }

    // ─── Load public notes ────────────────────────────────────────────────────
    function loadPublicNotes() {
      var $grid = $('#public-notes-grid');
      $grid.html('<div class="col-span-full text-center py-8 text-gray-400">Loading…</div>');
      $.get('/api/public-notes', function(notes) {
        if (!notes || notes.length === 0) {
          $grid.html('<div class="col-span-full text-center py-12 bg-white rounded-lg shadow"><div class="text-6xl mb-4">📭</div><h3 class="text-xl font-semibold text-gray-600 mb-2">No notes yet</h3><p class="text-gray-500">Create your first note to get started!</p></div>');
          return;
        }
        $grid.html(notes.map(buildNoteCard).join(''));
        updatePublicBadge(notes.length);
      }).fail(function() {
        $grid.html('<div class="col-span-full text-center py-8 text-red-500">Failed to load notes.</div>');
      });
    }

    function updatePublicBadge(count) {
      $('#nav-public-standalone').text('Public: ' + count);
    }

    // ─── Load private notes ───────────────────────────────────────────────────
    function loadPrivateNotes() {
      if (!window.__jqClerkToken) return;
      var $container = $('#private-notes-container');
      $container.html('<div class="text-center py-8 text-gray-400 animate-pulse">Loading your notes…</div>');
      $.ajax({
        url: '/api/private-notes',
        headers: { 'Authorization': 'Bearer ' + window.__jqClerkToken },
        success: function(notes) {
          if (!notes || notes.length === 0) {
            $container.html('<div class="text-center py-8 text-gray-500"><div class="text-4xl mb-2">🔒</div><p>No private notes yet. Create your first one!</p></div>');
          } else {
            $container.html('<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">' + notes.map(buildPrivateNoteCard).join('') + '</div>');
          }
          updateNavCounts();
        },
        error: function() {
          $container.html('<div class="text-center py-8 text-gray-500"><div class="text-4xl mb-2">🔐</div><p>Please sign in to view your private notes</p></div>');
        }
      });
    }

    // ─── Nav counts ──────────────────────────────────────────────────────────
    function updateNavCounts() {
      var adminKey = window.getAdminApiKey();
      if (adminKey) {
        $.ajax({
          url: '/api/notes/all',
          headers: { 'X-API-Key': adminKey },
          success: function(data) {
            var pub = Array.isArray(data) ? data.filter(function(n) { return n.isPublic === 'true'; }).length : 0;
            var priv = Array.isArray(data) ? data.length - pub : 0;
            $('#nav-public-standalone').text('Public: ' + pub);
            $('#nav-note-counts').html('<span class="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">Public: ' + pub + '</span><span class="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">Private: ' + priv + '</span>');
          }
        });
        return;
      }
      $.get('/api/public-notes', function(pub) {
        var pubCount = Array.isArray(pub) ? pub.length : 0;
        $('#nav-public-standalone').text('Public: ' + pubCount);
        if (window.__jqClerkToken) {
          $.ajax({
            url: '/api/private-notes',
            headers: { 'Authorization': 'Bearer ' + window.__jqClerkToken },
            success: function(priv) {
              var privCount = Array.isArray(priv) ? priv.length : 0;
              $('#nav-note-counts').html('<span class="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-medium">Public: ' + pubCount + '</span><span class="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">Private: ' + privCount + '</span>');
            }
          });
        }
      });
    }

    // ─── Modals ───────────────────────────────────────────────────────────────
    function closeModal() { $('#modal-container').empty(); }

    function showCreatePublicNoteModal() {
      $('#modal-container').html(
        '<div id="note-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">'
        + '<div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">'
        + '<div class="flex justify-between items-center border-b px-6 py-4"><h2 class="text-xl font-semibold text-gray-800">Create New Note</h2>'
        + '<button type="button" id="modal-close-btn" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button></div>'
        + '<form id="create-public-note-form" class="p-6 space-y-4">'
        + '<div><label class="block text-sm font-medium text-gray-700 mb-1">Title</label>'
        + '<input type="text" name="title" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter note title…" /></div>'
        + '<div><label class="block text-sm font-medium text-gray-700 mb-1">Content</label>'
        + '<textarea name="content" rows="4" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Write your note here…"></textarea></div>'
        + '<div class="flex justify-end gap-3 pt-2">'
        + '<button type="button" id="modal-cancel-btn" class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">Cancel</button>'
        + '<button type="submit" id="create-note-submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2">'
        + '<span id="create-note-spinner" class="hidden"><svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>'
        + 'Create Note</button></div>'
        + '</form></div></div>'
      );
      $('#modal-close-btn, #modal-cancel-btn').on('click', closeModal);
      $('#create-public-note-form').on('submit', function(e) {
        e.preventDefault();
        var title = $(this).find('[name=title]').val();
        var content = $(this).find('[name=content]').val();
        $('#create-note-submit').prop('disabled', true);
        $('#create-note-spinner').removeClass('hidden');
        $.ajax({
          url: '/api/public-notes',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ title: title, content: content }),
          success: function(note) {
            closeModal();
            $('#public-notes-grid').prepend(buildNoteCard(note));
            updateNavCounts();
          },
          error: function() { alert('Failed to create note.'); },
          complete: function() {
            $('#create-note-submit').prop('disabled', false);
            $('#create-note-spinner').addClass('hidden');
          }
        });
      });
    }

    function showEditNoteModal(id, title, content, isPublic) {
      $('#modal-container').html(
        '<div id="note-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">'
        + '<div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">'
        + '<div class="flex justify-between items-center border-b px-6 py-4"><h2 class="text-xl font-semibold text-gray-800">Edit Note</h2>'
        + '<button type="button" id="modal-close-btn" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button></div>'
        + '<form id="edit-note-form" class="p-6 space-y-4">'
        + '<div><label class="block text-sm font-medium text-gray-700 mb-1">Title</label>'
        + '<input type="text" name="title" value="' + escHtml(title) + '" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" /></div>'
        + '<div><label class="block text-sm font-medium text-gray-700 mb-1">Content</label>'
        + '<textarea name="content" rows="4" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none">' + escHtml(content) + '</textarea></div>'
        + '<div class="flex items-center gap-2"><input type="checkbox" name="isPublic" id="edit-is-public" ' + (isPublic === 'true' ? 'checked' : '') + ' class="w-4 h-4 text-blue-600 border-gray-300 rounded" /><label for="edit-is-public" class="text-sm text-gray-700">Make this note public</label></div>'
        + '<div class="flex justify-end gap-3 pt-2">'
        + '<button type="button" id="modal-cancel-btn" class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">Cancel</button>'
        + '<button type="submit" id="edit-note-submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">Save Changes</button>'
        + '</div></form></div></div>'
      );
      $('#modal-close-btn, #modal-cancel-btn').on('click', closeModal);
      $('#edit-note-form').on('submit', function(e) {
        e.preventDefault();
        var newTitle = $(this).find('[name=title]').val();
        var newContent = $(this).find('[name=content]').val();
        var newIsPublic = $(this).find('[name=isPublic]').is(':checked');
        $('#edit-note-submit').prop('disabled', true);
        $.ajax({
          url: '/api/public-notes/' + id,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({ title: newTitle, content: newContent, isPublic: newIsPublic }),
          success: function(note) {
            closeModal();
            $('#note-' + id).replaceWith(buildNoteCard(note));
          },
          error: function() { alert('Failed to update note.'); },
          complete: function() { $('#edit-note-submit').prop('disabled', false); }
        });
      });
    }

    function showCreatePrivateNoteModal() {
      $('#modal-container').html(
        '<div id="note-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">'
        + '<div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">'
        + '<div class="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50"><h2 class="text-xl font-semibold text-gray-800">🔒 Create Private Note</h2>'
        + '<button type="button" id="modal-close-btn" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button></div>'
        + '<form id="create-private-note-form" class="p-6 space-y-4">'
        + '<div><label class="block text-sm font-medium text-gray-700 mb-1">Title</label>'
        + '<input type="text" name="title" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Enter note title…" /></div>'
        + '<div><label class="block text-sm font-medium text-gray-700 mb-1">Content</label>'
        + '<textarea name="data" rows="4" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none resize-none" placeholder="Write your private note here…"></textarea></div>'
        + '<p class="text-sm text-gray-500 flex items-center gap-2"><span>🔒</span> This note will only be visible to you</p>'
        + '<div class="flex justify-end gap-3 pt-2">'
        + '<button type="button" id="modal-cancel-btn" class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">Cancel</button>'
        + '<button type="submit" id="create-private-submit" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium">Create Private Note</button>'
        + '</div></form></div></div>'
      );
      $('#modal-close-btn, #modal-cancel-btn').on('click', closeModal);
      $('#create-private-note-form').on('submit', function(e) {
        e.preventDefault();
        if (!window.__jqClerkToken) { alert('You must be signed in to create private notes.'); return; }
        var title = $(this).find('[name=title]').val();
        var data = $(this).find('[name=data]').val();
        $('#create-private-submit').prop('disabled', true);
        $.ajax({
          url: '/api/private-notes',
          method: 'PUT',
          contentType: 'application/json',
          headers: { 'Authorization': 'Bearer ' + window.__jqClerkToken },
          data: JSON.stringify({ title: title, data: data }),
          success: function() {
            closeModal();
            loadPrivateNotes();
          },
          error: function() { alert('Failed to create private note.'); },
          complete: function() { $('#create-private-submit').prop('disabled', false); }
        });
      });
    }

    // ─── Event delegation for note actions ───────────────────────────────────
    $(document).on('click', '.delete-note-btn, .admin-edit-btn, .edit-note-btn', function() {
      var $btn = $(this);
      if ($btn.hasClass('delete-note-btn')) {
        if (!confirm('Are you sure you want to delete this note?')) return;
        var id = $btn.data('id');
        $.ajax({
          url: '/api/public-notes/' + id,
          method: 'DELETE',
          success: function() {
            $('#note-' + id).fadeOut(200, function() { $(this).remove(); updateNavCounts(); });
          },
          error: function() { alert('Failed to delete note.'); }
        });
      } else if ($btn.hasClass('edit-note-btn') || $btn.hasClass('admin-edit-btn')) {
        showEditNoteModal($btn.data('id'), $btn.data('title'), $btn.data('content'), $btn.data('public'));
      }
    });

    $(document).on('click', '.delete-private-note-btn', function() {
      if (!confirm('Are you sure you want to delete this private note?')) return;
      var id = $(this).data('id');
      if (!window.__jqClerkToken) { alert('You must be signed in.'); return; }
      $.ajax({
        url: '/api/private-notes/' + id,
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + window.__jqClerkToken },
        success: function() {
          $('#private-note-' + id).fadeOut(200, function() { $(this).remove(); updateNavCounts(); });
        },
        error: function() { alert('Failed to delete private note.'); }
      });
    });

    $(document).on('click', '.admin-delete-btn', function() {
      if (!confirm('Are you sure you want to delete this note?')) return;
      var id = $(this).data('id');
      var adminKey = window.getAdminApiKey();
      $.ajax({
        url: '/api/notes/' + id + '/admin',
        method: 'DELETE',
        headers: { 'X-API-Key': adminKey },
        success: function() {
          $('#admin-note-row-' + id).fadeOut(200, function() { $(this).remove(); });
        },
        error: function() { alert('Failed to delete note.'); }
      });
    });

    // ─── Admin ────────────────────────────────────────────────────────────────
    function loadAdminNotes() {
      var adminKey = window.getAdminApiKey();
      if (!adminKey) return;
      var $container = $('#admin-notes-container');
      $container.html('<div class="text-center py-8 text-gray-500">Loading admin notes…</div>');
      $.ajax({
        url: '/api/notes/all',
        headers: { 'X-API-Key': adminKey },
        success: function(data) {
          if (!data || data.length === 0) {
            $container.html('<div class="text-center py-8 text-gray-500" data-testid="admin-notes-table"><div class="text-4xl mb-2">📭</div><p>No notes found in the system</p></div>');
            return;
          }
          var rows = data.map(buildAdminRow).join('');
          $container.html('<div class="overflow-x-auto rounded-lg border border-gray-200" data-testid="admin-notes-table"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-100"><tr>'
            + '<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>'
            + '<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Content Preview</th>'
            + '<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>'
            + '<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Author</th>'
            + '<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Created</th>'
            + '<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Updated</th>'
            + '<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>'
            + '</tr></thead><tbody class="bg-white divide-y divide-gray-200">' + rows + '</tbody></table></div>');
          updateNavCounts();
        },
        error: function(xhr) {
          if (xhr.status === 401) {
            localStorage.removeItem('adminApiKey');
            updateAdminNav();
          }
          $container.html('<div class="text-center py-8 text-amber-700 bg-amber-50 rounded-lg border border-amber-200"><div class="text-4xl mb-2">🔑</div><p class="font-medium">Invalid or missing admin key</p><p class="text-sm mt-1">Use Admin Login in the nav and enter your Admin API Key.</p></div>');
        }
      });
    }

    function showAdminLoginModal() {
      $('#modal-container').html(
        '<div id="admin-login-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">'
        + '<div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">'
        + '<div class="flex justify-between items-center border-b px-6 py-4 bg-amber-50"><h2 class="text-xl font-semibold text-gray-800">🔑 Admin Login</h2>'
        + '<button type="button" id="admin-modal-close" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button></div>'
        + '<form id="admin-login-form" class="p-6 space-y-4">'
        + '<div><label class="block text-sm font-medium text-gray-700 mb-1">Admin API Key</label>'
        + '<input type="password" id="admin-api-key-input" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Enter your admin API key" /></div>'
        + '<div id="admin-login-error" class="text-red-600 text-sm hidden"></div>'
        + '<div class="flex justify-end gap-3 pt-2">'
        + '<button type="button" id="admin-modal-cancel" class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">Cancel</button>'
        + '<button type="submit" class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium">Log in as Admin</button>'
        + '</div></form></div></div>'
      );
      $('#admin-modal-close, #admin-modal-cancel').on('click', closeModal);
      $('#admin-login-form').on('submit', function(e) {
        e.preventDefault();
        var key = $('#admin-api-key-input').val().trim();
        if (!key) return;
        localStorage.setItem('adminApiKey', key);
        closeModal();
        $('#admin-section').removeClass('hidden');
        updateAdminNav();
        loadAdminNotes();
        updateNavCounts();
      });
    }

    function updateAdminNav() {
      var $area = $('#admin-nav-area');
      var $label = $('#nav-notes-label');
      if (window.getAdminApiKey()) {
        if ($label.length) $label.text('All Notes');
        $area.html('<button type="button" id="admin-logout-btn" class="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded font-medium">Admin Logout</button>');
        $('#admin-logout-btn').on('click', function() {
          localStorage.removeItem('adminApiKey');
          $('#admin-section').addClass('hidden');
          updateAdminNav();
          updateNavCounts();
        });
      } else {
        if ($label.length) $label.text('My Notes');
        $area.html('<button type="button" id="admin-login-btn" class="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-medium">Admin Login</button>');
        $('#admin-login-btn').on('click', showAdminLoginModal);
      }
    }

    // ─── Admin: delete by regex ───────────────────────────────────────────────
    $(document).on('click', '#btn-delete-by-regex', function() {
      var $btn = $(this);
      var regex = $('#admin-regex-input').val().trim();
      var adminKey = window.getAdminApiKey();
      if (!regex || !adminKey) return;
      $btn.prop('disabled', true);
      $.ajax({
        url: '/api/notes/admin/delete-by-regex',
        method: 'POST',
        contentType: 'application/json',
        headers: { 'X-API-Key': adminKey },
        data: JSON.stringify({ contentRegex: regex }),
        success: function() {
          $('#admin-regex-input').val('');
          loadAdminNotes();
        },
        error: function(xhr) {
          var msg = 'Failed to delete by regex';
          try { msg = JSON.parse(xhr.responseText).error || msg; } catch(e) {}
          alert(msg);
        },
        complete: function() { $btn.prop('disabled', false); }
      });
    });

    // ─── Code expanders ───────────────────────────────────────────────────────
    $(document).on('click', '.jq-code-toggle', function() {
      var $btn = $(this);
      var panelId = $btn.attr('aria-controls');
      $('#' + panelId).slideToggle(200);
      $btn.find('.jq-chevron').toggleClass('rotated');
      $btn.attr('aria-expanded', $btn.attr('aria-expanded') === 'true' ? 'false' : 'true');
    });
    $(document).on('click', '.jq-nav-code-toggle', function() {
      var $btn = $(this);
      var panelId = $btn.attr('aria-controls');
      $('#' + panelId).slideToggle(200);
      $btn.find('.jq-chevron').toggleClass('rotated');
      $btn.attr('aria-expanded', $btn.attr('aria-expanded') === 'true' ? 'false' : 'true');
      if (window.Prism) {
        window.Prism.highlightAllUnder(document.getElementById(panelId));
      }
    });

    // ─── Versions panel ───────────────────────────────────────────────────────
    var versionsData = null;
    var versionsError = null;
    $.get('/versions')
      .done(function(d) { versionsData = d; })
      .fail(function(xhr) { versionsError = 'Failed to load versions (' + xhr.status + ')'; });

    $('#versions-btn').on('click', function() {
      var $panel = $('#versions-panel');
      $panel.toggleClass('hidden');
      if (!$panel.hasClass('hidden')) {
        if (versionsError) {
          $panel.html('<p class="text-red-600 text-sm">' + versionsError + '</p>');
        } else if (!versionsData) {
          $panel.html('<p class="text-gray-500 text-sm">Loading…</p>');
        } else {
          var d = versionsData;
          var html = '<div class="flex justify-between items-center mb-3"><span class="font-semibold text-gray-800">Versions</span><button type="button" id="versions-close" class="text-gray-500 text-lg leading-none">×</button></div>';
          html += '<dl class="text-sm">';
          html += '<div class="mb-2"><dt class="text-gray-500">App</dt><dd class="font-medium">' + (d.name||'') + ' @ ' + (d.version||'') + '</dd></div>';
          if (d.elysia) html += '<div class="mb-2"><dt class="text-gray-500">Elysia</dt><dd class="font-medium">' + d.elysia + '</dd></div>';
          if (d.commitSha) html += '<div class="mb-2"><dt class="text-gray-500">Commit</dt><dd class="font-mono text-xs break-all">' + d.commitSha + '</dd></div>';
          html += '<div class="mb-2"><dt class="text-gray-500">Environment</dt><dd>' + (d.environment||'') + '</dd></div>';
          html += '</dl>';
          $panel.html(html);
          $('#versions-close').on('click', function() { $panel.addClass('hidden'); });
        }
      }
    });

    // ─── Initialise on DOM ready ──────────────────────────────────────────────
    $(function() {
      updateAdminNav();
      loadPublicNotes();
      updateNavCounts();
      if (window.getAdminApiKey()) {
        $('#admin-section').removeClass('hidden');
        loadAdminNotes();
      }
      // Sign in prompt button wires up after Clerk loads
      $('#sign-in-prompt-btn').on('click', function() { $('#sign-in-btn').trigger('click'); });
      $('#create-public-note-btn').on('click', showCreatePublicNoteModal);
      $('#create-private-note-btn').on('click', showCreatePrivateNoteModal);
    });
  </script>

  ${
    clerkPublishableKey
      ? `<script>
    window.addEventListener('load', async function() {
      try {
        await window.Clerk.load();
        var updateAuthState = async function() {
          document.body.classList.remove('clerk-loading');
          if (window.Clerk.user) {
            document.body.classList.remove('clerk-signed-out');
            document.body.classList.add('clerk-signed-in');
            var user = window.Clerk.user;
            var nameEl = document.getElementById('user-name');
            if (nameEl) nameEl.textContent = user.firstName || (user.emailAddresses && user.emailAddresses[0] && user.emailAddresses[0].emailAddress) || 'User';
            var token = await window.Clerk.session.getToken();
            window.__jqClerkToken = token || null;
            loadPrivateNotes();
            updateNavCounts();
          } else {
            window.__jqClerkToken = null;
            document.body.classList.remove('clerk-signed-in');
            document.body.classList.add('clerk-signed-out');
            updateNavCounts();
          }
        };
        await updateAuthState();
        document.getElementById('sign-in-btn').addEventListener('click', function() {
          window.Clerk.openSignIn({ afterSignInUrl: window.location.href, afterSignUpUrl: window.location.href });
        });
        document.getElementById('sign-out-btn').addEventListener('click', async function() {
          await window.Clerk.signOut();
          window.location.reload();
        });
        window.Clerk.addListener(function() { updateAuthState(); });
      } catch(e) {
        console.error('Clerk init error:', e);
        document.body.classList.remove('clerk-loading');
        document.body.classList.add('clerk-signed-out');
      }
    });
  </script>`
      : `<script>
    $(function() {
      document.body.classList.remove('clerk-loading');
      document.body.classList.add('clerk-signed-out');
    });
  </script>`
  }
</body>
</html>`;
}

// ─── Code snippets shown in the expanders ────────────────────────────────────

const CODE_LOAD_PUBLIC = `// Load all public notes on page init
$.get('/api/public-notes', function(notes) {
  if (!notes.length) {
    $('#public-notes-grid').html('<p>No notes yet.</p>');
    return;
  }
  $('#public-notes-grid').html(notes.map(buildNoteCard).join(''));
});`;

const CODE_CREATE_PUBLIC = `// POST new public note (no auth required)
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
});`;

const CODE_EDIT_DELETE_PUBLIC = `// Edit public note — PUT with updated fields
$.ajax({
  url: '/api/public-notes/' + id,
  method: 'PUT',
  contentType: 'application/json',
  data: JSON.stringify({ title, content, isPublic: true }),
  success: function(note) {
    $('#note-' + id).replaceWith(buildNoteCard(note));
  }
});

// Delete public note
$(document).on('click', '.delete-note-btn', function() {
  $.ajax({
    url: '/api/public-notes/' + $(this).data('id'),
    method: 'DELETE',
    success: function() {
      $('#note-' + id).fadeOut(200, function() { $(this).remove(); });
    }
  });
});`;

const CODE_LOAD_PRIVATE = `// Load private notes — requires Clerk session token
var token = await window.Clerk.session.getToken();
window.__jqClerkToken = token;

$.ajax({
  url: '/api/private-notes',
  headers: { 'Authorization': 'Bearer ' + token },
  success: function(notes) {
    $('#private-notes-container').html(
      notes.map(buildPrivateNoteCard).join('')
    );
  }
});`;

const CODE_CREATE_PRIVATE = `// Create private note — PUT with auth header
// (private-notes uses PUT, not POST, per the API contract)
$.ajax({
  url: '/api/private-notes',
  method: 'PUT',
  contentType: 'application/json',
  headers: { 'Authorization': 'Bearer ' + window.__jqClerkToken },
  data: JSON.stringify({ title: title, data: content }),
  success: function() { loadPrivateNotes(); }
});

// Delete private note
$.ajax({
  url: '/api/private-notes/' + id,
  method: 'DELETE',
  headers: { 'Authorization': 'Bearer ' + window.__jqClerkToken },
  success: function() {
    $('#private-note-' + id).fadeOut(200, function() {
      $(this).remove();
    });
  }
});`;

const CODE_ADMIN = `// Admin login — store key in localStorage
$('#admin-login-form').on('submit', function(e) {
  e.preventDefault();
  localStorage.setItem('adminApiKey', $('#admin-api-key-input').val());
  loadAdminNotes();
});

// Fetch all notes as admin
$.ajax({
  url: '/api/notes/all',
  headers: { 'X-API-Key': localStorage.getItem('adminApiKey') },
  success: function(notes) {
    // Build admin table rows
    var rows = notes.map(buildAdminRow).join('');
    $('#admin-notes-container').html(buildAdminTable(rows));
  }
});

// Admin delete any note
$.ajax({
  url: '/api/notes/' + id + '/admin',
  method: 'DELETE',
  headers: { 'X-API-Key': localStorage.getItem('adminApiKey') }
});`;

// ─── Page function ────────────────────────────────────────────────────────────

export function jqueryPage(clerkPublishableKey?: string): string {
  return baseLayout(
    `
    <div class="space-y-8">

      <!-- Public Notes Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200" data-testid="section-public-notes">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Public Notes</h2>
            <p class="text-gray-600 text-sm">Visible to everyone</p>
          </div>
          <button id="create-public-note-btn"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2 font-medium">
            <span class="text-xl">+</span> Create Public Note
          </button>
        </div>
        <div id="public-notes-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="col-span-full text-center py-8 text-gray-400">Loading…</div>
        </div>
        ${codeExpander(CODE_LOAD_PUBLIC + '\n\n' + CODE_CREATE_PUBLIC + '\n\n' + CODE_EDIT_DELETE_PUBLIC, 'public-code')}
      </div>

      <!-- Your Notes (signed-in only) -->
      <div class="show-when-signed-in show-when-loaded" data-testid="section-your-notes">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">Your Notes</h2>
              <p class="text-gray-600 text-sm">Only you can see these notes</p>
            </div>
            <button id="create-private-note-btn"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2 font-medium">
              <span class="text-xl">+</span> Create Private Note
            </button>
          </div>
          <div id="private-notes-container" class="min-h-[100px]">
            <div class="text-center py-8 text-gray-500">
              <div class="animate-pulse">Loading your notes…</div>
            </div>
          </div>
        </div>
      </div>

      ${codeExpander(CODE_LOAD_PRIVATE + '\n\n' + CODE_CREATE_PRIVATE, 'private-code')}

      <!-- Sign-in prompt (signed-out only) -->
      <div class="show-when-signed-out show-when-loaded">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 text-center">
          <h2 class="text-xl font-semibold text-gray-700 mb-2">Want to create private notes?</h2>
          <p class="text-gray-600 mb-4">Sign in to create and manage your own private notes.</p>
          <button id="sign-in-prompt-btn"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Sign In to Get Started
          </button>
        </div>
      </div>

      <!-- Admin Section (hidden until logged in) -->
      <div id="admin-section" class="hidden" data-testid="section-admin-table">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">All Notes (Admin View)</h2>
              <p class="text-gray-600 text-sm">View and manage all notes in the system</p>
            </div>
          </div>
          <div class="flex items-end gap-2 mb-4">
            <input type="text" id="admin-regex-input" placeholder="e.g. e2e- or ^test"
              class="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md text-sm" />
            <button type="button" id="btn-delete-by-regex"
              class="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed">
              Delete matching notes
            </button>
          </div>
          <p class="text-gray-500 text-sm mb-4">Delete notes whose content or title matches the regex</p>
          <div id="admin-notes-container" class="min-h-[100px]">
            <div class="text-center py-8 text-gray-500">Loading admin notes…</div>
          </div>
        </div>
      </div>

      ${codeExpander(CODE_ADMIN, 'admin-code')}

    </div>
  `,
    'Elysia Notes - jQuery',
    clerkPublishableKey,
  );
}
