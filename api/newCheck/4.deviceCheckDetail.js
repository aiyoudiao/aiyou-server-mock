/**
 * 变更统计页面
 */
 const { injectPost, injectGet } = require('../../utils/handleAPI') // 处理请求的管道
 const { dataModel, dataModelFunc } = require('../../data/newCheck/deviceCheckDetail') // 详情的模拟数据
 const { createCheckOverViewByOrigin, shuffleCheckOverViewByOrigin } = require('../../filter/newCheck/2.alterationStatisticsDetail') // 响应数据的过滤器
 
 
 //  const { deviceDetailListData } = dataModelFunc()
 
 module.exports = [
 
     //#region  应用系统变更关联的详情表格
     injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/getDeviceCheckDetailTable"), config => {
         const { deviceDetailListData } = dataModel
         return {
             data: deviceDetailListData
         }
     }),
 
     injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/getDeviceCheckDetailTable'), config => {
         const { deviceDetailListData } = dataModel
         //  const { } = config.body
 
         let result = deviceDetailListData;
 
         return function (param) {
             return {
                 list: result
             }
         }
     }),
     //#endregion
 
     //#region  获取某一行的某一列的异常详情数据
     injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/getDeviceCheckErrorDetailBySingleColumn"), config => {
         const { deviceCheckSingleColumnDetail } = dataModel
         return {
             data: deviceCheckSingleColumnDetail
         }
     }),
 
     injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/getDeviceCheckErrorDetailBySingleColumn'), config => {
         const { deviceCheckSingleColumnDetail } = dataModel
         const { id, columnName } = config.body;
 
         const dataMap = deviceCheckSingleColumnDetail.find(item => item.deviceName === id)
 
         return function (param) {
             return {
                id, columnName,
                 data: dataMap[columnName]
             }
         }
     }),
     //#endregion
 
     //#region  获取这一列的所有行异常详情数据
     injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/getDeviceCheckAllErrorDetailBySingleColumn"), config => {
         const { deviceCheckSingleColumnDetail } = dataModel
         return {
             data: deviceCheckSingleColumnDetail
         }
     }),
 
     injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/getDeviceCheckAllErrorDetailBySingleColumn'), config => {
         const { deviceCheckSingleColumnDetail } = dataModel
         const { idList, columnName } = config.body;
         const result = idList.reduce((prev, cur) => {
             const dataMap = deviceCheckSingleColumnDetail.find(item => item.deviceName === cur)
 
             prev.push({
                 deviceName: dataMap.deviceName,
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
     injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/updateDeviceCheckErrorBySingleColumn"), config => {
         const { deviceCheckSingleColumnDetail } = dataModel
         return {
             data: deviceCheckSingleColumnDetail
         }
     }),
 
     injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/updateDeviceCheckErrorBySingleColumn'), config => {
         const { deviceDetailListData, deviceCheckSingleColumnDetailFunc } = dataModel
         const { id, columnName } = config.body;
         // 查询详情表，更新详情表的数据，然后再同步跟新异常信息表，最后将详情表的数据这一行的数据都返回回去。
         const obj = deviceDetailListData.find(item => item.deviceName === id)
         obj[columnName] = true
 
         const {
             connectStatus,
             switchPortStatus,
             serverTrafficStatus
         } = obj
 
         if (connectStatus && switchPortStatus && serverTrafficStatus) {
             obj.checkStatus = true
         }
 
         dataModel.deviceCheckSingleColumnDetail = deviceCheckSingleColumnDetailFunc(deviceDetailListData)
 
         return function (param) {
             return {
                 data: obj
             }
         }
     }),
     //#endregion
 
 ]