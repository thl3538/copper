/**
 * @description 设置默认页面大小
 */
const DEFAULT_SIZE = 20;
/**
 * @description: 页面大小缓存键的名称  
 */
const PAGE_SIZE = "maintenanceDet_page_size";
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
        maintenanceDetail: [],
        pageSize: getSize()
    },
    mutations: {
        getDetail(state, data) {
            state.maintenanceDetail = data;
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
         * @description: 获取设备保养详情 
         * @param {deviceId} 
         * @return: Array
         */
        getDetail({ commit,state }, {deviceId,page}) {
            return new Promise((resolve,reject) => {
                axios
                    .get(`/api/maintenance/getLog?deviceId=${deviceId}&page=${page}&size=${state.pageSize}`)
                    .then(({data}) => {
                        if(data.code === 200){
                            commit("getDetail",data.data.content);
                            resolve(data.data.totalPages);
                        }else{
                            reject(data.msg);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        }    
    }
}
