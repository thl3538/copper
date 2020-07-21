<template>
  <!-- 设备详情页面 -->
  <div id="detail">
    <Divider>
      当前设备:
      <span>{{ deviceId }} ( {{ online ? "在线" : "离线" }} )</span>
    </Divider>
    <Divider>当前数据</Divider>
    <Row type="flex" justifyContent="space-between">
      <Col span="8" v-for="item in items" :key="item.key">
        <Card>
          <p class="item-key">
            {{ item.title }}：
            <span class="item-value">{{ copper[item.key] }}</span>
            <span>&nbsp{{ item.suffix }}</span>
          </p>
        </Card>
      </Col>
    </Row>
    <!-- <Divider>生产任务进度: {{ percent }}%</Divider>
    <Progress :percent="percent" /> -->
    <Divider>历史统计</Divider>
    <Row type="flex" justify="space-between">
      <Col span="12">
        <Card class="circle-card">
          <ve-line :data="powerData" :settings="powerSet" :data-zoom="dataZoom" :width="autoWidth" />
        </Card>
      </Col>
      <Col span="12">
        <Card class="circle-card">
          <ve-line :data="statusData" :settings="statusSet" :data-zoom="dataZoom" :width="autoWidth" />
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from "vuex";
const { mapState } = createNamespacedHelpers("conf");
export default {
  data() {
    return {
      percent: 80,
      items: [
        {
          title: "实际长度",
          key: "actualLength",
          suffix: "m"
        },
        {
          title: "班长度",
          key: "theoreticalLength",
          suffix: "m"
        },
        {
          title: "线规",
          key: "wireGage",
          suffix: "mm"
        },
        {
          title: "累计运行时",
          key: "totalRunTimeHour",
          suffix: "H"
        },
        {
          title: "累计运行分",
          key: "totalRunTimeMin",
          suffix: "min"
        },
        {
          title: "运行标志",
          key: "runFlag",
          suffix: ""
        }
      ],
      powerSet: {},
      statusSet: {},
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 10
        }
      ]
    };
  },
  computed: {
    ...mapState({
      autoWidth: state => (state.pageWidth - 320) / 2 + "px"
    }),
    deviceId() {
      return this.$store.state.device.curDetail;
    },
    online() {
      return this.$store.state.device.online;
    },
    copper() {
      return this.$store.state.copper.copper;
    },
    powerData() {
      let lis = this.$store.state.copper.coppers;
      return {
        columns: ["时间", "电表电能"],
        rows: lis
          .sort((a, b) => {
            return a.createTime - b.createTime;
          })
          .map(e => {
            return {
              时间: new Date(e.createTime).toLocaleString(),
              电表电能: e.weight
            };
          })
      };
    },
    statusData() {
      let lis = this.$store.state.copper.coppers;
      return {
        columns: ["时间", "状态"],
        rows: lis
          .map(e => {
            return {
              时间: new Date(e.createTime).toLocaleString(),
              状态: e.runFlag
            };
          })
      };
    }
  },
  beforeMount() {
    this.$Spin.show();
    this.$store
      .dispatch("copper/getOneCopper", this.deviceId)
      .then(res => {
        this.$Spin.hide();
      })
      .catch(err => {
        console.log(err);
        this.$Spin.hide();
      });

    this.$store
      .dispatch("copper/getAllCopper", 0)
      .catch(err => {
        console.log(err);
      });

    this.$store
      .dispatch("device/getDeviceOnline", this.deviceId)
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.ivu-col {
  padding: 5px;
}
.item-key {
  color: black;
  font-weight: bold;
}
.item-value {
  color: red;
}
</style>
