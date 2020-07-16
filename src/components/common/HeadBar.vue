<template>
  <!-- 页面头部组件 -->
  <div id="header">
    <span id="breadcrumb-left">
      <Breadcrumb>
        <BreadcrumbItem v-for="(item,index) in tags" :key="index">{{item}}</BreadcrumbItem>
      </Breadcrumb>
    </span>
    <span id="btn-right">
      <Tooltip content="设备数量" placement="bottom">
        <div>
          设备
          <span :style="style">{{ devices }}</span>
        </div>
      </Tooltip>
      <Tooltip content="员工数量" placement="bottom">
        <div>
          员工
          <span :style="style">{{ employees }}</span>
        </div>
      </Tooltip>
      <Tooltip content="全屏" placement="bottom">
        <FullScreen />
      </Tooltip>
      <Tooltip content="退出登录" placement="bottom">
        <Logout />
      </Tooltip>
      <Tooltip content="用户名" placement="bottom">
        <span :style="{fontWeight: 'bold'}">{{ username }}</span>
      </Tooltip>
      <Tooltip content="身份" placement="bottom">
        <span :style="{color: '#2d8cf0', fontWeight: 'bold'}">{{identity === "USER" ? "管理员" : "员工"}}</span>
      </Tooltip>
    </span>
  </div>
</template>

<script>
import FullScreen from "@/components/utils/FullScreen.vue";
import Logout from "@/components/utils/Logout.vue";

export default {
  components: {
    FullScreen,
    Logout
  },
  data() {
    return {
      // 样式绑定
      style: {
        fontWeight: 'bold',
        color: '#2d8cf0'
      }
    };
  },
  // 初始化页面数据
  computed: {
    employees() {
      return this.$store.state.employee.totalEmployee;
    },
    devices() {
      return this.$store.state.device.totalDevice;
    },
    products() {
      return this.$store.state.product.totalProduct;
    },
    username() {
      return this.$store.state.user.userInfo.userName;
    },
    tags() {
      return this.$store.state.breadcrumb.tags;
    },
    identity() {
      return this.$store.state.user.identity;
    }
  }
};
</script>

<style scoped>
#header {
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
#breadcrumb-left{
  display: inline-block;
  box-sizing: border-box;
  height: 100%;
  line-height: 100%;
  width: 100%;
  padding: 0px 20px;
  text-align: left;
}
#btn-right {
  display: inline-block;
  box-sizing: border-box;
  height: 100%;
  line-height: 100%;
  width: 100%;
  padding: 0px 20px;
  text-align: right;
}
#btn-right > div {
  display: inline-block;
  text-align: center;
  line-height: 64px;
  height: 64px;
  width: 64px;
  cursor: pointer;
}
</style>
