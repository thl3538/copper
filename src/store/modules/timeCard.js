import { resolve } from "core-js/fn/promise";

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
        pageSize: getSize(),
        timeCard: []
    },
    mutations: {
        /**
         * 调整页面大小
         */
        changeSize(state, size) {
            state.pageSize = size;
            localStorage.setItem(PAGE_SIZE, size);
        },
        getTimeCard(state, data) {
            data.forEach(item => {
                switch(item.status) {
                    case 0 :
                        item.status = "上班";
                        break;
                    case 1 :
                        item.status = "全勤";
                        break;
                    case 2 :
                        item.status = "缺勤";
                        break;
                }
            })
            state.timeCard = data;
        }
    },
    actions: {
        getTimeCard({ commit,state }, {page,employeeCard}) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/employee/log?page=${page}&size=${state.pageSize}&employeeCard=${employeeCard}`)
                    .then(({data}) => {
                        if(data.code === 200) {
                            commit("getTimeCard", data.data.content);
                            resolve(data.msg)
                        }else {
                            reject(data.msg)
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        }
    }
}