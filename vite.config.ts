import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // 1. You might need to run: npm install -D @types/node

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // 2. This matches the logic you just put in your tsconfig
      "@": path.resolve(__dirname, "./src"),
    },
  },
})