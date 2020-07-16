import { setToken, getToken, removeToken } from "../../libs/util";

export default {
  namespaced: true,
  state: {
    token: getToken(), //用户token
<<<<<<< HEAD
    userInfo: {}, // 用户信息
    identity: "" //用户身份
=======
    userInfo: {} // 用户信息
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
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
<<<<<<< HEAD
    },
    /**
     * 设置用户身份
    */
   setIdentity(state,identity){  
    state.identity = identity;
   }
=======
    }
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
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
<<<<<<< HEAD
              console.log(data);
              commit("setToken", data.data.userToken);
              commit("conf/update", "1-1", { root: true });
              commit("setIdentity", data.msg);
=======
              commit("setToken", data.data.userToken);
              commit("conf/update", "1-1", { root: true });
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
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
