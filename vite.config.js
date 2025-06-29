import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'write-cname',
      closeBundle: () => {
        const dir = resolve(__dirname, 'dist');
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, 'CNAME'), 'opencontributioncaptain.com');
      },
    },
  ],
});
