import josh803316SharedConfig from '@josh803316/shared-config/eslint.config.js';
import drizzle from 'eslint-plugin-drizzle';

// the Drizzle ESLint plugin is a bit dumb, it doesn't understand types,
// so you have to tell it the variable names you're going to use for it
const drizzleObjectName = ['db', 'tx'];

const config = [
  ...josh803316SharedConfig, // Spread the shared config into the main array
  {
    plugins: {
      drizzle,
    },
    rules: {
      ...drizzle.configs.recommended.rules,
      'drizzle/enforce-delete-with-where': ['error', {drizzleObjectName}],
      'drizzle/enforce-update-with-where': ['error', {drizzleObjectName}],
    },
  },
  {
    ignores: [
      'dist/',
      'tests/', // the Bun test framework seems woefully undertyped
      'playwright-report/',
      'test-results/',
    ], // Explicitly ignore this file
  },
]; // Main configuration is an array

export default config;
