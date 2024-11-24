import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

const command = process.env.VITE_COMMAND || 'serve';
const mode = process.env.VITE_MODE || 'development';

export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //   key: fs.readFileSync('C:/Users/salam/porkbunKey/private.key.pem'),
    //   cert: fs.readFileSync('C:/Users/salam/porkbunKey/domain.cert.pem'),
    // },
    hmr: {
      overlay: false,
    },
    host: command === 'serve' ? 'localhost' : '0.0.0.0',
    port: command === 'serve' ? 5173 : 443,
    proxy: {
      '/api': {
        target: command === 'serve' ? 'http://localhost:8080' : 'https://optionsapi.dev:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});