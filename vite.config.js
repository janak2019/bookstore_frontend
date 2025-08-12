import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:true,
    proxy: {
      '/book': {
        target: 'https://bookstore-frontend-murex-mu.vercel.app',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
