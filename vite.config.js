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
    sourcemap: true
  },
  define: {
    'process.env': {}
  }
})
