import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./plugins/iview.js";
import "./plugins/axios";
import "./plugins/echarts";

// 是否开启开发模式
Vue.config.productionTip = false;

/**
 * 项目人口
 */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
