/**
 * App paths and labels. Each app is served at BASE_URL + path (e.g. http://localhost:3000/react).
 */
export const APP_PATHS = [
  { name: 'react', path: '/react' },
  { name: 'vue', path: '/vue' },
  { name: 'angular', path: '/angular' },
  { name: 'svelte', path: '/svelte' },
  { name: 'vanilla-js', path: '/vanilla-js' },
  { name: 'htmx', path: '/htmx' },
] as const;

export type AppName = (typeof APP_PATHS)[number]['name'];
