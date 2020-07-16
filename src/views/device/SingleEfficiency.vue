<template>
  <div>
    <Divider>效率总览</Divider>
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
    <!-- 实时效率 -->
    <Divider>实时效率</Divider>
    <Row type="flex" justify="space-around">
      <Col span="10">
        <Card>
          <ve-line :data="realChartData"></ve-line>
        </Card>
      </Col>
      <Col span="10">
        <Card>
          <Table
          border
          :columns="columns"
          :data="realEff"
          style="{marginTop: '60px,height: '350px'}"
        />
        </Card>
      </Col>
    </Row>
    <Divider>最近7天效率</Divider>
    <Row class="active"> 
      <Col span="24">
        <ve-line :data="dayEfficiency" ></ve-line>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "singleefficiency",
  data() {
    return {
      page: 0,
      total: 0,
      deviceId: "",
      chartSettings: {
        xAxisType: "time"
      },
      columns: [
        {
          title: "生成时间",
          key: "createTime",
          align: "center",
          render: (h, par) => {
            return h("div", new Date(par.row.createTime).toLocaleString());
          }
        },
        {
          title: "小拉机名称",
          key: "deviceName",
          align: "center"
        },
        {
          title: "实时效率(m/s)",
          key: "efficiency",
          align: "center"
        }
      ]
    };
  },
  beforeMount() {
    this.$store.dispatch("device/getAllDevice", this.page).then(res => {
      this.total = res;
      this.deviceId = this.devices[0].deviceId;
      this.$store.dispatch("singleEfficiency/getRealEfficiency", this.deviceId);
      this.$store.dispatch("singleEfficiency/getAverEfficiency", this.deviceId);
      this.$store.dispatch("copperChart/getClassChart", this.deviceId);
    });
  },
  computed: {
    devices() {
      return this.$store.state.device.devices;
    },
    deviceName() {
      return this.$store.state.singleEfficiency.deviceName;
    },
    averEff() {
      return this.$store.state.singleEfficiency.averEff;
    },
    realEff() {
      return this.$store.state.singleEfficiency.realEff;
    },
    realChartData() {
      let lis = this.$store.state.singleEfficiency.realEff;
      return {
        columns: ["生成时间", "实时效率"],
        rows: lis
        .sort((a,b) => {
          return a.createTime - b.createTime
        })
        .map(e => {
          return {
            生成时间: new Date(e.createTime).toLocaleString(),
            实时效率: e.efficiency
          };
        })
      };
    },
    dayEfficiency() {
      let lis = this.$store.state.copperChart.classEfficiency;
      return {
        columns: ["生成时间","白班效率","晚班效率","总效率"],
        rows: lis.map(e => {
          return {
            生成时间: e.date,
            白班效率: e.outputOfMorning,
            晚班效率: e.outputOfNight,
            总效率: e.outputOfDay
          }
        })
      }
    }
  },
  methods: {
    // 切换设备时改变数据
    changeDevice(type) {
      this.$store.dispatch("singleEfficiency/getAverEfficiency", type);
      this.$store.dispatch("singleEfficiency/getRealEfficiency", type);
    }
  }
};
</script>

<style scoped>
.ivu-select {
  display: flex;
}
.active {
  box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
  border-radius: 5px;
}
</style>