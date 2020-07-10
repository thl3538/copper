/**
 * @description 设置默认页面大小
 */
const DEFAULT_SIZE = 20;
/**
 * @description: 页面大小缓存键的名称  
 */
const PAGE_SIZE = "maintenance_page_size";
/**
 * @description: 获取页面缓存键的名称,不存在则设置默认
 */
const getSize = () => {
    let size = localStorage.getItem(PAGE_SIZE);
    if (size === null || size === undefined || size === "") {
        localStorage.setItem(PAGE_SIZE, DEFAULT_SIZE);
        return DEFAULT_SIZE;
    }
    return Number.parseInt(size);
}
export default {
    namespaced: true,
    state: {
        maintenance: [],
        pageSize: getSize()
    },
    mutations: {
        getMaintenance(state, data) {
            state.maintenance = data;
        },
        /**
        * 调整页面大小
        */
        changeSize(state, size) {
            state.pageSize = size;
            localStorage.setItem(PAGE_SIZE, size);
        }
    },
    actions: {
        /**
         * @description: 获取保养信息
         * @param {page,pageSize} 
         * @return: Array
         */
        getMaintenance({commit,state}, page) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/api/maintenance/get?page=${page}&size=${state.pageSize}`)
                    .then(({data}) => {
                        if (data.code === 200) {
                            console.log(data);
                            commit("getMaintenance", data.data.content);
                            resolve(data.data.totalPages);
                        } else {
                            reject(data.msg)
                        }
                    })
                    .catch(err => {
                        reject(data.msg);
                    })
            })
        },
        /**
         * @description: 改变保养频率
         */
        changeFrequency({ commit}, {deviceId,deviceCycle}) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/maintenance?deviceId=${deviceId}&deviceCycle=${deviceCycle}`)
                    .then(({data}) => {
                        if (data.code === 200) {
                            resolve(data.msg);
                        } else {
                            reject(data.msg);
                        }
                    })
                    .catch(err => {
                        reject(data.msg);
                    })
            })
        },
        /**
         * @description: 添加保养信息
         */
        addMaintenance({commit}, formItem) {
            return new Promise((resolve, reject) => {
                console.log(formItem);
                axios
                    .post(`/api/maintenance/addLog`, formItem)
                    .then(({data}) => {
                        if (data.code === 200) {
                            resolve(data.msg);
                        } else {
                            reject(data.msg);
                        }
                    })
                    .catch(err => {
                        resolve(err);
                    })
            })
        }
    }
}