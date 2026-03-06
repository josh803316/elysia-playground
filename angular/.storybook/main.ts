import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@storybook/angular';

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: ['../src/app/components/**/*.stories.@(ts|mdx)'],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    '@github-ui/storybook-addon-performance-panel/universal',
  ],
  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {},
  },
};

export default config;
