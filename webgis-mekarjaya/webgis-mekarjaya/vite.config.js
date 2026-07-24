import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/webgis-mekarjaya/',
  resolve: {
    alias: {
      '@': '/src',
    }
  }
});