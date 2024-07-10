import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // desired port number for vite development server
    port: 8000,
    proxy: {
      // proxy '/api' requests to the backend server
      '/api': {
        /**
         * Express server URL
         * NB* '/api' at the end is CRUCIAL for proxy setup
         */
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      /**
       * external dependency to be excluded from the final bundle
       * but available in the runtime environment
       */
      external: ['isomorphic-fetch'],
    },
  },
});
