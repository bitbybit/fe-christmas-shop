import { resolve } from 'node:path'
import { defineConfig } from 'vite';

export default defineConfig({
  base: 'https://rolling-scopes-school.github.io/bitbybit-JSFE2024Q4/christmas-shop/',

  resolve: {
    alias: {
      assets: resolve(import.meta.dirname, './assets'),
      style: resolve(import.meta.dirname, './style'),
    }
  },

  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    cssMinify: false,
    sourcemap: true,

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
  }
})
