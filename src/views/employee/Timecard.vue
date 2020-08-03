<template>
  <div>
    <Divider>历史考勤记录</Divider>
    <div class="punch">
      <div class="left">
        <span class="card">员工卡号</span>
        <i-select
          v-model="employeeCard"
          :style="{ width: '200px', marginBottom: '10px ' }"
          @on-change="changeEmployee"
        >
          <i-option
            v-for="item in employees"
            :key="item.employeeCard"
            :value="item.employeeCard"
            >{{ item.employeeCard }}</i-option
          >
        </i-select>
      </div>
    </div>
    <Table :columns="columns" :data="timeCard" :height="autoHeight"></Table>
    <Page
      show-sizer
      :total="total"
      :page-size="size"
      @on-change="changePage"
      @on-page-size-change="changeSize"
      :style="{ marginTop: '20px' }"
    />
  </div>
</template>
<script>
import { createNamespacedHelpers, mapGetters } from "vuex";
const { mapState } = createNamespacedHelpers("conf");
export default {
  data() {
    return {
      total: 0,
      page: 0,
      employeeCard: 0,
      columns: [
        {
          title: "员工姓名",
          key: "employeeName",
        },
        {
          title: "上班打卡时间",
          key: "createTime",
          render: (h, par) => {
            return h("div", new Date(par.row.createTime).toLocaleString());
          },
        },
        {
          title: "下班打卡时间",
          key: "createTime",
          render: (h, par) => {
            return h("div", new Date(par.row.updateTime).toLocaleString());
          },
        },
        {
          title: "当天状态",
          key: "status",
        },
        {
          title: "当天生产班长度(m)",
          key: "theoreticalLength",
        },
        {
          title: "当天生产产量(kg)",
          key: "weight",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      autoHeight: (state) => state.pageHeight - 300,
    }),
    size() {
      return this.$store.state.timeCard.pageSize;
    },
    employees() {
      return this.$store.state.employee.employees;
    },
    timeCard() {
      return this.$store.state.timeCard.timeCard;
    },
  },
  mounted() {
    this.$store.dispatch("employee/getAllEmployee", this.page).then(() => {
      let arr = this.$store.state.employee.employees;
      let employee = arr[0];
      let employeeCard = employee.employeeCard;
      this.employeeCard = employeeCard;
      let obj = {
        employeeCard: employeeCard,
        page: this.page,
      };
      this.$store.dispatch("timeCard/getTimeCard", obj);
    });
    // this.$store.dispatch("timeCard/initTimeCard",this.page);
  },
  methods: {
    /**
     * 切换页面
     */
    changePage(page) {
      let obj = {
        employeeCard: this.employeeCard,
        page: page,
      };
      this.$store.dispatch("timeCard/getTimeCard", obj);
    },
    /**
     * 调整页面大小
     */
    changeSize(size) {
      this.$store.commit("timeCard/changeSize", size);
      this.page = 0;
      let obj = {
        employeeCard: this.employeeCard,
        page: this.page,
      };
      this.$store.dispatch("timeCard/getTimeCard", obj);
    },
    changeEmployee(type) {
      this.employeeCard = type;
      let obj = {
        employeeCard: type,
        page: this.page,
      };
      this.$store.dispatch("timeCard/getTimeCard", obj);
    },
  },
};
</script>

<style scoped>
.punch {
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left {
  display: flex;
  align-items: center;
}
.card {
  margin-right: 10px;
}
</style>
