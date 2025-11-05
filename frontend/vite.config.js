import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  css: {
    postcss: './postcss.config.js', // Ensures PostCSS config is used correctly
  },
  server: {
    hmr: {
      overlay: false, // ✅ disables the red overlay error popup
    },
  },
})
