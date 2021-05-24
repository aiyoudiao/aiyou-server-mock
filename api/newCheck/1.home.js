/**
 * 首页
 */
const { injectPost, injectGet } = require('../../utils/handleAPI') // 处理请求的管道
const { checkList, checkOverview, checkOverviewFunc } = require('../../data/newCheck/home') // 详情的模拟数据
const { createCheckOverViewByOrigin, shuffleCheckOverViewByOrigin } = require('../../filter/newCheck/1.home') // 响应数据的过滤器

module.exports = [

    //#region  自检列表
    injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/checkList"), config => {
        return {
            code: 20000,
            data: checkList
        }
    }),

    injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/checkList'), config => {

        const { content } = config.body

        let result = []
        if (![undefined, null, ''].includes(content)) {
            result = checkList.filter(item => item.label.includes(content) || item.value.includes(content))
        }

        return function (param) {
            return result
        }
    }),
    //#endregion

    //#region 开始自检

    injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/requestWebsocket'), config => {

        const { requestId, inputTemplateLabel, inputTemplateValue } = config.body

        return function (param) {
            // return checkOverviewFunc()
            // return checkOverview
            return createCheckOverViewByOrigin(checkOverview)
        }
    }),

    injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/mockAllWebSocketData"), config => {
        return function (param) {
            return shuffleCheckOverViewByOrigin(checkOverview)
        }
    }),

    //#endregion

]