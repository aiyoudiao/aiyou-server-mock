const Mock = require('mockjs')

const deviceDetailTotal = 600;
// 设备自检的详情表格的数据
const deviceDetailListData = (num) => (Array(num).fill(1).map(() => {
    const { patrolInformation, monitorInfomation, logInfomation } = {
        ...Mock.mock({
            "patrolInformation|1": [true, false]
        }),
        ...Mock.mock({
            "monitorInfomation|1": [true, false]
        }),
        ...Mock.mock({
            "logInfomation|1": [true, false]
        }),
    }

    const checkStatus = patrolInformation && monitorInfomation && logInfomation;

    return {
        deviceName: "DEVICE-" + Mock.mock('@first') + '-' + Mock.mock('@zip'),
        deviceLevel2Categroy: Mock.mock('@protocol') + '.' + Mock.mock('@tld'),
        deviceLevel3Categroy: Mock.mock('@protocol') + ':' + Mock.mock('@domain'),
        deviceUsage: Mock.mock('@city(true)'),
        ...Mock.mock({
            "deivceStatus|1": ['使用中', '停用', '异常']
        }),
        serialNumber: Mock.mock('@guid'),
        ...Mock.mock({
            "manufacturer|1": ['张江', '漕河泾', '武汉']
        }),
        ...Mock.mock({
            "deviceType|1": ['交换机', '逻辑服务器', '防火墙', '负载均衡']
        }),
        deviceVersion: 'v' + Mock.mock('@float(0, 1, 2, 2)'),
        ...Mock.mock({
            "devicePlatform|1": ['中国移动', '中国联通', '中国电信']
        }),
        managerIP: Mock.mock('@ip'),
        networkArea: Mock.mock('@county(true)'),
        machineRoom: "ROOM-" + Mock.mock('@guid'),
        ...Mock.mock({
            "institute|1": ["泰国", "新加坡", "印度尼西亚", "中国", "韩国"]
        }),
        patrolInformation,
        monitorInfomation,
        changeInfomation: Mock.mock('@integer(0, 20)'),
        logInfomation,
        checkStatus,
    }
}))
let deviceDetailListDataModel = deviceDetailListData(deviceDetailTotal)

// 设备自检的详情表格单列的详情数据
const deviceCheckSingleColumnDetail = (detailData) => {
    return detailData.reduce((prev, cur) => {
        let { deviceName, patrolInformation, monitorInfomation, changeInfomation, logInfomation, checkStatus } = cur

        // 巡检信息
        if (!patrolInformation) {
            patrolInformation = {
                list: Array(Mock.mock('@integer(5, 10)')).fill(1).map(() => {
                    return {
                        deviceName: "DEVICE-" + Mock.mock('@first') + '-' + Mock.mock('@zip'),
                        subDeivceName: "SUB-DEVICE-" + Mock.mock('@last') + '-' + Mock.mock('@zip'),
                        inspectionItem: Mock.mock('@first') + '_' + Mock.mock('@protocol') + '巡检',
                        isError: Mock.mock('@boolean'),
                        inspectionDate: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
                        ...Mock.mock({
                            "inspectionType|1": ['网络设备', '交换机', '防火墙', '负载均衡']
                        }),
                        threshold: '**',
                        beforeDayData: Array(Mock.mock('@integer(3,4)')).fill(1).map(() => Mock.mock('@paragraph()')).join( '\r\n'),
                        currentDayData: Array(Mock.mock('@integer(3,4)')).fill(1).map(() => Mock.mock('@paragraph()')).join( '\r\n'),
                    }
                })
            }
        }

        // 监控信息
        if (!monitorInfomation) {
            monitorInfomation = {

                // 网管告警
                networkManagementAlarm: {
                    currentLevel4AlarmNum: 0,
                    currentLevel5AlarmNum: 0,
                    logDetail1: 'xxx',
                    oldLevel4AlarmNum: 0,
                    oldLevel4AlarmDetail: 'xxx',
                    oldLevel5AlarmNum: 0,
                    oldLevel5AlarmDetail: 'xxx'
                },

                // 性能监控
                performanceMonitor: {
                    ping: {
                        status: '异常',
                        currentValue: '1000ms'
                    },
                    cpuUtilization: {
                        status: '正常',
                        currentValue: '4%'
                    },
                    memoryUtilization: {
                        status: '正常',
                        currentValue: '22%'
                    },
                    powersupplystatus: {
                        status: '正常'
                    },
                    sysuptime: {
                        status: '正常',
                        currentValue: '200天'
                    },
                },

                // 设备连接数
                deviceConnections: {
                    clientCurrentConnectionNum: 1179,
                    clientNewConnectionNum: 3,
                    serveCurrentConnectionNum: 187,
                    serveNewConnectionNum: 3,
                },

                // 虚拟服务连接数
                vsServeConnections: {
                    vsName: 'xx',
                    application: 'xx',
                    vsIP: Mock.mock('@ip'),
                    vsPort: Mock.mock('@integer(100, 50000)'),
                    vsNewConnectionNum: 184,
                    vsCurrentConnnectionNum: 0
                },

                // 端口状态
                portStatusTable: Array(Mock.mock('@integer(1, 15)')).fill(1).map(() => {
                    return {
                        localPortName: 'xxxx',
                        ...Mock.mock({
                            "portStatus|1": ['Down', 'Up']
                        }),
                        peerPortName: 'xxxx',
                        peerDeviceName: 'xxxx',
                        inputError: 0,
                        outputError: 1,
                        inputDiscard: 1,
                        outputDiscard: 1
                    }
                })

            }
        }

        // 变更信息
        if (Number(changeInfomation)) {

            changeInfomation = {
                list: Array(changeInfomation).fill(1).map(() => {
                    return {
                        changeDate: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
                        changeOrder: Mock.mock('@guid'),
                        changeProgramme: Mock.mock('@city(true)') + '变更',
                        changePlannerMember: Mock.mock('@cname'),
                        changeImplementer: Mock.mock('@cname')
                    }
                })
            }
        }

        // 日志信息
        if (!logInfomation) {
            logInfomation = {

                deviceLogInfo: {
                    errorLogNum: 1,
                    alarmDetail: Array(1).fill(1).map(item => {
                        return Mock.mock('@word(10,15)') + '\r\n'
                    })
                },
                deviceDenyInfo: Array(2).fill(1).map(item => {
                    return Mock.mock('@word(10,15)') + '\r\n'
                }),
                networkSyslogAndTrapInfo: {
                    currentLevel4AlarmNum: 0,
                    currentLevel5AlarmNum: 0,
                    logDetail1: 'xxx',
                    oldLevel4AlarmNum: 0,
                    oldLevel4AlarmDetail: 'xxx',
                    oldLevel5AlarmNum: 0,
                    oldLevel5AlarmDetail: 'xxx'
                }

            }
        }

        // 自检状态
        if (!checkStatus) {
            checkStatus = {}
            if (patrolInformation !== true) checkStatus["patrolInformation"] = patrolInformation
            if (monitorInfomation !== true) checkStatus["monitorInfomation"] = monitorInfomation
            if (logInfomation !== true) checkStatus["logInfomation"] = logInfomation
        }



        prev.push({
            deviceName,
            patrolInformation,
            monitorInfomation,
            changeInfomation,
            logInfomation,
            checkStatus,
        })

        return prev
    }, [])
}

// 数据模型
exports.dataModel = {
    deviceDetailListData: deviceDetailListDataModel,
    deviceCheckSingleColumnDetail: deviceCheckSingleColumnDetail(deviceDetailListDataModel),
    deviceCheckSingleColumnDetailFunc: deviceCheckSingleColumnDetail
}

// 重新生成一遍数据模型的函数
exports.dataModelFunc = () => {
    const newDataModel = {
        deviceDetailListData: deviceDetailListData(deviceDetailTotal),
        deviceCheckSingleColumnDetail: deviceCheckSingleColumnDetail(newDataModel.deviceDetailListData)
    }

    return newDataModel
}