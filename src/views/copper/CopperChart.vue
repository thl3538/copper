<template>
  <div class="cop">
    <div :style="{display: 'flex', marginLeft: '50px'}">
      <i-select
        v-model="deviceId"
        :style="{width: '200px', marginBottom: '10px'}"
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
          <ve-line :data="actData" :toolbox="toolbox" :data-zoom="dataZoom" :loading="loading" :title="title1"></ve-line>
        </Card>
      </Col>
      <Col span="11">
        <Card>
          <ve-line :data="actWeightData" :toolbox="toolbox" :data-zoom="dataZoom" :loading="loading" :title="title2"></ve-line>
        </Card>
      </Col>
    </Row>
    <Divider>铜丝班长度和重量统计</Divider>
    <Row type="flex" justify="space-around">
      <Col span="11">
        <Card>
          <ve-bar :data="classData" :loading="loading" :title="title3"></ve-bar>
        </Card>
      </Col>
      <Col span="11">
        <Card>
          <ve-bar :data="classWeightData" :loading="loading" :title="title4"></ve-bar>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from "vuex";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/title";
const { mapState } = createNamespacedHelpers("conf");
import 'v-charts/lib/style.css'
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
      title1: {
        text: '实际长度(m)'
      },
      title2: {
        text: '实际长度产量(kg)'
      },
      title3: {
        text: '班长度(m)'
      },
      title4: {
        text: '班长度产量(kg)'
      },
      loading: true,
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
        columns: ["日期", "早班长度", "晚班长度","总长度"],
        rows: lis
          .map(e => {
            return {
              日期: e.date,
              早班长度: e.outputOfMorning,
              晚班长度: e.outputOfNight,
              总长度: e.outputOfDay
            }
          }) 
      };
    },
    classWeightData() {
      let lis = this.$store.state.copperChart.classChartData;
      return {
        columns: ["日期", "A班产量", "B班产量","总产量"],
        rows: lis
          .map(e => {
            return {
              日期: e.date,
              A班产量: e.copperWeightOfMorning,
              B班产量: e.copperWeightOfNight,
              总产量: e.copperWeight
            }
          }) 
      };
    }
  },
  mounted() {
    this.$store.dispatch("device/getAllDevice", this.page).then(res => {
      this.deviceId = this.devices[0].deviceId;
      //请求实际长度数据
      this.$store.dispatch("copperChart/getActChart", this.deviceId)
        .then(res => {
          this.loading = false;
        });
      //请求班长度数据
      this.$store.dispatch("copperChart/getClassChart", this.deviceId)
        .then(res => {
          this.loading = false;
        });
    });
  },
  methods: {
    changeDevice(type) {
      this.$store.dispatch("copperChart/getActChart", type);
      this.$store.dispatch("copperChart/getClassChart", type);
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