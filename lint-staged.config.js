// Monorepo root: each workspace package has its own ESLint config.
// Only run ESLint on files that live at the repo root level.
const workspaceDirs = ['react', 'server', 'svelte', 'htmx', 'vanilla-js', 'angular', 'vue', 'e2e-tests'];
const inWorkspace = (file) => workspaceDirs.some((dir) => file.includes(`/${dir}/`));

export default {
  '*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}': (files) => {
    const rootFiles = files.filter((f) => !inWorkspace(f));
    return [...(rootFiles.length ? [`eslint --fix ${rootFiles.join(' ')}`] : []), `prettier -wu ${files.join(' ')}`];
  },
  '*.{json,md,yaml,yml,css,html}': ['prettier -wu'],
};
