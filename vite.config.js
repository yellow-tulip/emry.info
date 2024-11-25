import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false,
      allow: ['/Users/mre/Desktop/movies']
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  // Ensure environment variables are properly exposed
  envPrefix: 'VITE_',
  // Handle client-side routing
  preview: {
    port: 3000,
    host: true
  },
  // Add base URL for production
  base: '/'
})
