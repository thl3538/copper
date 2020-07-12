import Vue from "vue";
import Router from "vue-router";
import routes from "./router";
import store from '../store/index'
import { LoadingBar as loading } from "iview";

Vue.use(Router);

const router = new Router({
  routes,
  mode: "hash"
});

/**
 * 路由钩子，加载进度动画开始
 */
router.beforeEach((to, from, next) => {
  loading.start();
  next();
  store.commit("breadcrumb/updateTags",to);
});

/**
 * 路由钩子，加载进度动画结束
 */
router.afterEach(router => {
  loading.finish();
});

export default router;
