/**
 * 变更统计页面
 */
 const { injectPost, injectGet } = require('../../utils/handleAPI') // 处理请求的管道
 const { dataModel, dataModelFunc  } = require('../../data/newCheck/alterationStatisticsDetail') // 详情的模拟数据
 const { createCheckOverViewByOrigin, shuffleCheckOverViewByOrigin } = require('../../filter/newCheck/2.alterationStatisticsDetail') // 响应数据的过滤器

 const { appSysListData, deviceListData } = dataModel
//  const { appSysListData, deviceListData } = dataModelFunc()
 
 module.exports = [
 
     //#region  应用系统变更关联的详情表格
     injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/getAppSysAlterationStatisticsTable"), config => {
         return {
             code: 20000,
             data: appSysListData
         }
     }),
 
     injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/getAppSysAlterationStatisticsTable'), config => {
 
         const { pageNumber, pageSize, condition } = config.body
        
         const total = appSysListData.length
         const start = (pageNumber - 1) * pageSize
         const end = pageNumber * pageSize
         let result = appSysListData;

         //TODO 根据condition过滤
         
        
         // 返回分页后的结果
         result = result.slice(start, end)
 
         return function (param) {
             return {
                total,
                pageNumber,
                pageSize,
                list: result
             }
         }
     }),
     //#endregion
 
     //#region  设备变更关联的详情表格
     injectGet(new RegExp(process.env.VUE_APP_BASE_API + "/newCheck/getDeviceSysAlterationStatisticsTable"), config => {
         return {
             code: 20000,
             data: deviceListData
         }
     }),
 
     injectPost(new RegExp(process.env.VUE_APP_BASE_API + '/newCheck/getDeviceSysAlterationStatisticsTable'), config => {
 
         const { pageNumber, pageSize, condition } = config.body
        
         const total = deviceListData.length
         const start = (pageNumber - 1) * pageSize
         const end = pageNumber * pageSize
         let result = deviceListData;

         //TODO 根据condition过滤
         
        
         // 返回分页后的结果
         result = result.slice(start, end)
 
         return function (param) {
             return {
                total,
                pageNumber,
                pageSize,
                list: result
             }
         }
     }),
     //#endregion


 ]