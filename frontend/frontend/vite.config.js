import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5172,   // 👈 set your custom default port here
    open: true    // optional: auto opens browser
  }
})
