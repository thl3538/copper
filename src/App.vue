<template>
  <div id="app">
    <transition name="fade">
      <router-view :style="{height: pageHeight, minWidth: '800px', minHeight: '600px' }"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    pageHeight() {
      return this.$store.state.conf.pageHeight + "px";
    }
  },
  beforeMount() {
    this.$store.commit("conf/resize");
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      that.$store.commit("conf/resize");
    };
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

