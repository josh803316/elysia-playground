import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ["svelte"]
  },
  ssr: {
    noExternal: ["svelte-clerk"]
  },
  server: {
    port: 6173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Proxying:", req.method, req.url);
            // Ensure Authorization header is forwarded (some proxies drop it)
            const auth = req.headers?.authorization ?? req.headers?.Authorization;
            if (auth) {
              proxyReq.setHeader("Authorization", auth);
            }
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Proxied response:",
              req.method,
              req.url,
              proxyRes.statusCode
            );
          });
        },
      },
    },
  },
});
