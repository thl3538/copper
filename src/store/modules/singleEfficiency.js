export default {
    namespaced: true,
    state: {
        deviceName: "",
        averEff: "",
        realEff: [] //实时效率数组
    },
    mutations: {
        // 获取日均效率
        getAverEff(state, AverEfficiency) {
            state.averEff = [];
            if (AverEfficiency[1].deviceName) {
                state.deviceName = AverEfficiency[1].deviceName;
            } else {
                state.deviceName = "暂无数据";
            }
            if (AverEfficiency[1].efficiency.toFixed(2)) {
                state.averEff = AverEfficiency[1].efficiency.toFixed(2);
            } else {
                state.averEff = "暂无数据";
            }
        },
        // 获取实时效率
        realEff(state, realEff) {
            realEff.forEach(item => {
                item.efficiency = item.efficiency.toFixed(2);
            })
            state.realEff = realEff;
            
        }
    },
    actions: {
        /**
         * 获取设备日均效率
         * @param {context} param0
         * @param {Int} deviceId 设备Id
         */
        getAverEfficiency({ commit }, deviceId) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/data/aver/${deviceId}`)
                    .then(({data}) => {
                        if (data.code === 200) {
                            commit("getAverEff", data.data)
                        } else {
                            reject(data.msg);
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        /**
         * 获取设备实时效率
         * @param {context} param0
         * @param {Int} deviceId 设备Id
         */
        getRealEfficiency({commit}, deviceId) {
            return new Promise((resovle, reject) => {
                axios.get(`/api/data/real/${deviceId}`)
                    .then(({data}) => {
                        if (data.code === 200) {
                            commit("realEff", data.data)
                        }
                    })
            })
        }
    }
}