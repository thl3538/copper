export default {
  namespaced: true,
  actions: {
    /**
     * 请求接口获取二维码图片
     * @param {context} context context
     * @param {Any} content 二维码内容
     */
    getImage(context, content) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/code?content=${content}`)
          .then((res) => {
            if (res.status === 200) {
              resolve("获取成功");
            } else {
              reject("获取失败");
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
