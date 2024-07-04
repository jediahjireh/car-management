import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    // desired port number for vite development server
    port: 8000,
    proxy: {
      '/api': {
        // Express server URL : '/api' AT THE END IS CRUCIAL
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  build: {
    // specify the output directory for production build
    outDir: 'public',
    // provide consistent fetch API across different environments 
    rollupOptions: {
      external: ['isomorphic-fetch'],
    },
  }
})
