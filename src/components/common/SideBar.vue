<template>
  <!-- 侧边栏组件 -->
  <div id="sider">
    <!-- 页面左上角公司名称 -->
    <div class="logo">{{ enterprise }}</div>
    <!-- 选项卡菜单栏 -->
    <Menu
      accordion
      :active-name="activeItem"
      class="menu-item"
      theme="dark"
      width="auto"
      @on-select="handleRouter"
      :open-names="['1']"
    >
      <!-- <MenuItem name="1-1" to="/home/show">
        <Icon type="md-hammer" />
        <span>信息展示</span>
      </MenuItem>-->
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-apps" />铜丝
        </template>
<<<<<<< HEAD
        <MenuItem name="1-1" to="/home/index">
          <Icon type="md-analytics" />
          <span>首页</span>
        </MenuItem>
        <MenuItem name="1-2" to="/home/copper">
          <Icon type="md-analytics" />
          <span>铜丝数据</span>
        </MenuItem>
        <MenuItem name="1-3" to="/home/partcopper">
          <Icon type="md-analytics" />
          <span>单台数据</span>
        </MenuItem>
        <MenuItem name="1-4" to="/home/copperchart">
=======
        <MenuItem name="1-1" to="/home/copper">
          <Icon type="md-analytics" />
          <span>铜丝数据</span>
        </MenuItem>
        <MenuItem name="1-2" to="/home/partcopper">
          <Icon type="md-analytics" />
          <span>单台数据</span>
        </MenuItem>
        <MenuItem name="1-3" to="/home/copperchart">
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
          <Icon type="md-analytics" />
          <span>图表展示</span>
        </MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-paper-plane" />设备
        </template>
        <MenuItem name="2-1" to="/home/device">
          <Icon type="md-restaurant" />
          <span>设备信息</span>
        </MenuItem>
        <MenuItem name="2-2" to="/home/singleefficiency">
          <Icon type="md-restaurant" />
          <span>单台效率</span>
        </MenuItem>
        <MenuItem name="2-3" to="/home/allefficiency">
          <Icon type="md-restaurant" />
          <span>总体效率</span>
        </MenuItem>
        <MenuItem name="2-4" to="/home/maintenance">
          <Icon type="md-restaurant" />
          <span>设备保养</span>
        </MenuItem>
        <MenuItem name="2-5" to="/home/warn">
          <Icon type="md-restaurant" />
          <span>设备预警</span>
        </MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-flame"></Icon>能源
        </template>
        <MenuItem name="3-1" to="/home/energy">
          <Icon type="ios-flame-outline"></Icon>
          <span>能源分析</span>
        </MenuItem>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-contact" />员工
        </template>
        <MenuItem name="4-1" to="/home/employee">
          <Icon type="ios-body"></Icon>
          <span>员工信息</span>
        </MenuItem>
        <MenuItem name="4-2" to="/home/timecard">
          <Icon type="ios-body-outline"></Icon>
          <span>员工考勤</span>
        </MenuItem>
<<<<<<< HEAD
=======
        <MenuItem name="4-3" to="/home/attendence">
          <Icon type="md-hammer" />
          <span>考勤总览</span>
        </MenuItem>
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
      </Submenu>
      <Submenu name="5">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>导出
        </template>
        <MenuItem name="5-1" to="/home/export">
        <Icon type="md-cloud-download" />
        <span>数据导出</span>
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from "vuex";
const { mapState } = createNamespacedHelpers("conf");

export default {
  computed: {
    ...mapState({
      activeItem: state => state.activeItem
    }),
    enterprise() {
      return this.$store.state.user.userInfo.enterpriseName;
    }
  },
  methods: {
    // 处理sidebar切换，缓存当前状态
    handleRouter(name) {
      this.$store.commit("conf/update", name);
    }
  }
};
</script>

<style scoped>
.logo {
  width: 100%;
  font-size: 20px;
  text-align: center;
  line-height: 64px;
  color: #fff;
}
.ivu-menu-vertical.ivu-menu-light:after {
  display: none;
}
</style>
