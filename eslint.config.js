import josh803316SharedConfig from '@josh803316/shared-config/eslint.config.js';

const config = [
  ...josh803316SharedConfig,
  {
    // Each subpackage has its own eslint config; only lint root-level files here
    ignores: [
      'react/',
      'svelte/',
      'server/',
      'htmx/',
      'vanilla-js/',
      'angular/',
      'vue/',
      'e2e-tests/',
      'dist/',
      'tests/',
      'playwright-report/',
      'test-results/',
    ],
  },
];

export default config;
