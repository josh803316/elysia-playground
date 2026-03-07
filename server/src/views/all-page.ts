import {FRAMEWORK_SNIPPETS} from '../data/code-snippets.js';

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function renderAllPage(): string {
  const snippetsJson = JSON.stringify(
    FRAMEWORK_SNIPPETS.map((f) => ({id: f.id, name: f.name, admin: f.admin, public: f.public, private: f.private})),
  );

  const frameworkCheckboxes = FRAMEWORK_SNIPPETS.map(
    (f) => `
        <label class="fw-check" data-fw="${f.id}">
          <input type="checkbox" value="${f.id}" />
          <span class="fw-label">${escapeHtml(f.name)}</span>
          <span class="fw-badge">${escapeHtml(f.badge)}</span>
        </label>`,
  ).join('\n');

  const iframeSections = FRAMEWORK_SNIPPETS.map(
    (f) => `
      <section class="iframe-section">
        <div class="iframe-header">
          <div class="iframe-title">
            <span class="iframe-name">${escapeHtml(f.name)}</span>
            <span class="fw-badge">${escapeHtml(f.badge)}</span>
          </div>
          <a href="${f.path}" class="open-link" target="_blank">Open in new tab <span class="arrow">&#8599;</span></a>
        </div>
        <iframe src="${f.path}" title="${escapeHtml(f.name)} demo" loading="lazy" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"></iframe>
      </section>`,
  ).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>All Frameworks – Elysia Playground</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
  <style>
    :root {
      color-scheme: dark;
      --bg: #050816;
      --bg-alt: #0b1020;
      --card: #111827;
      --accent: #38bdf8;
      --accent-soft: rgba(56,189,248,0.12);
      --text: #e5e7eb;
      --muted: #9ca3af;
      --border: rgba(148,163,184,0.35);
      --shadow: 0 18px 45px rgba(15,23,42,0.9);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
      background: radial-gradient(circle at top, #1e293b 0, #020617 45%, #000 100%);
      color: var(--text);
      padding: 0;
    }

    /* Header */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 32px;
      border-bottom: 1px solid var(--border);
      background: rgba(5,8,22,0.85);
      backdrop-filter: blur(12px);
    }
    .page-header h1 { font-size: 1.4rem; letter-spacing: -0.03em; }
    .home-link {
      color: var(--accent);
      text-decoration: none;
      font-size: 0.88rem;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 999px;
      border: 1px solid rgba(56,189,248,0.4);
      background: rgba(56,189,248,0.08);
      transition: background 0.15s, border-color 0.15s;
    }
    .home-link:hover {
      background: rgba(56,189,248,0.16);
      border-color: rgba(56,189,248,0.7);
    }

    /* Controls bar */
    .controls {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(5,8,22,0.92);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border);
      padding: 14px 32px;
    }
    .controls-row {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .fw-checks {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      flex: 1;
    }
    .fw-check {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(15,23,42,0.85);
      cursor: pointer;
      font-size: 0.82rem;
      transition: border-color 0.15s, background 0.15s;
      user-select: none;
    }
    .fw-check:hover { border-color: rgba(148,163,184,0.6); }
    .fw-check.checked {
      border-color: var(--accent);
      background: rgba(56,189,248,0.12);
    }
    .fw-check.disabled-check {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .fw-check input { accent-color: var(--accent); cursor: inherit; }
    .fw-label { color: var(--text); font-weight: 500; }
    .fw-badge {
      display: inline-flex;
      padding: 1px 7px;
      border-radius: 999px;
      border: 1px solid rgba(148,163,184,0.45);
      font-size: 0.68rem;
      color: var(--muted);
      background: rgba(15,23,42,0.9);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    /* Compare button */
    .compare-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border-radius: 999px;
      border: 1px solid rgba(148,163,184,0.3);
      background: rgba(15,23,42,0.8);
      color: var(--muted);
      font-size: 0.86rem;
      font-weight: 500;
      cursor: not-allowed;
      opacity: 0.5;
      transition: all 0.2s;
    }
    .compare-btn.active {
      cursor: pointer;
      opacity: 1;
      border-color: rgba(56,189,248,0.8);
      background: radial-gradient(circle at top left, rgba(56,189,248,0.2), rgba(8,47,73,0.95));
      color: #e0f2fe;
      box-shadow: 0 10px 35px rgba(8,47,73,0.9);
    }
    .compare-btn.active:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 40px rgba(8,47,73,0.95);
      border-color: rgba(56,189,248,1);
    }

    /* Iframe sections */
    .iframes-container {
      padding: 24px 32px 48px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .iframe-section {
      border-radius: 18px;
      border: 1px solid var(--border);
      background: rgba(17,24,39,0.6);
      overflow: hidden;
    }
    .iframe-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 18px;
      border-bottom: 1px solid var(--border);
      background: rgba(15,23,42,0.7);
    }
    .iframe-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .iframe-name { font-weight: 600; font-size: 1rem; }
    .open-link {
      color: var(--accent);
      text-decoration: none;
      font-size: 0.8rem;
      opacity: 0.7;
      transition: opacity 0.15s;
    }
    .open-link:hover { opacity: 1; }
    .arrow { font-size: 0.9em; }
    iframe {
      width: 100%;
      height: 600px;
      border: none;
      background: #fff;
    }

    /* Modal overlay */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(0,0,0,0.8);
      backdrop-filter: blur(6px);
      align-items: center;
      justify-content: center;
      padding: 32px;
    }
    .modal-overlay.open { display: flex; }

    .modal {
      width: 100%;
      max-width: 1200px;
      max-height: 90vh;
      border-radius: 20px;
      border: 1px solid var(--border);
      background: radial-gradient(circle at top left, #0b1120, #020617);
      box-shadow: 0 40px 80px rgba(0,0,0,0.6);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 24px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }
    .modal-header h2 { font-size: 1.2rem; letter-spacing: -0.02em; }
    .close-btn {
      width: 36px;
      height: 36px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(15,23,42,0.8);
      color: var(--muted);
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
    }
    .close-btn:hover { background: rgba(248,113,113,0.15); color: #fca5a5; border-color: rgba(248,113,113,0.4); }

    /* Area tabs */
    .area-tabs {
      display: flex;
      gap: 4px;
      padding: 12px 24px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }
    .area-tab {
      padding: 7px 16px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(15,23,42,0.6);
      color: var(--muted);
      font-size: 0.82rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }
    .area-tab:hover { border-color: rgba(148,163,184,0.6); color: var(--text); }
    .area-tab.active {
      border-color: var(--accent);
      background: rgba(56,189,248,0.12);
      color: var(--accent);
    }

    /* Code panels */
    .code-panels {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1px;
      background: var(--border);
      flex: 1;
      overflow: hidden;
      min-height: 0;
    }
    .code-panel {
      background: #0b1120;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .code-panel-header {
      padding: 12px 18px;
      border-bottom: 1px solid var(--border);
      font-weight: 600;
      font-size: 0.92rem;
      color: var(--accent);
      background: rgba(15,23,42,0.5);
      flex-shrink: 0;
    }
    .code-panel-body {
      flex: 1;
      overflow: auto;
      padding: 16px 18px;
    }
    .code-panel-body pre {
      margin: 0;
      font-size: 0.78rem;
      line-height: 1.6;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .code-panel-body code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    }

    @media (max-width: 768px) {
      .page-header, .controls, .iframes-container { padding-left: 16px; padding-right: 16px; }
      .code-panels { grid-template-columns: 1fr; }
      .modal { max-width: 100%; }
      .fw-checks { gap: 6px; }
      iframe { height: 450px; }
    }
  </style>
</head>
<body>
  <div class="page-header">
    <h1>All Frameworks</h1>
    <a href="/" class="home-link">&#8592; Home</a>
  </div>

  <div class="controls">
    <div class="controls-row">
      <div class="fw-checks">
        ${frameworkCheckboxes}
      </div>
      <button class="compare-btn" id="compare-btn" disabled>
        <span style="font-family:monospace;color:inherit;">&lt;/&gt;</span>
        Compare Code
      </button>
    </div>
  </div>

  <div class="iframes-container">
    ${iframeSections}
  </div>

  <!-- Comparison modal -->
  <div class="modal-overlay" id="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h2 id="modal-title">Code Comparison</h2>
        <button class="close-btn" id="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="area-tabs" id="area-tabs">
        <button class="area-tab active" data-area="admin">Admin</button>
        <button class="area-tab" data-area="public">Public</button>
        <button class="area-tab" data-area="private">Private</button>
      </div>
      <div class="code-panels">
        <div class="code-panel">
          <div class="code-panel-header" id="panel-left-name"></div>
          <div class="code-panel-body" id="panel-left-code"></div>
        </div>
        <div class="code-panel">
          <div class="code-panel-header" id="panel-right-name"></div>
          <div class="code-panel-body" id="panel-right-code"></div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markup.min.js"><\/script>
  <script>
    (function() {
      var SNIPPETS = ${snippetsJson};
      var selected = [];
      var currentArea = 'admin';

      var checkboxLabels = document.querySelectorAll('.fw-check');
      var compareBtn = document.getElementById('compare-btn');
      var overlay = document.getElementById('modal-overlay');
      var closeBtn = document.getElementById('modal-close');
      var areaTabs = document.querySelectorAll('.area-tab');
      var panelLeftName = document.getElementById('panel-left-name');
      var panelRightName = document.getElementById('panel-right-name');
      var panelLeftCode = document.getElementById('panel-left-code');
      var panelRightCode = document.getElementById('panel-right-code');

      function updateCheckboxes() {
        checkboxLabels.forEach(function(label) {
          var input = label.querySelector('input');
          var fwId = input.value;
          var isChecked = selected.indexOf(fwId) !== -1;

          input.checked = isChecked;
          label.classList.toggle('checked', isChecked);

          if (selected.length >= 2 && !isChecked) {
            label.classList.add('disabled-check');
            input.disabled = true;
          } else {
            label.classList.remove('disabled-check');
            input.disabled = false;
          }
        });

        if (selected.length === 2) {
          compareBtn.classList.add('active');
          compareBtn.disabled = false;
        } else {
          compareBtn.classList.remove('active');
          compareBtn.disabled = true;
        }
      }

      checkboxLabels.forEach(function(label) {
        var input = label.querySelector('input');
        input.addEventListener('change', function() {
          var fwId = input.value;
          if (input.checked) {
            if (selected.length < 2) selected.push(fwId);
          } else {
            selected = selected.filter(function(id) { return id !== fwId; });
          }
          updateCheckboxes();
        });
      });

      function getSnippet(fwId) {
        for (var i = 0; i < SNIPPETS.length; i++) {
          if (SNIPPETS[i].id === fwId) return SNIPPETS[i];
        }
        return null;
      }

      function escapeForHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      function renderComparison() {
        if (selected.length !== 2) return;
        var left = getSnippet(selected[0]);
        var right = getSnippet(selected[1]);
        if (!left || !right) return;

        panelLeftName.textContent = left.name;
        panelRightName.textContent = right.name;

        var leftCode = left[currentArea] || '';
        var rightCode = right[currentArea] || '';

        panelLeftCode.innerHTML = '<pre><code class="language-javascript">' + escapeForHtml(leftCode) + '</code></pre>';
        panelRightCode.innerHTML = '<pre><code class="language-javascript">' + escapeForHtml(rightCode) + '</code></pre>';

        if (window.Prism) {
          window.Prism.highlightAllUnder(panelLeftCode);
          window.Prism.highlightAllUnder(panelRightCode);
        }
      }

      function openModal() {
        if (selected.length !== 2) return;
        renderComparison();
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      function closeModal() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }

      compareBtn.addEventListener('click', openModal);
      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
      });

      areaTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
          currentArea = tab.getAttribute('data-area');
          areaTabs.forEach(function(t) { t.classList.remove('active'); });
          tab.classList.add('active');
          renderComparison();
        });
      });
    })();
  <\/script>
</body>
</html>`;
}
