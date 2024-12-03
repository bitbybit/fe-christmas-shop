import { resolve } from 'node:path'
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: 'https://rolling-scopes-school.github.io/bitbybit-JSFE2024Q4/christmas-shop/',

  resolve: {
    alias: {
      assets: resolve(import.meta.dirname, './assets'),
      style: resolve(import.meta.dirname, './style'),
      service: resolve(import.meta.dirname, './service'),
    }
  },

  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    cssMinify: false,
    sourcemap: true,
    minify: false,

    rollupOptions: {
      input: {
        index: 'index.html',
        gifts: 'gifts.html',
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  },

  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'gifts.json',
          dest: './'
        }
      ]
    })
  ]
})
