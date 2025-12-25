import { defineConfig } from 'vite';

export default defineConfig({
  base: '/universal-app-opener/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});
