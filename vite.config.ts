import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      host: '0.0.0.0',
      allowedHosts: env.ALLOWED_HOSTS?.split(',') || [],
      port: 5173,
    },
    plugins: [react(), tailwindcss()],
    define: {
      'process.env': env, // 👈 expose all .env variables under process.env
    },
  }
})

