import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        configuratore: resolve(__dirname, 'configuratore.html'),
        account: resolve(__dirname, 'account.html'),
      },
    },
  },
  plugins: [
    VitePWA({
      injectRegister: 'inline',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      manifest: {
        name: 'Orto in Serra',
        short_name: 'Serra',
        description: 'Configuratore e guida stagionale per coltivare l\'orto in serra.',
        id: '/serra/',
        start_url: './index.html',
        scope: './',
        display: 'standalone',
        background_color: '#eef3ee',
        theme_color: '#2f6b3a',
        icons: [
          {
            src: 'assets/img/icons/logo-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'assets/img/icons/logo-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ]
});
