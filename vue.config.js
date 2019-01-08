const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, 'src/components'),
        "@constants": path.resolve(__dirname, 'src/constants'),
        "@e2e": path.resolve(__dirname, 'tests/e2e'),
        "@assets": path.resolve(__dirname, 'src/assets')
      }
    }
  }
}
