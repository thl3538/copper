import { reject, resolve } from "core-js/fn/promise";

export default {
    namespaced: true,
    state: {
        employeeLog: [], //首页存放考勤日志
        warning: [],      //存放首页警告数据
        maintenance: [], //存放首页保养信息
        manageLog: [],
        productData: [], // 存放生产信息
        deviceOnline: [], //存放设备在线信息
    },
    mutations: {
        getWarning(state, warning) {
            state.maintenance = [];
            state.warning = [];
            warning.forEach(item => {
                item.logInfo = item.deviceName + item.logInfo;
                item.createTime = new Date(item.createTime).toLocaleString();
            });
            warning.forEach(item => {
                if(item.logType == "普通警告"){
                    state.maintenance.push(item);
                }else {
                    state.warning.push(item);
                }
            }) 
        },
        getOneOutput(state, data) {
            state.employeeLog = data;
            data = data.reverse();
        },
        getProduct(state, data) {
            data.weightTotal = data.weightTotal.toFixed(2);
            state.productData = data;
        },
        changeEmployee(state, data) {
            //console.log(data);
            data.forEach(item => {
                if(item.deviceStatus == 0) {
                    item.deviceStatus = "停机"
                }else if(item.deviceStatus == 1){
                    item.deviceStatus = "待机"
                }else if(item.deviceStatus == 2) {
                    item.deviceStatus = "运行"
                }
            })
            state.deviceOnline = data;
        } 
    },
    actions: {
        /**
        * 打卡
        */
        clock({commit, state}) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/employee/punchCard`)
                    .then(({data}) => {
                        if(data.code == 200 ) {
                            resolve("打卡成功");
                        }else {
                            reject("打卡失败");
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        /**
        * 管理员可以筛选员工获得最近产量
        */
       getOneOutput({ commit }, employeeCard) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/employee/getEmployeeLog/${employeeCard}`)
                    .then(({data}) => {
                        if(data.code === 200) {
                            commit("getOneOutput",data.data);
                            resolve(data.msg);
                        } else {
                            reject(data.msg);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
       },
        /**
        * 获取报警信息
        */
        warning({commit}) {
            return new Promise((resolve, reject) => {
                axios.get("/api/log/warning")
                    .then(({data}) => {
                        if(data.code === 200) {
                            commit("getWarning",data.data);
                            resolve(data.msg);
                        }else {
                            reject(data.msg);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        /**
        * 获取生产数据
        */
       getProduct({commit}) {
         return new Promise((resolve, reject) => {
             axios.get("/api/employee/getData")
                .then(({data}) => {
                    if(data.code === 200) {
                        commit("getProduct", data.data);
                        resolve(data.msg);
                    }else {
                        reject(data.msg);
                    }
                })
                .catch(err => {
                    reject(err);
                })
         }) 
       },
       /**
        * 切换员工查看设备在线状态
        */
       changeEmployee({ commit }, employeeName) {
           return new Promise((resolve, reject) => {
             axios.get(`api/onenet?employeeName=${employeeName}`)
                .then(({data}) => {
                    if(data.code === 200) {
                        commit("changeEmployee", data.data);
                    }
                })
                .catch(err => {
                    reject(data.msg);
                })
           })
       }
    }
}