import { resolve, reject } from "core-js/fn/promise";

/**
 * 默认页面大小
 */
const DEFAULT_SIZE = 20;
/**
 * 页面大小缓存的键名称
 */
const PAGE_SIZE = "employee_page_size";

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
    employees: [], // 员工信息数组
    totalEmployee: 0, // 员工信息总数
    pageSize: getSize() // 页面大小
  },
  getters: {
    /**
     * 时间升序
     */
    ascByTime(state) {
      return state.employees.sort((a, b) => {
        new Date(a.createTime).getTime() - new Date(b.createTime).getTime();
      });
    }
  },
  mutations: {
    /**
     * 获取所有数据
     */
    getEmployees(state, list) {
      state.employees = list;
    },
    /**
     * 修改数据总数
     */
    updateTotal(state, count) {
      state.totalEmployee = count;
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
    /**
     * 分页获取员工信息
     * @param {context} param0
     * @param {Int} page 页码
     */
    getAllEmployee({ commit, state }, page) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/employee?page=${page}&size=${state.pageSize}`)
          .then(({ data }) => {
            if (data.code === 200) {
              commit("getEmployees", data.data.content);
              commit("updateTotal", data.data.totalElements);
              commit("changeSize", state.pageSize);
              resolve(data.data.totalElements);
            } else {
              reject(data.msg);
            }
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    /**
     * 删除员工信息
     * @param {context} param0
     * @param {String} employeeCard 员工卡号
     */
    deleteEmployee({ dispatch }, employeeCard) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/employee/${employeeCard}`)
          .then(({ data }) => {
            if (data.code === 200) {
              dispatch("getAllEmployee", 0);
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
     * 修改员工信息
     * @param {context} param0
     * @param {employee} employee 员工信息
     */
    updateEmployee({ dispatch }, employee) {
<<<<<<< HEAD
      console.log(employee);
=======
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
      return new Promise((resolve, reject) => {
        axios
          .put(`/api/employee`, employee)
          .then(({ data }) => {
            if (data.code === 200) {
<<<<<<< HEAD
              console.log(data);
=======
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
              dispatch("getAllEmployee", 0);
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
     * 添加员工
     * @param {context} param0
     * @param {employee} employee 员工信息
     */
    addEmployee({ commit },employee) {
      console.log(employee);
      return new Promise((resolve,reject) => {
        axios.post("/api/employee",employee)
        .then(({data}) => {
<<<<<<< HEAD
          console.log(data);
=======
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
          if(data.code === 200) {
            resolve(data.msg);
          }else{
            reject(data.msg);
          }
        })
        .catch(err => {
          reject(err);
        })
      })
    }
  }
};
