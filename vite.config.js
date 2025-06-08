import { resolve } from 'node:path'
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
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
        },
        {
          src: './assets/common/gifts',
          dest: './assets/common/'
        },
        {
          src: './assets/common/modal/snowflake.svg',
          dest: './assets/common/modal/'
        }
      ]
    })
  ]
})
