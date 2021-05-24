const fs = require('fs')
const path = require('path')

/**
 * 循环导入
 * @param {*} dir 
 * @returns 
 */
function forEachRequire(dir) {
    const files = fs.readdirSync(path.resolve(__dirname, dir), 'utf-8');
    const result = {}

    files.forEach(file => {
        if (!file.includes('.js')) return
        const data = require(dir + '/' + file)

        if (Object.keys(data).length === 0) return
        result[file] = data
    })

    return result
}



// exports.v1 = forEachRequire('./v1')
exports.newCheck = forEachRequire('./newCheck')