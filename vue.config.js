module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      './area-data': 'areaData'
    },
    output: {
      libraryExport: 'default'
    }
  },
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    proxy: process.env.VUE_APP_REMOTE_URL,
    disableHostCheck: true
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `@import "@/css/var.scss";`
      }
    },
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch-index');
  }
};
