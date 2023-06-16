import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
      },
    }),
    VitePWA({
      workbox: {
        globPatterns: ["**/*"],
      },
      includeAssets: ["**/*"],
      manifest: {
        name: "Homelun",
        short_name: "Homelun",
        icons: [
          {
            src: "/android-chrome-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/favicon.ico",
            sizes: "32x32",
            type: "image/ico",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: ".",
      },
    }),
  ],
});
