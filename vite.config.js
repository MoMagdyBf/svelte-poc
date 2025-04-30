import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
    visualizer({
      filename: "stats.html", // Output file
      open: true, // Open in browser after build
    }),
  ],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ["lottie-web"],
    force: true,
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        pure_funcs: ["console.log", "console.info"],
      },
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          lottie: ["lottie-web"],
          vendor: ["svelte"],
        },
      },
    },
    chunkSizeWarningLimit: 300,
  },
});
