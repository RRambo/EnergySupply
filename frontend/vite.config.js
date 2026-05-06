import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/ 
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/houses': 'http://localhost:8000',
      '/houses-details': 'http://localhost:8000',
      '/panel-details': 'http://localhost:8000',
      '/update-grid': 'http://localhost:8000',
      '/savings-gains': 'http://localhost:8000',
    },
  },
})
