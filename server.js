const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const { mockDir } = require('./config')

const { registerRoutes, unregisterRoutes } = require('./core')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
      extended: true
    }))
  
    const mockRoutes = registerRoutes(app)
    var mockRoutesLength = mockRoutes.mockRoutesLength
    var mockStartIndex = mockRoutes.mockStartIndex
  
    // watch files, hot reload mock server
    chokidar.watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true
    }).on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength)
  
          // clear routes cache
          unregisterRoutes()
  
          const mockRoutes = registerRoutes(app)
          mockRoutesLength = mockRoutes.mockRoutesLength
          mockStartIndex = mockRoutes.mockStartIndex
  
          console.log(chalk.magentaBright(`\n > Mock Server 热启动成功! 此次变更的文件是：  ${path}`))
        } catch (error) {
          console.log(chalk.redBright(error))
        }
      }
    })
  }
  