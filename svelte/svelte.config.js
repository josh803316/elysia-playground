import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { 
		adapter: adapter({ strict: false }),
		paths: {
			// On Vercel, app will be served under /svelte
			base: process.env.VERCEL ? '/svelte' : ''
		},
		csrf: {
			trustedOrigins: ['http://localhost:6173', 'http://127.0.0.1:6173']
		},
		prerender: {
			// Don't fail build for dynamic routes we don't explicitly crawl
			handleUnseenRoutes: 'ignore'
		}
	},

	vitePlugin: {
		inspector: true
	}
};

export default config;
