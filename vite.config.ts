import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ command }) => {
  // For GitHub Pages production build (deployed at https://mustafanasiri345.github.io/muhammad-mustafa-nasiri-portfolio/),
  // the base URL must match the repository name subpath.
  // In development mode (AI Studio preview), base can remain '/' for root serving.
  const isBuild = command === 'build';
  const repoBase = process.env.REPO_BASE || (isBuild ? '/muhammad-mustafa-nasiri-portfolio/' : '/');

  return {
    base: repoBase,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

