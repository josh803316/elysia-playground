import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// Vercel git builds set VERCEL=1. GHA production (`bun run build`) does not,
// but the artifact is still served under /svelte/.
const servedAtSveltePrefix = Boolean(process.env.VERCEL || process.env.GITHUB_ACTIONS)

const config = {
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: true,
  },
  kit: {
    adapter: adapter({ strict: false }),
    paths: {
      base: servedAtSveltePrefix ? '/svelte' : '',
    },
    csrf: {
      trustedOrigins: ['http://localhost:6173', 'http://127.0.0.1:6173'],
    },
    prerender: {
      // Don't fail build for dynamic routes we don't explicitly crawl
      handleUnseenRoutes: 'ignore',
      // Ignore unreachable API routes, but never silently skip `/` — that is
      // svelte/build/index.html, which serveSPA needs or it shows a placeholder.
      handleHttpError: ({ path, message, status }) => {
        const indexPaths = servedAtSveltePrefix ? ['/svelte', '/svelte/'] : ['/']
        if (indexPaths.includes(path) && status >= 500) {
          throw new Error(`Svelte prerender of ${path} failed (${status}): ${message}`)
        }
      },
    },
  },

  vitePlugin: {
    inspector: true,
  },
}

export default config
