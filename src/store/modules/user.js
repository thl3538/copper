import { setToken, getToken, removeToken } from "../../libs/util";

export default {
  namespaced: true,
  state: {
    token: getToken(), //用户token
    userInfo: {} // 用户信息
  },
  mutations: {
    /**
     * 设置用户token
     */
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    /**
     * 设置用户信息
     */
    setUserInfo(state, info) {
      state.userInfo = info;
    },
    /**
     * 删除用户token
     */
    removeToken(state) {
      state.token = null;
      removeToken();
    }
  },
  actions: {
    /**
     * 用户登录处理
     * @param {context} param0
     * @param {account} account 账户信息
     */
    handleLogin({ commit }, account) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/account", account)
          .then(({ data }) => {
            if (data.code === 200) {
              commit("setToken", data.data.userToken);
              commit("conf/update", "1-1", { root: true });
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
    /**
     * 注销登录
     * @param {context} param0
     */
    handleLogout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("removeToken");
        commit("conf/reset", {}, { root: true });
        resolve("logout success");
      });
    },
    /**
     * 接口请求数据，获取用户信息
     * @param {context} param0
     */
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api/user")
          .then(({ data }) => {
            if (data.code === 200) {
              commit("setUserInfo", data.data);
              // commit("setIdentity", data.msg);
              resolve(data.msg);
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
