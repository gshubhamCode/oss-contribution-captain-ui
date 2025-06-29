import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/oss-contribution-captain-ui/', // must match repo name
  plugins: [react()],
})