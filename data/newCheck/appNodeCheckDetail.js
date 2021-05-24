const Mock = require('mockjs')

const appNodeDetailTotal = 600;
// 应用节点自检的详情表格的数据
const appNodeDetailListData = (num) => (Array(num).fill(1).map(() => {
    const { connectStatus, switchPortStatus, serverTrafficStatus } = {
        ...Mock.mock({
            "connectStatus|1": [true, false]
        }),
        ...Mock.mock({
            "switchPortStatus|1": [true, false]
        }),
        ...Mock.mock({
            "serverTrafficStatus|1": [true, false]
        }),
    }

    const checkStatus = connectStatus && switchPortStatus && serverTrafficStatus;

    return {
        ipAddress: Mock.mock('@ip'),
        ...Mock.mock({
            "ipType|1": ['APP', 'DB', 'WEB']
        }),
        homeSwitch: Mock.mock('@region') + '-' + Mock.mock('@zip'),
        homePort: Mock.mock('@integer(10000, 5000)'),
        ServerHostName: Mock.mock('@domain'),
        ...Mock.mock({
            "deploymentMode|1": ['手动', '自动']
        }),
        appNodeName: "NODE-" + Mock.mock('@ip') + '-' + Mock.mock('@zip'),
        appServeName: Mock.mock('@protocol') + '-' + Mock.mock('@tld'),
        shortName: Mock.mock('@last') + Mock.mock('@zip'),
        ...Mock.mock({
            "serveLevel|1-10": "✨"
        }),
        ...Mock.mock({
            "isMonitor|1": [true, false]
        }),
        monitorContent: Mock.mock('@sentence(3, 5)'),
        connectStatus, 
        switchPortStatus, 
        serverTrafficStatus,
        checkStatus,
    }
}))
let appNodeDetailListDataModel = appNodeDetailListData(appNodeDetailTotal)

// 应用节点自检的详情表格单列的详情数据
const appNodeCheckSingleColumnDetail = (detailData) => {
    return detailData.reduce((prev, cur) => {
        let { ipAddress, homePort, connectStatus, switchPortStatus, serverTrafficStatus, checkStatus } = cur
    
        if (!connectStatus) {
            connectStatus = Array(20).fill(1).map(item => {
    
                return Mock.mock('@word(10, 15)') + '\r\n';
            })
        }
        if (!switchPortStatus) {
            switchPortStatus = {
                deviceName: Mock.mock('@first') + '-' + Mock.mock('@last') + '-' + Mock.mock('@guid'),
                devicePort: ipAddress + ":" + homePort,
                status: 'Down'
            }
        }
        if (!serverTrafficStatus) {
            serverTrafficStatus = {
                deviceName: Mock.mock('@first') + '-' + Mock.mock('@last') + '-' + Mock.mock('@guid'),
                devicePort: ipAddress + ":" + homePort,
                inTraffic: Mock.mock('@integer(50, 80)') + 'M',
                outTraffic: Mock.mock('@integer(100, 180)') + 'M',
            }
        }
        if (!checkStatus) {
            checkStatus = {}
            if (connectStatus !== true) checkStatus["connectStatus"] = connectStatus
            if (switchPortStatus !== true) checkStatus["switchPortStatus"] = switchPortStatus
            if (serverTrafficStatus !== true) checkStatus["serverTrafficStatus"] = serverTrafficStatus
        }
    
        prev.push({
            ipAddress,
            connectStatus,
            switchPortStatus, 
            serverTrafficStatus,
            checkStatus,
        })
    
        return prev
    }, [])
}

// 数据模型
exports.dataModel = {
    appNodeDetailListData: appNodeDetailListDataModel,
    appNodeCheckSingleColumnDetail: appNodeCheckSingleColumnDetail(appNodeDetailListDataModel),
    appNodeCheckSingleColumnDetailFunc: appNodeCheckSingleColumnDetail
}

// 重新生成一遍数据模型的函数
exports.dataModelFunc = () => {
    const newDataModel = {
        appNodeDetailListData: appNodeDetailListData(appNodeDetailTotal),
        appNodeCheckSingleColumnDetail: appNodeCheckSingleColumnDetail(newDataModel.appNodeDetailListData)
    }

    return newDataModel
}