/**
 * App paths and labels. Each app is served at BASE_URL + path (e.g. http://localhost:3500/react).
 * supportsPrivateNoteEdit: false for apps that render private note cards without an Edit button.
 */
export const APP_PATHS = [
  { name: 'react',      path: '/react',      supportsPrivateNoteEdit: true  },
  { name: 'vue',        path: '/vue',        supportsPrivateNoteEdit: true  },
  { name: 'angular',    path: '/angular',    supportsPrivateNoteEdit: false },
  { name: 'svelte',     path: '/svelte',     supportsPrivateNoteEdit: true  },
  { name: 'vanilla-js', path: '/vanilla-js', supportsPrivateNoteEdit: false },
  { name: 'htmx',       path: '/htmx',       supportsPrivateNoteEdit: false },
] as const;

export type AppName = (typeof APP_PATHS)[number]['name'];
