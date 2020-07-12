/*
 * @Author: your name
 * @Date: 2020-06-29 11:04:31
 * @LastEditTime: 2020-07-06 09:37:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \data-platform-client\src\store\modules\partCopper.js
 */ 
/**
 * 默认页面大小
 */
const DEFAULT_SIZE = 20;
/**
 * 页面大小缓存的键名称
 */
const DEVICE_PAGE_SIZE = "device_page_size";
/**
 * 获取缓存中的页面大小，不存在则设置为默认值
 */
const getSize = () => {
  let size = localStorage.getItem(DEVICE_PAGE_SIZE);
  if (size === null || size === undefined || size === "") {
    localStorage.setItem(DEVICE_PAGE_SIZE, DEFAULT_SIZE);
    return DEFAULT_SIZE;
  }
  return Number.parseInt(size);
};

export default {
  namespaced: true,
  state: {
    pageSize: getSize(), // 页面大小
    copper: []  //当前设备最新铜丝数据
  },
  mutations: {
    getDeviceCoppers(state, copper) {
      state.copper = copper;
    },
    changeSize(state,size) {
      state.pageSize = size;
    },
    searchCopper(state, copper) {
      state.copper = copper;
    }
  },
  actions: {
    /**
    * 请求单台设备数据
    * @param {String} deviceId 设备Id page 页数 
    */
    getDeviceCopper({ commit,state }, {deviceId, page}){
      return new Promise((resolve,reject) => {
        axios.get(`/api/copper/device?page=${page}&size=${state.pageSize}&deviceId=${deviceId}`)
        .then(({ data }) => {
          if (data.code === 200) {
            commit("getDeviceCoppers", data.data.content);
            resolve(data.data.totalElements);
          } else {
            reject(data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
      })
    },
    /**
    * 请求单台设备某个时间段数据
    * @param {String} deviceId 设备Id page 页数 
    */
   searchCopper({ commit, state }, {deviceId, page, startTime, endTime}) {
     return new Promise((resolve, reject) => {
       console.log(deviceId, page, startTime, endTime);
       axios.get(`/api/copper/filter?start=${startTime}&end=${endTime}&deviceId=${deviceId}&page=${page}&size=${state.pageSize}`)
        .then(({data}) => {
          if(data.code === 200) {
            commit("searchCopper",data.data.content);
          }else{
            reject(data.msg)
          } 
        })
        .catch(err => {
          reject(err);
        })
     })
   }
  }
};
