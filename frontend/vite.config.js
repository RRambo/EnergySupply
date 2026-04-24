import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/ 
export default defineConfig({
  plugins: [react()],
  /*// ∨∨∨ Use this to proxy all requests from the frontend to backend
  server: {
    proxy: {
      '/': 'http://localhost:3003', // <-- Define server host
    },
  },*/
})
