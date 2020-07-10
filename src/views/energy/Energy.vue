<template>
  <div>
    <Divider>能源分析</Divider>
    <Row>
      <Col :span="2">
        <div class="leftMenu" :style="{height: autoHeight}">
          <div
            class="menu-item"
            :class="{active: currentIndex == index}"
            v-for="(item,index) in devices"
            :key="index"
            @click="handleClick(index)"
          >{{item.deviceName}}</div>
        </div>
      </Col>
      <Col :span="22">
        <div class="modal">
          <Card v-if="cardPage < 1">
            <Modal :modal="modal" />
            <Modal :modal="modal" />
            <Modal :modal="modal" />
            <Modal :modal="modal" />
          </Card>
          <Card v-else>
            <Modal :modal="modal" />
            <Modal :modal="modal" />
            <Modal :modal="modal" />
          </Card>
          <div class="select">
            <div
              v-for="(item, index) in total"
              :key="index"
              @click="cardPage = index"
              class="select-item"
              :class="{isActive: cardPage == index}"
            ></div>
          </div>
        </div>
        <div class="modal">
          <Card>
            <p slot="title">日曲线图</p>
            <RadioGroup v-model="currentName">
              <Radio v-for="(item, index) in chartName" :key="index" :label="item"></Radio>
            </RadioGroup>
          </Card>
        </div>
        <div class="chart">
          <Card>
            <ve-line :data="chartData"></ve-line>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from "vuex";
const { mapState } = createNamespacedHelpers("conf");
import Modal from "../../components/utils/Modal";
export default {
  name: "energy",
  data() {
    return {
      page: 0, //请求所有设备传入的页数
      total: 2, //卡片页数
      currentIndex: 0, //左侧导航栏下标
      cardPage: 0, //当前卡片页数
      modal: {
        title: "相电压",
        firstRow: ["A电压", "220v"],
        secondRow: ["B电压", "220v"],
        thirdRow: ["C电压", "220v"]
      },
      chartSettings: {
        xAxisType: "time"
      },
      chartData: {
        columns: ["日期", "相电压"],
        rows: [
          { 日期: "00:00", 相电压: 139 },
          { 日期: "01:00", 相电压: 353 },
          { 日期: "02:00", 相电压: 292 },
          { 日期: "03:00", 相电压: 172 },
          { 日期: "04:00", 相电压: 379 },
          { 日期: "05:00", 相电压: 459 },
          { 日期: "06:00", 相电压: 459 },
          { 日期: "07:00", 相电压: 459 },
          { 日期: "08:00", 相电压: 459 },
          { 日期: "09:00", 相电压: 459 },
          { 日期: "10:00", 相电压: 459 },
          { 日期: "11:00", 相电压: 459 },
          { 日期: "12:00", 相电压: 459 },
        ]
      }
    };
  },
  components: {
    Modal
  },
  computed: {
    ...mapState({
      autoHeight: state => state.pageHeight - 180 + "px"
    }),
    devices() {
      return this.$store.state.device.devices;
    },
    // 当前显示图表
    chartName() {
      return this.$store.state.energy.chartName;
    },
    // 默认图表名称
    currentName() {
      return this.$store.state.energy.currentName;
    }
  },
  mounted() {
    this.$store.dispatch("device/getAllDevice", this.page).then(() => {
      let deviceId = this.devices[0].deviceId;
      this.$store.commit("energy/setDevice", deviceId);
    });
  },
  methods: {
    /**
     * 更改当前所选设备
     */
    handleClick(index) {
      this.currentIndex = index;
      let deviceId = this.devices[index].deviceId;
      this.$store.commit("energy/setDevice", deviceId);
    }
  }
};
</script>

<style scoped>
.leftMenu {
  width: 100%;
  background: #515a6e;
  color: #fff;
  margin: 0 10px 0 0;
  cursor: pointer;
}
.menu-item {
  padding: 10px 0;
}
.active {
  background: #00e3fe;
  color: #fff;
}
.modal {
  width: 100%;
  padding: 20px 10px;
  margin: 0 10px 0;
  position: relative;
}
.modal /deep/ .ivu-card-body {
  display: flex;
  justify-content: space-around;
}
.select {
  position: absolute;
  bottom: 0;
  left: 48%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.select-item {
  width: 12px;
  height: 12px;
  border: 1px solid #515a6e;
  border-radius: 50%;
  margin: 0 5px;
}
.isActive {
  background: #515a6e;
}
.chart{
  padding: 20px 10px;
  margin: 0 10px 0;
}
</style>