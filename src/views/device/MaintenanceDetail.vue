<template>
  <div>
    <div @click="goBack" class="goBack">
      <Icon type="md-arrow-back" />返回
    </div>
    <Divider>设备保养详情</Divider>
    <Table :height="autoHeight" border :columns="columns" :data="getDetail"></Table>
    <!-- 分页 -->
    <Page
      show-sizer
      :total="total"
      :page-size="size"
      @on-change="changePage"
      @on-page-size-change="changeSize"
      :style="{marginTop: '20px'}"
    />
  </div>
</template>
<script>
import { createNamespacedHelpers, mapGetters } from "vuex";
const { mapState } = createNamespacedHelpers("conf");
export default {
  name: "maintenancedetail",
  data() {
    return {
      total: 0,
      columns: [
        {
          title: "设备名称",
          key: "deviceName",
          width: "200"
        },
        {
          title: "负责保养人员",
          key: "userId",
          width: "200"
        },
        {
          title: "保养时间",
          key: "createTime",
          width: "400",
          render: (h, par) => {
            return h("div", new Date(par.row.createTime).toLocaleString());
          }
        },
        {
          title: "保养信息",
          key: "logInfo"
        }
      ]
    };
  },
  computed: {
    getDetail() {
      return this.$store.state.maintenanceDet.maintenanceDetail;
    },
    ...mapState({
      autoHeight: state => state.pageHeight - 280
    }),
    size() {
      return this.$store.state.maintenance.pageSize;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    /**
     * 翻页
     */
    changePage(page) {
      this.$store
        .dispatch("maintenance/getMaintenance", page - 1)
        .then(res => {
          this.total = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 调整页面大小
     */
    changeSize(size) {
      this.$store.commit("maintenanceDet/changeSize", size);
      this.page = 0;
      this.$store
        .dispatch("maintenanceDet/getMaintenance", this.page)
        .then(res => {
          this.total = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>

<style scoped>
.goBack {
  display: flex;
  font-size: 18px;
  font-weight: 600;
  align-items: center;
  color: #023e9a;
<<<<<<< HEAD
  cursor: pointer;
=======
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
}
</style>
