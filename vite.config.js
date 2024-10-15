import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: {
//       key: fs.readFileSync('C:/Users/salam/porkbunKey/private.key.pem'), // Updated to .pem
//       cert: fs.readFileSync('C:/Users/salam/porkbunKey/domain.cert.pem'), // Updated to .pem
//     },
//     host: '0.0.0.0', // Allow access from the network (optional)
//     port: 5173, // Specify the port
//   },
  
// });

// vite.config.js


export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // This allows access from your local network (e.g., 192.168.x.x)
    port: 5173,  // Default Vite port
  },
});


