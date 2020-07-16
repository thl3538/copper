import { resolve } from "core-js/fn/promise";

/**
 * 默认页面大小
 */
const DEFAULT_SIZE = 20;
/**
 * 页面大小缓存的键名称
 */
const PAGE_SIZE = "warn_page_size";
/**
 * 获取缓存中的页面大小，不存在则设置为默认值
 */
const getSize = () => {
    let size = localStorage.getItem(PAGE_SIZE);
    if (size === null || size === undefined || size === "") {
        localStorage.setItem(PAGE_SIZE, DEFAULT_SIZE);
        return DEFAULT_SIZE;
    }
    return Number.parseInt(size);
};

export default {
    namespaced: true,
    state: {
        pageSize: getSize(), // 页面大小
        warn: []
    },
    mutations: {
        /**
         * 调整页面大小
         */
        changeSize(state, size) {
            state.pageSize = size;
            localStorage.setItem(PAGE_SIZE, size);
        },
        getWarnData(state, data) {
            state.warn = data;
        },
        /**
         * 筛选数据
         */
        filterData(state,data) {
            state.warn = data;
        }
    },
    actions: {
        /**
         * @description: 初始化数据
         * @param {page,pageSize} 
         * @return: Array
         */
        getWarnData({commit,state}, page) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/log/filter?page=${page}&size=${state.pageSize}`)
                    .then(({data}) => {
                        if (data.code === 200) {
                            commit("getWarnData", data.data.content);
                            resolve(data.data.totalPages);
                        } else {
                            reject(data.msg);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        /**
         * @description: 筛选数据
         * @param {page,pageSize,startTime,endTime,} 
         * @return: Array
         */
        filterData({commit,state}, {page,startTime,endTime,deviceId}) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/log/filter?page=${page}&size=${state.pageSize}&start=${startTime}&end=${endTime}&deviceId=${deviceId}`)
                    .then(({data}) => {
                        if (data.code === 200) {
                            commit("filterData",data.data.content);
                            resolve(data.totalPages);
                        } else {
                            reject(data.msg);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        handle({commmit},logId) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/log/deal/${logId}`)
                    .then(({data}) => {
                        if(data.code === 200){
                            resolve(data.msg);
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
};