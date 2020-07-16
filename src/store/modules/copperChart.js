<<<<<<< HEAD
=======
/*
 * @Author: your name
 * @Date: 2020-06-29 18:59:13
 * @LastEditTime: 2020-07-05 20:37:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \data-platform-client\src\store\modules\copperChart.js
 */ 
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
export default {
    namespaced: true,
    state: {
      classChartData: [],
<<<<<<< HEAD
      classEfficiency: [],
=======
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
      actChartData: []  
    },
    mutations: {
        getClassChartData(state, chartData) {
            state.classChartData = chartData;
        },
<<<<<<< HEAD
        getClassEfficiency(state, chartData) {
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
=======
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
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
<<<<<<< HEAD
                        commit("getClassEfficiency",data.data);
=======
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
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