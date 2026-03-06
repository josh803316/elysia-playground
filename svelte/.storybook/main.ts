import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import type {StorybookConfig} from '@storybook/sveltekit';

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: ['../src/lib/components/**/*.stories.@(svelte|ts|mdx)'],
  addons: [getAbsolutePath('@storybook/addon-docs'), '@github-ui/storybook-addon-performance-panel/universal'],
  framework: {
    name: getAbsolutePath('@storybook/sveltekit'),
    options: {},
  },
};

export default config;
