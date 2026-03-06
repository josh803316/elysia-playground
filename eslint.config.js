// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

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
  ...storybook.configs['flat/recommended'],
];

export default config;
