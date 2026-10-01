import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

const REPO_BASE = process.env.REPO_BASE || '/';

function syncProfilePlugin(): Plugin {
  return {
    name: 'sync-profile-image',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const cleanUrl = (req.url || '').split('?')[0];
        // If repo base is root, redirect legacy subpath requests to root
        if (REPO_BASE === '/' && (cleanUrl === '/muhammad-mustafa-nasiri-portfolio' || cleanUrl === '/muhammad-mustafa-nasiri-portfolio/')) {
          res.writeHead(302, { Location: '/' });
          res.end();
          return;
        }
        if (
          cleanUrl === '/assets/profile.jpg' ||
          cleanUrl === '/muhammad-mustafa-nasiri-portfolio/assets/profile.jpg' ||
          cleanUrl === `${REPO_BASE}assets/profile.jpg`
        ) {
          const file = path.resolve(process.cwd(), 'public/assets/profile.jpg');
          if (fs.existsSync(file)) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            return fs.createReadStream(file).pipe(res);
          }
        }
        next();
      });

      server.middlewares.use('/api/sync-profile-image', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              if (parsed?.image && typeof parsed.image === 'string') {
                const base64Data = parsed.image.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const dir = path.resolve(process.cwd(), 'public/assets');
                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
                }
                fs.writeFileSync(path.join(dir, 'profile.jpg'), buffer);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
                return;
              }
            } catch (e) {
              console.error('Error syncing profile image:', e);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed' }));
          });
          return;
        }
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: REPO_BASE,
    plugins: [react(), tailwindcss(), syncProfilePlugin()],
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
