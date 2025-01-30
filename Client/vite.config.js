import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Explicitly set the host to 127.0.0.1
    port: 5173,        // Ensure the port is set correctly
    hmr: {
      host: '127.0.0.1', // Use 127.0.0.1 for HMR
      port: 5173,        // Match the server port
    },
  },
});