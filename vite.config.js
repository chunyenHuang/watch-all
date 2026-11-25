import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Project site: https://chunyenHuang.github.io/watch-all
  base: '/watch-all/',
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
});
