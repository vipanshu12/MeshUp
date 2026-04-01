import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
   server: {
    allowedHosts: [
      'admittible-nicolas-nonnegligently.ngrok-free.dev',
      'localhost',
      '127.0.0.1'
    ],
    host: '0.0.0.0',
    port: 5173}
})
