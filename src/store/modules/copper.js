/**
 * 默认页面大小
 */
const DEFAULT_SIZE = 20;
/**
 * 页面大小缓存的键名称
 */
const PAGE_SIZE = "copper_page_size";
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
    copper: {}, // 最新的铜丝数据
    coppers: [], // 铜丝数据列表
    totalDevice: 0, // 设备总数
    pageSize: getSize(), // 页面大小
  },
  mutations: {
    getCopper(state, copper) {
      state.copper = copper;
    },
    getCoppers(state, list) {
      state.coppers = list;
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
    }
  },
  actions: {
    getOneCopper({ commit }, deviceId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/copper/new?deviceId=${deviceId}`)
          .then(({ data }) => {
            if (data.code === 200) {
              commit("getCopper", data.data);
              resolve(data.msg);
            } else {
              reject(data.msg);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getAllCopper({ commit, state }, page) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/copper?page=${page}&size=${state.pageSize}`)
          .then(({ data }) => {
            if (data.code === 200) {
              commit("getCoppers", data.data.content);
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
    getCoppers({commit, state}, page, size) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/copper?page=${page}&size=${size}`)
          .then(({ data }) => {
            if (data.code === 200) {
              commit("getCoppers", data.data.content);
              resolve(data.msg)
            } else {
              reject(data.msg);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
