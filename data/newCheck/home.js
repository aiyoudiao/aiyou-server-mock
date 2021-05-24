const Mock = require('mockjs')

let mockNum = 100

// 模糊查询时的自检列表
exports.checkList = Mock.mock(Array(mockNum).fill(1).map(item => ({
    'label': '@city',
    value: ''
}))).map(item => {
    if (['-', '', null, undefined].includes(item.label)) {
        item.label = Mock.Random.city()
    }

    const guid = Mock.Random.guid()
    item.label += '银行' + Mock.Random.zip()
    item.value = guid
    return item
})

// 自检概览数据

// 圆环饼图
const ringData = () => ({
    // device: 203,
    // line: 18,
    // domain: 8,
    // visualServe: 51,
    // appNode: 210
    // device: 0,
    // line: 0,
    // domain: 0,
    // visualServe: 0,
    // appNode: 0
    device: Mock.mock('@integer(100, 205)'),
    line: Mock.mock('@integer(10, 25)'),
    domain: Mock.mock('@integer(1, 15)'),
    visualServe: Mock.mock('@integer(40, 65)'),
    appNode: Mock.mock('@integer(180, 300)')
})

// 双柱图
const doubleBarData = () => ([
    // { date: '4月1日', appSysAlteration: 13, deviceAlteration: 23 },
    // { date: '4月2日', appSysAlteration: 12, deviceAlteration: 9 },
    // { date: '4月3日', appSysAlteration: 17, deviceAlteration: 25 },
    // { date: '4月4日', appSysAlteration: 15, deviceAlteration: 22 },
    // { date: '4月5日', appSysAlteration: 21, deviceAlteration: 25 },
    // { date: '4月6日', appSysAlteration: 23, deviceAlteration: 20 },
    // { date: '4月7日', appSysAlteration: 29, deviceAlteration: 24 },
    { date: '4月1日', appSysAlteration: Mock.mock('@integer(10, 29)'), deviceAlteration: Mock.mock('@integer(5, 29)') },
    { date: '4月2日', appSysAlteration: Mock.mock('@integer(10, 29)'), deviceAlteration: Mock.mock('@integer(5, 29)') },
    { date: '4月3日', appSysAlteration: Mock.mock('@integer(10, 29)'), deviceAlteration: Mock.mock('@integer(5, 29)') },
    { date: '4月4日', appSysAlteration: Mock.mock('@integer(10, 29)'), deviceAlteration: Mock.mock('@integer(5, 29)') },
    { date: '4月5日', appSysAlteration: Mock.mock('@integer(10, 29)'), deviceAlteration: Mock.mock('@integer(5, 29)') },
    { date: '4月6日', appSysAlteration: Mock.mock('@integer(10, 29)'), deviceAlteration: Mock.mock('@integer(5, 29)') },
    { date: '4月7日', appSysAlteration: Mock.mock('@integer(10, 29)'), deviceAlteration: Mock.mock('@integer(5, 29)') },
])

// 应用节点热力图
const appNodeHeatMapData = () => (Array(Mock.mock('@integer(50, 150)')).fill(1).map(item => {
// const appNodeHeatMapData = () => (Array(59).fill(1).map(item => {
    return {
        appNodeName:  "NODE-" + Mock.mock('@ip()')  + '-' + Mock.mock('@zip'),
        // errorNum: ~~(Math.random() * 22)
        errorNum: Mock.mock('@integer(0, 21)')
    }
}))

// 设备热力图
const deviceHeatMapData = () => (Array(Mock.mock('@integer(50, 150)')).fill(1).map(item => {
// const deviceHeatMapData = () => (Array(59).fill(1).map(item => {
    return {
        deviceName: "DEVICE-" + Mock.mock('@first()') + '-' + Mock.mock('@zip'),
        errorNum: Mock.mock('@integer(0, 21)')
    }
}))

// 线路自检图
const lineCheckData = () => (Array(Mock.mock('@integer(0, 46)')).fill(1).map(item => {
    return {
        lineName: Mock.mock('@cname()') + '-' + Mock.mock('@integer(0, 100)'),
        type: ['张江', '武汉', '漕河泾'][Mock.mock('@integer(0, 2)')],
        'connectError': Mock.mock('@boolean()'),
        'portStatusError': Mock.mock('@boolean()'),
        'flowStatusError': Mock.mock('@boolean()'),
    }
}))

// 虚拟服务图
const visualServeData = () => (Array(Mock.mock('@integer(0, 46)')).fill(1).map(item => {
    return {
        visualServeName: Mock.mock('@cname()') + '-' + Mock.mock('@integer(0, 100)'),
        type: ['张江', '武汉', '漕河泾'][Mock.mock('@integer(0, 2)')],
        'connectError': Mock.mock('@boolean()'),
        'vsStatusError': Mock.mock('@boolean()'),
        'memberzStatusError': Mock.mock('@boolean()'),
    }
}))

// 域名自检图
const domainNameCheckData = () => (Array(Mock.mock('@integer(0, 46)')).fill(1).map(item => {
    return {
        domainName: Mock.mock('@cname()') + '-' + Mock.mock('@integer(0, 100)'),
        type: ['张江', '武汉', '漕河泾'][Mock.mock('@integer(0, 2)')],
        'connectError': Mock.mock('@boolean()'),
        'parseStatusError': Mock.mock('@boolean()'),
    }
}))

exports.checkOverview = {
    ringData: ringData(),
    doubleBarData: doubleBarData(),
    appNodeHeatMapData: appNodeHeatMapData(),
    deviceHeatMapData: deviceHeatMapData(),
    lineCheckData: lineCheckData(),
    visualServeData: visualServeData(),
    domainNameCheckData: domainNameCheckData(),
}

exports.checkOverviewFunc = () => ({
    ringData: ringData(),
    doubleBarData: doubleBarData(),
    appNodeHeatMapData: appNodeHeatMapData(),
    deviceHeatMapData: deviceHeatMapData(),
    lineCheckData: lineCheckData(),
    visualServeData: visualServeData(),
    domainNameCheckData: domainNameCheckData(),
})



