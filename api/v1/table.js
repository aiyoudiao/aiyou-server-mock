const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    // url: /\/vue-admin-template\/table\/list/,
    url: new RegExp(process.env.VUE_APP_BASE_API + "/vue-admin-template/table/list"),
    type: 'get',
    response: config => {
      console.log('请求到了')
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
