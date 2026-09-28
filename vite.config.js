import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Listen on all network interfaces so other devices on the same Wi-Fi can open
// the app at http://<this-pc's-ip>:5173 (e.g. http://192.168.29.230:5173).
// strictPort makes Vite fail loudly instead of quietly moving to another port.
const lanServer = {
  host: true,
  port: 5173,
  strictPort: true,
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: lanServer,
  preview: lanServer,
})
