export default {
    namespaced: true,
    state: {
      classChartData: [],
      classEfficiency: [],
      actChartData: []  
    },
    mutations: {
        getClassChartData(state, chartData) {
            state.classChartData = chartData;
        },
        getClassEfficiency(state, chartData) {
            chartData = chartData.reverse();
            let classEfficiency = chartData.map(item => {
                return {
                    ...item,
                    outputOfDay: (item.outputOfDay / 86400).toFixed(2),
                    outputOfMorning: (item.outputOfMorning / 43200).toFixed(2),
                    outputOfNight: (item.outputOfNight / 43200).toFixed(2)
                }
            })
            state.classEfficiency = classEfficiency;
        },
        /**
        * 实际长度数据
        * @param {chartData} 
        */
        getActChartData(state, chartData) {
            state.actChartData = chartData;
        }
    },
    actions: {
        /**
        * 请求实际长度数据
        * @param {String} deviceId 设备Id
        */
       getActChart({ commit }, deviceId) {
         return new Promise((resolve, reject) => {
            axios
                .get(`/api/copper/day?deviceId=${deviceId}`)
                .then(({data}) => {
                    if(data.code === 200) {
                        commit("getActChartData",data.data);
                        resolve(data.msg);
                    }else{
                        reject(data.msg);
                    }
                })
                .catch(err => {
                    reject("获取数据失败");
                })
         })
       },
        /**
        * 请求班长度数据
        * @param {String} deviceId 设备Id
        */
       getClassChart({ commit }, deviceId) {
         return new Promise((resolve,reject) => {
             axios
                .get(`/api/data/week?deviceId=${deviceId}`)
                .then(({data}) => {
                    if(data.code === 200){
                        commit("getClassChartData", data.data);
                        commit("getClassEfficiency",data.data);
                        resolve(data.msg);
                    }else {
                        reject(data.msg);
                    }
                })
                .catch(err => {
                    reject("获取数据失败");
                })
         })
       }
    }
}