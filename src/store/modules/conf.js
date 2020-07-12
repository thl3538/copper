/**
 * 默认激活的菜单栏
 */
const DEFAULT_ACTIVE_ITEM = "1-1";

/**
 * 获取菜单激活状态的缓存数据，不存在则设置默认激活项
 */
const getItem = () => {
  let active = localStorage.getItem("activeItem")
  if (active === null || active === undefined || active === "") {
    localStorage.setItem("activeItem", DEFAULT_ACTIVE_ITEM);
    return DEFAULT_ACTIVE_ITEM;
  }
  return active;
}

export default {
  namespaced: true,
  state: {
    pageHeight: 0,
    pageWidth: 0,
    activeItem: getItem()
  },
  mutations: {
    /**
     * 充值菜单栏激活
     * @param {state} state 
     */
    reset(state) {
      localStorage.removeItem("activeItem");
      state.activeItem = getItem();
    },
    /**
     * 调整页面大小，获取窗口高度
     * @param {state} state 
     */
    resize(state) {
      state.pageHeight = window.innerHeight;
      state.pageWidth = window.innerWidth;
    },
    /**
     * 修改菜单激活状态
     * @param {state} state 
     * @param {String} item 
     */
    update(state, item) {
      localStorage.setItem("activeItem", item);
      state.activeItem = item;
    }
  }
};
