/**
 * 默认页面大小
 */
const DEFAULT_SIZE = 20;
/**
 * 页面大小缓存的键名称
 */
const PAGE_SIZE = "timecard_page_size";
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
        pageSize: getSize()
    },
    mutations: {
        /**
         * 调整页面大小
         */
        changeSize(state, size) {
            state.pageSize = size;
            localStorage.setItem(PAGE_SIZE, size);
        },
    },
    actions: {

    }
}