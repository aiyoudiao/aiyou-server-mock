const JSON5 = require('json5')

/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

function getJsonFile(filePath) {
  // 读取指定json文件
  var json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
  // 解析并返回 
  return JSON5.parse(json);
}

module.exports = {
  param2Obj,
  getJsonFile
}
