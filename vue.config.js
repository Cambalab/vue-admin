const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@demo': path.resolve(__dirname, 'demo'),
        '@e2e': path.resolve(__dirname, 'tests/e2e'),
        '@handlers': path.resolve(__dirname, 'src/handlers'),
        '@plugins': path.resolve(__dirname, 'src/plugins'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@templates': path.resolve(__dirname, 'src/templates/src'),
        '@validators': path.resolve(__dirname, 'src/validators/src')
      }
    }
  }
}
