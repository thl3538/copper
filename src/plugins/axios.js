"use strict";

import Vue from "vue";
import axios from "axios";
import { getToken } from "../libs/util";
import conf from "../../conf";

let config = {
  baseURL: conf.serverUrl
};

const _axios = axios.create(config);

//请求拦截
_axios.interceptors.request.use(
  function(config) {
    // 请求之前获取token并携带在请求头中
    config.headers["token"] = getToken();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//响应拦截
_axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log("1" + error);
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
