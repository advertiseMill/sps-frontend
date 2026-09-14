import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        // Plugin to serve service worker from public folder
        {
            name: 'serve-sw',
            apply: 'serve',
            configResolved(config) {
                // Create public folder if it doesn't exist
                const publicDir = path.join(config.root, 'public');
                if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir, { recursive: true });
                }
                // Copy service worker to public folder
                const swSrc = path.join(config.root, 'src', 'serviceWorker.js');
                const swDest = path.join(publicDir, 'sw.js');
                if (fs.existsSync(swSrc) && !fs.existsSync(swDest)) {
                    fs.copyFileSync(swSrc, swDest);
                }
            }
        }
    ],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:5010',
                changeOrigin: true
            }
        }
    },
    build: {
        // Copy service worker to dist
        rollupOptions: {
            output: {
                // Ensure service worker is copied to dist
            }
        }
    }
});