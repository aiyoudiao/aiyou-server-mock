const Mock = require('mockjs')


const appSysTotal = 800;
// 应用系统变更关联的详情表格的数据
const appSysListData = (num) => (Array(num).fill(1).map(() => {

    const colorIndex = ~~(Math.random() * 7); // 根据这个来显示不同的颜色
    return {
        alterationOrder: Mock.mock('@guid'),
        alterationName: "特殊变更方式 - " + Mock.mock('@id'),
        dirAlterationGroup: '配置变更',
        operationTimeWorkOrderStatus: Mock.mock("@datetime('yyyy-MM-dd A HH:mm:ss')"),
        workOrderStatus: "正常关单",
        deviceName: Mock.mock('@first') + '-' + Mock.mock('@last') + Mock.mock('@natural(10, 99)'),
        operationMember: Mock.mock('@cname'),
        colorIndex
    }
}))

const deviceTotal = 600;
// 应用系统变更关联的详情表格的数据
const deviceListData = (num) => (Array(num).fill(1).map(() => {

    const colorIndex = ~~(Math.random() * 7); // 根据这个来显示不同的颜色
    return {
        alterationOrder: Mock.mock('@guid'),
        alterationName: "特殊变更方式 - " + Mock.mock('@id'),
        dirAlterationGroup: '配置变更',
        operationTimeWorkOrderStatus: Mock.mock("@datetime('yyyy-MM-dd A HH:mm:ss')"),
        workOrderStatus: "正常关单",
        deviceName: Mock.mock('@first') + '-' + Mock.mock('@last') + Mock.mock('@natural(10, 99)'),
        operationMember: Mock.mock('@cname'),
        colorIndex,
    }
}))

// 数据模型
exports.dataModel = {
    appSysListData: appSysListData(appSysTotal),
    deviceListData: deviceListData(deviceTotal)
}

// 重新生成一遍数据模型的函数
exports.dataModelFunc = () => {
    return {
        appSysListData: appSysListData(appSysTotal),
        deviceListData: deviceListData(deviceTotal)
    }
}