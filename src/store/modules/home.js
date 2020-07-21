export default {
    namespaced: true,
    state: {
        employeeLog: [], //首页存放考勤日志
        warning: []      //存放首页警告数据
    },
    mutations: {
        getEmployeeLog(state,data) {
            console.log(data);
            data = data.reverse();
            state.employeeLog = data;
        },
        getWarning(state, warning) {
            warning.forEach(item => {
                item.createTime = new Date(item.createTime).toLocaleString();
            });
            state.warning = warning;
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
        * 获取员工最近产量
        */
        attendence({commit},userId) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/employee/getEmployeeLog/${userId}`)
                    .then(({data}) => {
                        if(data.code === 200) {
                            commit("getEmployeeLog",data.data);
                        }else {
                            reject(data.msg);
                        }
                    })
                    .catch(err =>  {
                        reject(error);
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
        } 
    }
}