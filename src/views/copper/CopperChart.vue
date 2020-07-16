<template>
  <div class="cop">
    <div :style="{display: 'flex', marginLeft: '50px'}">
      <i-select
        v-model="deviceId"
        :style="{width: '200px', marginBottom: '10px '}"
        @on-change="changeDevice"
      >
        <i-option
          v-for="item in devices"
          :key="item.deviceId"
          :value="item.deviceId"
        >{{ item.deviceName }}</i-option>
      </i-select>
    </div>
    <Divider>铜丝实际长度和重量统计</Divider>
    <Row type="flex" justify="space-around">
      <Col span="11">
        <Card>
          <ve-line :data="actData" :toolbox="toolbox" :data-zoom="dataZoom"></ve-line>
        </Card>
      </Col>
      <Col span="11">
        <Card>
          <ve-line :data="actWeightData" :toolbox="toolbox" :data-zoom="dataZoom"></ve-line>
        </Card>
      </Col>
    </Row>
    <Divider>铜丝班长度和重量统计</Divider>
    <Row type="flex" justify="space-around">
      <Col span="11">
        <Card>
          <ve-bar :data="classData"></ve-bar>
        </Card>
      </Col>
      <Col span="11">
        <Card>
          <ve-bar :data="classWeightData"></ve-bar>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from "vuex";
import "echarts/lib/component/toolbox";
const { mapState } = createNamespacedHelpers("conf");
export default {
  data() {
    return {
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100
        }
      ],
      page: 0,
      total: 0,
      deviceId: "",
      toolbox: {
        feature: {
          magicType: { type: ["line", "bar"] },
          saveAsImage: {}
        }
      }
    };
  },
  computed: {
    ...mapState({
      autoWidth: state => state.pageWidth - 320 + "px"
    }),
    devices() {
      return this.$store.state.device.devices;
    },
    actData() {
      let lis = this.$store.state.copperChart.actChartData;
      return {
        columns: ["时间", "实际长度"],
        rows: lis.map(e => {
          return {
            时间: e.hour,
            实际长度: e.actualLength
          }
        })
      };
    },
    actWeightData() {
      let lis = this.$store.state.copperChart.actChartData;
      return {
        columns: ["时间", "实际长度产量"],
        rows: lis.map(e => {
          return {
            时间: e.hour,
            实际长度产量: e.weight
          }
        })
      };
    },
    classData() {
      let lis = this.$store.state.copperChart.classChartData;
      return {
<<<<<<< HEAD
        columns: ["日期", "早班长度", "晚班长度","总长度"],
=======
        columns: ["日期", "早班长度", "晚班长度"],
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
        rows: lis
          .map(e => {
            return {
              日期: e.date,
              早班长度: e.outputOfMorning,
<<<<<<< HEAD
              晚班长度: e.outputOfNight,
              总长度: e.outputOfDay
=======
              晚班长度: e.outputOfNight
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
            }
          }) 
      };
    },
    classWeightData() {
      let lis = this.$store.state.copperChart.classChartData;
      return {
<<<<<<< HEAD
        columns: ["日期", "A班产量", "B班产量","总产量"],
=======
        columns: ["日期", "A班产量", "B班产量"],
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
        rows: lis
          .map(e => {
            return {
              日期: e.date,
              A班产量: e.copperWeightOfMorning,
<<<<<<< HEAD
              B班产量: e.copperWeightOfNight,
              总产量: e.copperWeight
=======
              B班产量: e.copperWeightOfNight
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
            }
          }) 
      };
    }
  },
  mounted() {
    this.$store.dispatch("device/getAllDevice", this.page).then(res => {
      this.deviceId = this.devices[0].deviceId;
      //请求实际长度数据
      this.$store.dispatch("copperChart/getActChart", this.deviceId);
      //请求班长度数据
      this.$store.dispatch("copperChart/getClassChart", this.deviceId);
    });
  },
  methods: {
    changeDevice(type) {
      this.$store.dispatch("copperChart/getChart", type);
    }
  }
};
</script>

<style scoped>
.card {
  position: relative;
}
.total-length {
  position: absolute;
  right: 30px;
  top: 20px;
  font-size: 16px;
  color: #abb5c5;
}
</style>