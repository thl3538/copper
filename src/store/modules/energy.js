export default {
    namespaced: true,
    state: {
        deviceId: "",
        chartName: [
            "相电压",
            "相电流",
            "电度",
            "有功功率",
            "无功功率",
            "视在功率",
            "功率因素",
            "频率"
        ],
        currentName: "相电压" // 默认图表名称
    },
    mutations: {
        /**
        * 设置默认设备
        */
        setDevice(state, deviceId){
            state.deviceId = deviceId;
        }
    },
    actions: {
        
    }
}