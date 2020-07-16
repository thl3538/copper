export default{
    namespaced: true,
    state: {
        tags: []
    },
    mutations: {
        updateTags: (state,tag) => {
            state.tags = [];
            const tags = tag.name;
            switch(tags) {
<<<<<<< HEAD
                case "index" :
                    state.tags.push("铜丝","首页")
                    break; 
=======
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
                case "copper" :
                    state.tags.push("铜丝","铜丝数据")
                    break;
                case "device" :
                    state.tags.push("设备","设备信息")
                    break;
                case "detail" :
                    state.tags.push("设备","设备信息","设备详情")
                    break;
                case "employee" : 
                    state.tags.push("员工","员工信息")
                    break;
                case "export" :
                    state.tags.push("数据","数据导出")
                    break;
                case "timecard" :
                    state.tags.push("员工","员工考勤")
                    break;
                case "attendence" :
                    state.tags.push("员工","考勤总览")
                    break;
                case "energy" :
                    state.tags.push("能源","能源分析")
                    break;
                case "partcopper" :
                    state.tags.push("铜丝","单台数据")
                    break;
                case "copperchart" :
                    state.tags.push("铜丝","图表展示")
                    break;
                case "singleefficiency" :
                    state.tags.push("设备","单台效率")
                    break;
                case "allefficiency" : 
                    state.tags.push("设备","总体效率")
                    break;
                case "maintenance" :
                    state.tags.push("设备","设备保养")
                    break;
                case "warn" :
                    state.tags.push("铜丝","设备预警")
                    break;
                case "maintenanceDetail" :
                    state.tags.push("设备","保养详情")
                    break;
            }
        }    
    }
}