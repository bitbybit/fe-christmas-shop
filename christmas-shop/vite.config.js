export default {
  build: {
    sourcemap: true,

    rollupOptions: {
      input: {
        home: 'home.html',
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
