import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  base: '/Proposal/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
