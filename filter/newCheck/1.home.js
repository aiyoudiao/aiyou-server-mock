// 根据源数据创建一个清单列表
exports.createCheckOverViewByOrigin = function createCheckOverViewByOrigin(checkOverviewData) {
    const { 
        ringData,
        doubleBarData,
        appNodeHeatMapData,
        deviceHeatMapData,
        lineCheckData,
        visualServeData,
        domainNameCheckData 
    } = checkOverviewData


    // 处理流程
    // 1. 将除了 圆环图和双柱图之外的其它可视化图表数据置为`待加载`的数据
    const newAppNodeHeatMapData = JSON.parse(JSON.stringify(appNodeHeatMapData))
    const newDeviceHeatMapData = JSON.parse(JSON.stringify(deviceHeatMapData))
    const newLineCheckData = JSON.parse(JSON.stringify(lineCheckData))
    const newVisualServeData = JSON.parse(JSON.stringify(visualServeData))
    const newDomainNameCheckData = JSON.parse(JSON.stringify(domainNameCheckData))

    newAppNodeHeatMapData.forEach(item => {
        item.errorNum = -1;
    })

    newDeviceHeatMapData.forEach(item => {
        item.errorNum = -1;
    })

    newLineCheckData.forEach(item => {
        item.connectError = false
        item.portStatusError = false
        item.flowStatusError = false
    })

    newVisualServeData.forEach(item => {
        item.connectError = false
        item.vsStatusError = false
        item.memberzStatusError = false
    })

    newDomainNameCheckData.forEach(item => {
        item.connectError = false
        item.parseStatusError = false
    })

    return {
        ringData,
        doubleBarData,
        appNodeHeatMapData: newAppNodeHeatMapData,
        deviceHeatMapData: newDeviceHeatMapData,
        lineCheckData: newLineCheckData,
        visualServeData: newVisualServeData,
        domainNameCheckData: newDomainNameCheckData,
    }


}

// 将源数据拷贝一份，然后进行打乱，所有可视化图表中的数据顺序都会不一样
exports.shuffleCheckOverViewByOrigin = function shuffleCheckOverViewByOrigin (checkOverviewData) {
    const { 
        // ringData,
        // doubleBarData,
        appNodeHeatMapData,
        deviceHeatMapData,
        lineCheckData,
        visualServeData,
        domainNameCheckData 
    } = checkOverviewData


    // 处理流程
    // 1. 备份数据
    let newAppNodeHeatMapData = JSON.parse(JSON.stringify(appNodeHeatMapData))
    let newDeviceHeatMapData = JSON.parse(JSON.stringify(deviceHeatMapData))
    let newLineCheckData = JSON.parse(JSON.stringify(lineCheckData))
    let newVisualServeData = JSON.parse(JSON.stringify(visualServeData))
    let newDomainNameCheckData = JSON.parse(JSON.stringify(domainNameCheckData))

    // 2. 开始续牌
    newAppNodeHeatMapData = newAppNodeHeatMapData.sort(() => Math.random() - 0.5)
    newDeviceHeatMapData = newDeviceHeatMapData.sort(() => Math.random() - 0.5)
    newLineCheckData = newLineCheckData.sort(() => Math.random() - 0.5)
    newVisualServeData = newVisualServeData.sort(() => Math.random() - 0.5)
    newDomainNameCheckData = newDomainNameCheckData.sort(() => Math.random() - 0.5)

    return [
        // {
        //     ringData,
        //     dataType: 'ringData',
        // },
        // {
        //     doubleBarData,
        //     dataType: 'doubleBarData'
        // },
        {
            appNodeHeatMapData: newAppNodeHeatMapData,
            dataType: 'appNodeHeatMapData'
        },
        {
            deviceHeatMapData: newDeviceHeatMapData,
            dataType: 'deviceHeatMapData'
        },
        {
            lineCheckData: newLineCheckData,
            dataType: 'lineCheckData'
        },
        {
            visualServeData: newVisualServeData,
            dataType: 'visualServeData'
        },
        {
            domainNameCheckData: newDomainNameCheckData,
            dataType: 'domainNameCheckData'
        },
        {
            over: 'over'
        }
            
    ]
}