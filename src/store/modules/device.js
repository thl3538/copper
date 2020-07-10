/**
 * 默认页面大小
 */
const DEFAULT_SIZE = 20;
/**
 * 页面大小缓存的键名称
 */
const PAGE_SIZE = "device_page_size";
const CUR_DETAIL = "detail_device_id";
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

const getDetail = () => {
  let det = localStorage.getItem(CUR_DETAIL);
  if (det === null || det === undefined || det === "") {
    localStorage.setItem(CUR_DETAIL, "");
    return "";
  }
  return det;
}

export default {
  namespaced: true,
  state: {
    devices: [], // 设备数据数组
    totalDevice: 0, // 设备总数
    pageSize: getSize(), // 页面大小
    curDetail: getDetail(), // 当前详情信息的设备编号
    online: false, // 当前设备在线状态
  },
  getters: {
    /**
     * 时间升序
     * @param {state} state
     */
    ascByTime(state) {
      return state.devices.sort((a, b) => {
        new Date(a.createTime).getTime() - new Date(b.createTime).getTime();
      });
    }
  },
  mutations: {
    /**
     * 获取所有数据
     */
    getDevices(state, list) {
      state.devices = list;
    },
    /**
     * 修改设备详情当前ID
     */
    updateDetail(state, deviceId) {
      state.curDetail = deviceId;
      localStorage.setItem(CUR_DETAIL, deviceId);
    },
    /**
     * 修改数据总数
     */
    updateTotal(state, count) {
      state.totalDevice = count;
    },
    /**
     * 调整页面大小
     */
    changeSize(state, size) {
      state.pageSize = size;
      localStorage.setItem(PAGE_SIZE, size);
    },
    /**
     * 修改在线状态
     */
    changeOnline(state, status) {
      state.online = status;
    }
  },
  actions: {
    /**
     * 分页获取设备数据
     * @param {context} param0
     * @param {Int} page 页码
     */
    getAllDevice({ commit, state }, page) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/device?page=${page}&size=${state.pageSize}`)
          .then(({ data }) => {
            if (data.code === 200) {
              commit("getDevices", data.data.content);
              commit("updateTotal", data.data.totalElements);
              commit("changeSize", state.pageSize);
              resolve(data.data.totalElements);
            } else {
              reject(data.msg);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    /**
     * 创建设备数据
     * @param {context} param0
     * @param {device} device
     */
    createDevice({ dispatch }, device) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/device", device)
          .then(({ data }) => {
            if (data.code === 200) {
              dispatch("getAllDevice", 0);
              resolve(data.msg);
            } else {
              reject(data.msg);
            }
          })
          .catch(err => {
            reject("系统错误，无法创建");
          });
      });
    },
    /**
     * 删除设备信息
     * @param {context} param0
     * @param {Int} deviceId  设备编号
     */
    deleteDevice({ dispatch }, deviceId) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/device/${deviceId}`)
          .then(({ data }) => {
            if (data.code === 200) {
              dispatch("getAllDevice", 0);
              resolve(data.msg);
            } else {
              reject(data.msg);
            }
          })
          .catch(err => {
            reject("系统错误，无法删除");
          });
      });
    },
    /**
     * 获取设备在线状态
     */
    getDeviceOnline({ commit }, deviceId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/onenet/${deviceId}`)
          .then(({ data }) => {
            if (data.code === 200) {
              commit("changeOnline", data.data.online);
              resolve(data.msg);
            } else {
              reject(data.msg);
            }
          })
          .catch(err => {
            reject("系统错误");
          });
      });
    }
  }
};
