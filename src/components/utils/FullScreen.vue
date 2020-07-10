<template>
  <!-- 全屏按钮组件 -->
  <div id="full-screen">
    <Icon :type="type" @click.native="handleChange" size="24" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,
      type: "md-expand"
    };
  },
  methods: {
    /**
     * 处理全屏事件
     */
    handleFullscreen() {
      let main = document.body;
      if (this.value) {
        this.type = "md-expand";
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        this.type = "md-contract";
        if (main.requestFullscreen) {
          main.requestFullscreen();
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen();
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen();
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen();
        }
      }
      this.value = !this.value;
    },
    /**
     *事件绑定
     */
    handleChange() {
      this.handleFullscreen();
    }
  }
};
</script>

<style scoped>
#full-screen {
  display: inline-block;
  height: 100%;
  width: 64px;
  text-align: center;
}
</style>
