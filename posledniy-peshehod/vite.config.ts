import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — все ассеты подключаются относительными путями.
// Это позволяет работать и на GitHub Pages (project pages вида /repo/),
// и локально (npm run preview), без жёсткой привязки к имени репозитория.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
