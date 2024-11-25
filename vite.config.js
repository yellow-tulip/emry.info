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
  define: {
    // Expose env variables
    'import.meta.env.VITE_R2_BUCKET_URL': JSON.stringify(process.env.VITE_R2_BUCKET_URL)
  },
  // Handle client-side routing
  preview: {
    port: 3000,
    host: true
  },
  // Add base URL for production
  base: '/'
})
