import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://backend.ddev.site",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
