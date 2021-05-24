/**
 * 变更统计页面
 */
const { injectPost, injectGet } = require('../../utils/handleAPI') // 处理请求的管道
const { dataModel, dataModelFunc } = require('../../data/newCheck/appNodeCheckDetail') // 详情的模拟数据
const { createCheckOverViewByOrigin, shuffleCheckOverViewByOrigin } = require('../../filter/newCheck/2.alterationStatisticsDetail') // 响应数据的过滤器


//  const { appNodeDetailListData } = dataModelFunc()

module.exports = [

    //#region  应用系统变更关联的详情表格
    injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/getAppNodeCheckDetailTable"), config => {
        const { appNodeDetailListData } = dataModel
        return {
            data: appNodeDetailListData
        }
    }),

    injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/getAppNodeCheckDetailTable'), config => {
        const { appNodeDetailListData } = dataModel
        //  const { } = config.body

        let result = appNodeDetailListData;

        return function (param) {
            return {
                list: result
            }
        }
    }),
    //#endregion

    //#region  获取某一行的某一列的异常详情数据
    injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/getAppNodeCheckErrorDetailBySingleColumn"), config => {
        const { appNodeCheckSingleColumnDetail } = dataModel
        return {
            data: appNodeCheckSingleColumnDetail
        }
    }),

    injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/getAppNodeCheckErrorDetailBySingleColumn'), config => {
        const { appNodeCheckSingleColumnDetail } = dataModel
        const { id, columnName } = config.body;

        const dataMap = appNodeCheckSingleColumnDetail.find(item => item.ipAddress === id)

        return function (param) {
            return {
                data: dataMap[columnName]
            }
        }
    }),
    //#endregion

    //#region  获取这一列的所有行异常详情数据
    injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/getAppNodeCheckAllErrorDetailBySingleColumn"), config => {
        const { appNodeCheckSingleColumnDetail } = dataModel
        return {
            data: appNodeCheckSingleColumnDetail
        }
    }),

    injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/getAppNodeCheckAllErrorDetailBySingleColumn'), config => {
        const { appNodeCheckSingleColumnDetail } = dataModel
        const { idList, columnName } = config.body;
        const result = idList.reduce((prev, cur) => {
            const dataMap = appNodeCheckSingleColumnDetail.find(item => item.ipAddress === cur)

            prev.push({
                ipAddress: dataMap.ipAddress,
                data: dataMap[columnName]
            })
            return prev
        }, [])


        return function (param) {
            return {
                data: result
            }
        }
    }),
    //#endregion

    //#region  更新这一行的这一列异常数据状态
    injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/updateAppNodeCheckErrorBySingleColumn"), config => {
        const { appNodeCheckSingleColumnDetail } = dataModel
        return {
            data: appNodeCheckSingleColumnDetail
        }
    }),

    injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/updateAppNodeCheckErrorBySingleColumn'), config => {
        const { appNodeDetailListData, appNodeCheckSingleColumnDetailFunc } = dataModel
        const { id, columnName } = config.body;
        // 查询详情表，更新详情表的数据，然后再同步跟新异常信息表，最后将详情表的数据这一行的数据都返回回去。
        const obj = appNodeDetailListData.find(item => item.ipAddress === id)
        obj[columnName] = true

        const {
            connectStatus,
            switchPortStatus,
            serverTrafficStatus
        } = obj

        if (connectStatus && switchPortStatus && serverTrafficStatus) {
            obj.checkStatus = true
        }

        dataModel.appNodeCheckSingleColumnDetail = appNodeCheckSingleColumnDetailFunc(appNodeDetailListData)

        return function (param) {
            return {
                data: obj
            }
        }
    }),
    //#endregion

]