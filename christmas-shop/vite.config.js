import { resolve } from 'node:path'

export default {
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
}
