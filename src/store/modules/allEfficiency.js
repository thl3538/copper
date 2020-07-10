 export default {
    namespaced: true,
    state: {
        detail: []
    },
    mutations: {
        getAllDetail(state,detail){
            detail.averEfficiency = detail.averEfficiency.toFixed(2);
            detail.maxEfficiency = detail.maxEfficiency.toFixed(2);
            detail.minEfficiency = detail.minEfficiency.toFixed(2);
            state.detail = detail;
        }
    },
    actions: {
        getDetail({ commit }) {
            return new Promise((resolve,reject) => {
                axios.get(`/api/data/home`)
                .then(({ data }) => {
                  if(data.code === 200){
                      commit("getAllDetail",data.data);
                      resolve(data.msg);
                  }else{
                      reject(data.msg);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
              })
        }
    }
}