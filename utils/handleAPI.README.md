## mock数据时处理统一请求的方法封装

``` js
const { injectPost, injectGet } = require('../../utils/handleAPI')

module.exports = [

    // get
    injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/vue-admin-template/table/list"), config => {
        console.log('请求到了')
        const items = data.items
        return {
            code: 20000,
            data: {
                total: items.length,
                items: items
            }
        }
    }),

    // post
    injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/vue-admin-template/user/login'), config => {

        const { username } = config.body

        return function (param) {
            return {
                code: 2,
                username
            }
        }
    })
]
```