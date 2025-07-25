import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    allowedHosts: process.env.ALLOWED_HOSTS?.split(',') || [],
    port: 5173,
  },
  
  plugins: [react(), tailwindcss()],
})
