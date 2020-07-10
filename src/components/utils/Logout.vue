<template>
  <!-- 退出登录组件 -->
  <div id="logout">
    <Icon type="md-log-out" @click="logout" size="24" />
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * 退出登录处理
     */
    logout() {
      this.$store.dispatch("user/handleLogout").then(res => {
        this.$Message.success(res);
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
#logout {
  display: inline-block;
  height: 100%;
  width: 64px;
  text-align: center;
}
</style>
