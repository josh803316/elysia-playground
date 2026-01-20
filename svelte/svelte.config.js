import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { 
		adapter: adapter(),
		paths: {
			base: ''
		},
		csrf: {
			trustedOrigins: ['http://localhost:6173', 'http://127.0.0.1:6173']
		}
	},

	vitePlugin: {
		inspector: true
	}
};

export default config;
