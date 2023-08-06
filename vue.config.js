const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  runtimeCompiler: true,
  transpileDependencies: [/node_modules/],
  publicPath: process.env.VUE_APP_PUBLIC_PATH, // process.env.VUE_APP_PUBLIC_PATH -> '/'
  devServer: {
    client: {
      overlay: false
    },
    port: 9527,
    proxy: {
      '/mingyue': {
        target: "http://127.0.0.1:6996/",
        changeOrigin: true
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    },
  }
})
