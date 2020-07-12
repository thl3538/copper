/*
 * @Author: your name
 * @Date: 2020-06-29 18:59:13
 * @LastEditTime: 2020-07-05 20:37:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \data-platform-client\src\store\modules\copperChart.js
 */ 
export default {
    namespaced: true,
    state: {
      classChartData: [],
      actChartData: []  
    },
    mutations: {
        getClassChartData(state, chartData) {
            state.classChartData = chartData;
        },
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