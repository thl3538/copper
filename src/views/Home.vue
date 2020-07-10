<template>
  <!-- 页面主体布局框架 -->
  <div class="layout">
    <Layout>
      <Sider hide-trigger :style="styles">
        <Affix>
          <SideBar />
        </Affix>
      </Sider>
      <Layout>
        <Header :style="{ padding: '0px' }" class="layout-header-bar">
          <Affix>
            <HeadBar />
          </Affix>
        </Header>
        <Affix>
          <Content
            :style="{ margin: '10px', padding: '10px', overflow: 'auto', height: contentHeight }"
          >
            <router-view :style="{textAlign: 'center'}"></router-view>
          </Content>
        </Affix>
      </Layout>
    </Layout>
  </div>
</template>


<script>
import HeadBar from "@/components/common/HeadBar.vue";
import SideBar from "@/components/common/SideBar.vue";

import { createNamespacedHelpers, mapGetters } from "vuex";
const { mapState } = createNamespacedHelpers("conf");

export default {
  computed: {
    ...mapState({
      contentHeight: state => state.pageHeight - 84 + "px"
    }),
    styles() {
      return {
        textAlign: "left",
        borderRight: "1px solid #dcdee2",
        flexBasis: "180px",
        maxWidth: "100%",
        minWidth: "60px"
      };
    }
  },
  components: {
    HeadBar,
    SideBar
  },
  beforeCreate() {
    this.$store.dispatch("user/getUserInfo").catch(err => {
      console.log(err);
    });
    this.$store.dispatch("employee/getAllEmployee", 0).catch(err => {
      console.log(err);
    });
    this.$store.dispatch("device/getAllDevice", 0).catch(err => {
      console.log(err);
    });
  }
};
</script>

<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.ivu-layout-sider {
  background-color: #515A6E
}
.ivu-layout-header {
  background: #f5f7f9;
}
</style>