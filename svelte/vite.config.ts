import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  optimizeDeps: {
    exclude: ['svelte'],
  },
  ssr: {
    noExternal: ['svelte-clerk', '@clerk/shared'],
  },
  server: {
    port: 6173,
    proxy: {
      '/versions': {
        target: 'http://localhost:3500',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:3500',
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on('error', (_err, _req, _res) => {
            // Proxy errors are expected when the API is restarting.
          })
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Ensure Authorization header is forwarded (some proxies drop it)
            const auth = req.headers?.authorization ?? req.headers?.Authorization
            if (auth) {
              proxyReq.setHeader('Authorization', auth)
            }
            // Forward X-API-Key for admin routes (e.g. /api/notes/all)
            const apiKey = req.headers?.['x-api-key'] ?? req.headers?.['X-API-Key']
            if (apiKey) {
              proxyReq.setHeader('X-API-Key', apiKey)
            }
          })
          proxy.on('proxyRes', (_proxyRes, _req, _res) => {
            // Intentionally unlogged; request forwarding is enough.
          })
        },
      },
    },
  },
})
