import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('C:/Users/sala0986/porkbunKey/private.key.pem'), // Updated to .pem
      cert: fs.readFileSync('C:/Users/sala0986/porkbunKey/domain.cert.pem'), // Updated to .pem
    },
    host: '0.0.0.0', // Allow access from the network (optional)
    port: 443, // Specify the port
  },
  
});
