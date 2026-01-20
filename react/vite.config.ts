import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Add gzip/brotli compression for all assets
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    // Add bundle analyzer (generates stats.html in project root when building)
    visualizer({
      open: true, // Set to true to open stats.html automatically after build
      gzipSize: true,
      brotliSize: true,
      filename: "stats.html",
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
    port: 5173,
  },
  build: {
    // Optimize chunk size
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    // Better code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "mantine-core": ["@mantine/core", "@mantine/hooks"],
          clerk: ["@clerk/clerk-react"],
          "tabler-icons": ["@tabler/icons-react"],
        },
      },
    },
    // Optimize minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Generate smaller source maps
    sourcemap: "hidden",
  },
  optimizeDeps: {
    // Preload critical dependencies
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@mantine/core",
      "@mantine/hooks",
    ],
    // Improve dependency scanning
    esbuildOptions: {
      target: "es2020",
    },
  },
});
