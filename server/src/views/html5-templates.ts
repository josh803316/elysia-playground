/**
 * HTML5 Showcase — served at GET /html5/
 *
 * Demonstrates 9 native HTML5 features that replace common JavaScript patterns.
 * Each demo is interactive with a collapsible code expander showing the markup.
 * Uses the same Tailwind + layout conventions as the jQuery showcase page.
 */

function escapeCode(code: string): string {
  return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function codeExpander(code: string, id: string): string {
  return `
  <div class="border-t border-gray-100 mt-4">
    <button
      type="button"
      class="html5-code-toggle w-full flex items-center gap-1.5 px-0 py-2.5 text-xs font-mono text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-left"
      aria-controls="${id}-panel"
      aria-expanded="false"
    >
      <span class="text-gray-300">&lt;/&gt;</span> HTML5 code
      <span class="html5-chevron ml-1 inline-block transition-transform duration-200">&#9660;</span>
    </button>
    <div id="${id}-panel" class="html5-code-panel" style="display:none">
      <pre class="language-markup rounded-lg text-xs overflow-x-auto m-0"><code class="language-markup">${escapeCode(code)}</code></pre>
    </div>
  </div>`;
}

function demoSection(
  num: number,
  title: string,
  why: string,
  demoHtml: string,
  codeStr: string,
  codeId: string,
): string {
  return `
    <section class="bg-white rounded-lg shadow-md overflow-hidden" data-testid="demo-${codeId}">
      <div class="p-6">
        <div class="flex items-start gap-3 mb-1">
          <span class="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">${num}</span>
          <h3 class="text-lg font-semibold text-gray-800">${title}</h3>
        </div>
        <p class="text-sm text-gray-500 mb-4 ml-10">${why}</p>
        <div class="bg-orange-50 border border-orange-100 rounded-lg p-5 mb-1">
          ${demoHtml}
        </div>
        ${codeExpander(codeStr, codeId)}
      </div>
    </section>`;
}

export function html5Page(): string {
  const demos = [
    demoSection(
      1,
      'Dialog &mdash; Native Modal System',
      'Built-in backdrop, escape-to-close, focus trapping, and screen reader support. No modal library needed.',
      `<button onclick="document.getElementById('confirmDialog').showModal()" class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors">
          Open Modal
        </button>
        <dialog id="confirmDialog" class="rounded-xl shadow-xl p-6 max-w-sm backdrop:bg-black/40">
          <p class="font-semibold text-gray-800 mb-1">Delete this record?</p>
          <p class="text-sm text-gray-500 mb-4">This action cannot be undone.</p>
          <div class="flex gap-2">
            <button onclick="document.getElementById('confirmDialog').close()" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
            <button onclick="document.getElementById('confirmDialog').close(); document.getElementById('dialog-result').textContent='Deleted!'" class="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">Confirm</button>
          </div>
        </dialog>
        <span id="dialog-result" class="ml-3 text-sm text-orange-600 font-semibold"></span>`,
      `<dialog id="confirmDialog">
  <p>Are you sure you want to delete this record?</p>
  <button onclick="confirmDialog.close()">Cancel</button>
  <button onclick="submitDelete()">Confirm</button>
</dialog>

<button onclick="confirmDialog.showModal()">Delete</button>

<!-- Built-in: backdrop, escape key, focus trap, ARIA -->`,
      'dialog',
    ),

    demoSection(
      2,
      'Form Validation &mdash; No JS Required',
      'Native constraint validation with type, min, max, minlength, pattern, and required attributes.',
      `<form onsubmit="event.preventDefault(); document.getElementById('form-result').textContent='Valid! Form submitted.'" class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Age (1&ndash;100)</label>
            <input type="number" min="1" max="100" required placeholder="Enter your age" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password (min 8 chars)</label>
            <input type="password" minlength="8" required placeholder="Enter password" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required placeholder="you@example.com" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div class="flex items-center gap-3">
            <button type="submit" class="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors">Submit</button>
            <span id="form-result" class="text-sm text-orange-600 font-semibold"></span>
          </div>
        </form>`,
      `<form>
  <input type="number" min="1" max="100" required />
  <input type="password" minlength="8" required />
  <input type="email" required />
  <button type="submit">Submit</button>
</form>

<!-- Browser validates automatically — no JS needed -->
<!-- Mobile keyboards adapt to input type -->`,
      'validation',
    ),

    demoSection(
      3,
      'Details &amp; Summary &mdash; Toggle UI',
      'Click-to-toggle, keyboard accessible, no state management, no CSS hacks.',
      `<details class="border border-gray-200 rounded-lg overflow-hidden">
          <summary class="px-4 py-3 font-semibold text-sm cursor-pointer bg-white hover:bg-gray-50 select-none">Advanced Filters</summary>
          <div class="px-4 py-3 space-y-2 border-t border-gray-100 bg-white">
            <label class="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" class="accent-orange-500" /> Show archived notes</label>
            <label class="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" class="accent-orange-500" /> Include shared notes</label>
            <label class="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" class="accent-orange-500" /> Sort by date modified</label>
          </div>
        </details>`,
      `<details>
  <summary>Advanced Filters</summary>
  <label>
    <input type="checkbox" /> Show archived
  </label>
</details>

<!-- Interactive toggle with zero JavaScript -->`,
      'details',
    ),

    demoSection(
      4,
      'Native Date &amp; Time Inputs',
      'Mobile-optimized pickers, native validation, zero dependencies. Replaced a 300KB date picker library.',
      `<div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Pick a date and time:</label>
            <input type="datetime-local" required class="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full max-w-xs focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div class="flex gap-4 flex-wrap">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date only:</label>
              <input type="date" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Time only:</label>
              <input type="time" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Month:</label>
              <input type="month" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
            </div>
          </div>
        </div>`,
      `<input type="datetime-local" required />
<input type="date" />
<input type="time" />
<input type="month" />

<!-- Mobile-optimized, native validation, zero deps -->`,
      'datetime',
    ),

    demoSection(
      5,
      'Autocomplete &mdash; Browser Memory',
      'Browsers remember user data. Forms fill themselves. Let the browser do the memory for you.',
      `<form onsubmit="event.preventDefault();" class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">City (with datalist suggestions):</label>
            <input type="text" list="cities" name="city" autocomplete="address-level2" placeholder="Start typing a city..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
            <datalist id="cities">
              <option value="New York">
              <option value="San Francisco">
              <option value="Los Angeles">
              <option value="Chicago">
              <option value="Austin">
              <option value="Seattle">
              <option value="Boston">
              <option value="Denver">
              <option value="Miami">
              <option value="Portland">
            </datalist>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full name:</label>
            <input type="text" name="name" autocomplete="name" placeholder="Your full name" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input type="email" name="email" autocomplete="email" placeholder="you@example.com" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
          </div>
        </form>`,
      `<input type="text" name="city" autocomplete="address-level2"
       list="cities" />

<datalist id="cities">
  <option value="New York">
  <option value="San Francisco">
  <option value="Los Angeles">
</datalist>

<!-- Browser remembers user data across sessions -->`,
      'autocomplete',
    ),

    demoSection(
      6,
      'Template &mdash; Dynamic Content Without Frameworks',
      'Clean DOM insertion, no string-based HTML injection, reusable structure, zero framework overhead.',
      `<button onclick="addTemplateCard()" class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors mb-3">
          Add Status Card
        </button>
        <template id="cardTemplate">
          <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 class="font-semibold text-gray-800 text-sm"></h4>
            <p class="text-xs text-gray-500 mt-1"></p>
          </div>
        </template>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3" id="template-output"></div>`,
      `<template id="cardTemplate">
  <article class="card">
    <h3></h3>
    <p></p>
  </article>
</template>

<script>
const template = document.getElementById("cardTemplate");
const clone = template.content.cloneNode(true);
clone.querySelector("h3").textContent = "Server Status";
clone.querySelector("p").textContent = "All systems operational.";
document.body.appendChild(clone);
</script>`,
      'template',
    ),

    demoSection(
      7,
      'Drag &amp; Drop &mdash; No Libraries',
      'Native browser drag events. No dependency weight. Fully customizable.',
      `<p class="text-sm text-gray-500 mb-2">Drag tasks into the drop zone:</p>
        <div class="flex gap-2 flex-wrap mb-3" id="drag-source">
          <div class="drag-item px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium cursor-grab select-none shadow-sm hover:shadow" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', this.textContent)">Design review</div>
          <div class="drag-item px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium cursor-grab select-none shadow-sm hover:shadow" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', this.textContent)">Code cleanup</div>
          <div class="drag-item px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium cursor-grab select-none shadow-sm hover:shadow" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', this.textContent)">Write tests</div>
          <div class="drag-item px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium cursor-grab select-none shadow-sm hover:shadow" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', this.textContent)">Deploy v2</div>
        </div>
        <div id="drop-target" class="min-h-[60px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-sm text-gray-400 p-3 gap-2 flex-wrap transition-colors"
          ondrop="handleDrop(event)"
          ondragover="event.preventDefault(); this.classList.add('border-orange-400','bg-orange-50')"
          ondragleave="this.classList.remove('border-orange-400','bg-orange-50')">
          Drop tasks here
        </div>`,
      `<div draggable="true"
     ondragstart="event.dataTransfer.setData('text', this.id)"
     id="task1">
  Task A
</div>

<div ondrop="dropHandler(event)"
     ondragover="event.preventDefault()">
  Drop zone
</div>

<!-- Native browser events, no library needed -->`,
      'dragdrop',
    ),

    demoSection(
      8,
      'Progress &mdash; Visual Feedback',
      'Instant visual trust. No CSS trickery. No canvas animations. Just a semantic element.',
      `<div class="flex items-center gap-3 mb-3">
          <button onclick="simulateProgress()" class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors flex-shrink-0">
            Start Job
          </button>
          <span id="progress-label" class="text-sm text-gray-500">0%</span>
        </div>
        <progress id="jobProgress" value="0" max="100" class="w-full h-3 rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-orange-500 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:transition-all"></progress>
        <div class="mt-3">
          <label class="text-sm text-gray-500">Upload progress (indeterminate):</label>
          <progress class="w-full h-3 mt-1 rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-bar]:rounded-full"></progress>
        </div>`,
      `<progress id="jobProgress" value="30" max="100"></progress>

<script>
// Update dynamically
document.getElementById("jobProgress").value = 75;
</script>

<!-- Indeterminate (no value attr): -->
<progress></progress>`,
      'progress',
    ),

    demoSection(
      9,
      'Semantic HTML &mdash; Free Accessibility',
      'Screen readers behave, keyboard navigation works, focus order makes sense, ARIA becomes optional.',
      `<p class="text-sm text-gray-500 mb-3">Try navigating this with Tab key &mdash; focus order is automatic:</p>
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <nav aria-label="Demo navigation" class="bg-white">
            <ul class="flex list-none m-0 p-0">
              <li><a href="javascript:void(0)" class="block px-4 py-3 text-sm font-medium text-orange-600 hover:bg-orange-50 transition-colors focus:outline-2 focus:outline-orange-500 focus:-outline-offset-2">Dashboard</a></li>
              <li><a href="javascript:void(0)" class="block px-4 py-3 text-sm font-medium text-orange-600 hover:bg-orange-50 transition-colors focus:outline-2 focus:outline-orange-500 focus:-outline-offset-2">Settings</a></li>
              <li><a href="javascript:void(0)" class="block px-4 py-3 text-sm font-medium text-orange-600 hover:bg-orange-50 transition-colors focus:outline-2 focus:outline-orange-500 focus:-outline-offset-2">Profile</a></li>
              <li><a href="javascript:void(0)" class="block px-4 py-3 text-sm font-medium text-orange-600 hover:bg-orange-50 transition-colors focus:outline-2 focus:outline-orange-500 focus:-outline-offset-2">Help</a></li>
            </ul>
          </nav>
        </div>
        <p class="text-xs text-gray-400 mt-3 italic">Pro tip: The more ARIA you write, the more likely your base HTML is wrong.</p>`,
      `<nav>
  <ul>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/settings">Settings</a></li>
  </ul>
</nav>

<!-- No div soup. No accessibility retrofitting. -->
<!-- Screen readers, keyboard nav, focus order: all free. -->`,
      'semantic',
    ),
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elysia Notes - HTML5</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markup.min.js"><\/script>
  <style>
    .html5-chevron.rotated { transform: rotate(180deg); }
    pre[class*="language-"] { margin: 0; border-radius: 0.5rem; font-size: 0.8rem; }
    dialog::backdrop { background: rgba(0,0,0,0.4); }
  </style>
</head>
<body class="bg-gray-100 min-h-screen">
  <nav class="bg-white border-b border-gray-200 shadow-sm h-[60px] flex items-center">
    <div class="max-w-[1320px] w-full mx-auto px-4">
      <div class="flex justify-between items-center">
        <a href="/html5/" class="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors">
          Elysia Notes - HTML5
        </a>
        <div class="flex gap-4 items-center">
          <a href="/html5/" class="text-sm text-gray-700 hover:text-gray-900 font-medium">Home</a>
          <span class="text-xs px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-medium">9 Demos</span>
          <a href="/" class="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            &larr; Playground Home
          </a>
        </div>
      </div>
    </div>
  </nav>

  <main class="max-w-[1320px] mx-auto px-4 py-8">
    <!-- Hero -->
    <section class="text-center mb-8 py-8 px-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100" data-testid="hero">
      <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">9 <span class="text-orange-500">HTML5</span> Features That Replace JavaScript</h2>
      <p class="text-gray-500 max-w-xl mx-auto">Interactive demos of native HTML5 capabilities that eliminate common libraries and custom code.</p>
    </section>

    <!-- Demos grid -->
    <div class="space-y-6" data-testid="demos-container">
      ${demos.join('\n')}
    </div>
  </main>

  <footer class="bg-gray-800 text-gray-400 py-6 mt-12 relative">
    <div id="versions-panel" class="hidden absolute bottom-full right-4 mb-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-left text-sm max-w-sm max-h-[70vh] overflow-auto z-50 text-gray-800" style="width:360px"></div>
    <div class="max-w-[1320px] mx-auto px-4 flex justify-between items-center">
      <span class="text-sm">&copy; 2024 Notes App</span>
      <div class="flex gap-4 text-sm items-center">
        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-white transition-colors">Contact Us</a>
        <button type="button" id="versions-btn" class="bg-transparent border-none text-gray-400 hover:text-white transition-colors cursor-pointer p-0 text-sm">Versions</button>
      </div>
    </div>
  </footer>

  <script>
    // ── Code expander toggle ──────────────────────────────────────────────────
    document.querySelectorAll('.html5-code-toggle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var panelId = btn.getAttribute('aria-controls');
        var panel = document.getElementById(panelId);
        var chevron = btn.querySelector('.html5-chevron');
        var isOpen = panel.style.display !== 'none';
        panel.style.display = isOpen ? 'none' : 'block';
        chevron.classList.toggle('rotated', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
        if (!isOpen && window.Prism) {
          window.Prism.highlightAllUnder(panel);
        }
      });
    });

    // ── Template demo ─────────────────────────────────────────────────────────
    var statusMessages = [
      ['Server Status', 'All systems operational.'],
      ['Database', 'Connected \\u2014 12ms latency'],
      ['Cache', 'Hit rate: 97.3%'],
      ['Queue', '42 jobs pending'],
      ['API', 'Avg response: 28ms'],
      ['Storage', '68% capacity used'],
    ];
    var templateIndex = 0;
    function addTemplateCard() {
      var template = document.getElementById('cardTemplate');
      var clone = template.content.cloneNode(true);
      var data = statusMessages[templateIndex % statusMessages.length];
      clone.querySelector('h4').textContent = data[0];
      clone.querySelector('p').textContent = data[1];
      document.getElementById('template-output').appendChild(clone);
      templateIndex++;
    }

    // ── Drag and drop ─────────────────────────────────────────────────────────
    function handleDrop(event) {
      event.preventDefault();
      event.currentTarget.classList.remove('border-orange-400', 'bg-orange-50');
      var text = event.dataTransfer.getData('text/plain');
      if (!text) return;
      var badge = document.createElement('span');
      badge.className = 'px-3 py-1.5 bg-orange-100 text-orange-800 rounded-lg text-xs font-medium';
      badge.textContent = text;
      event.currentTarget.appendChild(badge);
    }

    // ── Progress simulation ───────────────────────────────────────────────────
    function simulateProgress() {
      var bar = document.getElementById('jobProgress');
      var label = document.getElementById('progress-label');
      bar.value = 0;
      label.textContent = '0%';
      var interval = setInterval(function() {
        bar.value += Math.random() * 15;
        if (bar.value >= 100) {
          bar.value = 100;
          label.textContent = '100% \\u2014 Done!';
          clearInterval(interval);
        } else {
          label.textContent = Math.round(bar.value) + '%';
        }
      }, 200);
    }

    // ── Versions panel (same pattern as jQuery page) ──────────────────────────
    (function() {
      var btn = document.getElementById('versions-btn');
      var panel = document.getElementById('versions-panel');
      if (!btn || !panel) return;
      btn.addEventListener('click', function() {
        var isOpen = !panel.classList.contains('hidden');
        if (isOpen) {
          panel.classList.add('hidden');
          return;
        }
        panel.innerHTML = '<p class="text-gray-400 text-xs">Loading...</p>';
        panel.classList.remove('hidden');
        fetch('/api/versions')
          .then(function(r) { return r.json(); })
          .then(function(data) {
            var html = '<h3 class="font-bold text-gray-800 mb-2">Dependency Versions</h3><dl class="space-y-1">';
            if (data && typeof data === 'object') {
              Object.keys(data).forEach(function(key) {
                html += '<div class="flex justify-between text-xs"><dt class="text-gray-600">' + key + '</dt><dd class="font-mono text-gray-800">' + data[key] + '</dd></div>';
              });
            }
            html += '</dl>';
            panel.innerHTML = html;
          })
          .catch(function() {
            panel.innerHTML = '<p class="text-red-500 text-xs">Failed to load versions.</p>';
          });
      });
    })();
  <\/script>
</body>
</html>`;
}
