import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' lets the build run from any folder or sub-path (GitHub Pages, Netlify, an intranet share).
export default defineConfig({
  base: './',
  plugins: [react()],
});
