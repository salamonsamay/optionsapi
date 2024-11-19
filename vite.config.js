import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('C:/Users/sala0986/porkbunKey/private.key.pem'),
      cert: fs.readFileSync('C:/Users/sala0986/porkbunKey/domain.cert.pem'),
    },
    hmr: {
      overlay: false  // נסה להוסיף את זה
    },
    host: '0.0.0.0',
    port: 443,
    proxy: {
      '/api': {
        target: 'https://optionsapi.dev:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
});