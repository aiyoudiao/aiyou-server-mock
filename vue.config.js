'use strict'
const port = 19999

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  
  // webpack-dev-server 相关配置
  devServer: {
    port: port,
    open: true,
    compress: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./server-mock/server.js')
  },
}
