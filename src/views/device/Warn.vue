<template>
  <div>
    <div :style="{marginBottom: '20px'}">
      <Card>
        <p slot="title">本月告警概况</p>
        <div>
          <Row :style="{display: 'flex', height: '100%', justifyContent: 'space-around'}">
            <Col span="6">
              <div :style="{display: 'flex', height: '100%', flexDirection: 'column', color: '#657180', justifyContent: 'space-around', fontWeigth: 'bold' }">
                <p>
                  一般告警
                  <span>{{generalAlarm}}</span>条
                </p>
                <p>
                  严重告警
                  <span>0</span>条
                </p>
                <p>
                  紧急告警
                  <span>0</span>条
                </p>
              </div>
            </Col>
            <Col
              span="18"
              :style="{display: 'flex', justifyContent: 'space-around', alignItems: 'center', color: '#2D8CF0', height: '100%'}"
            >
            <HandleWarn :warn="warn" />
              <HandleWarn :warn="warn1" />
              <HandleWarn :warn="warn2" />
            </Col>
          </Row>
        </div>
      </Card>
    </div>
    <Row>
      <Col span="12" :style="{display: 'flex', alignItems: 'center'}">
      <Date-picker type="datetime" v-model="startTime" format="yyyy-MM-dd HH:mm" placeholder="选择开始时间" :style="{width: '200px', marginRight: '20px'}"></Date-picker>
      <Date-picker type="datetime" v-model="endTime" format="yyyy-MM-dd HH:mm" placeholder="选择结束时间" :style="{width: '200px', marginRight: '20px'}"></Date-picker>
      <i-select
            v-model="deviceId"
            :style="{width: '200px',marginRight: '20px'}"
            @on-change="changeDevice"
          >
            <i-option
              v-for="item in devices"
              :key="item.deviceId"
              :value="item.deviceId"
            >{{ item.deviceName }}</i-option>
          </i-select>
      <i-button type="primary" @click="filterData" icon="ios-search">筛选</i-button>
      </Col>
    </Row>
    <Table :style="{marginTop: '20px'}" :columns="columns" :data="warnData" :height="autoHeight"></Table>
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
import HandleWarn from "../../components/utils/HandleWarn";
export default {
  name: "warn",
  data() {
    let _that = this;
    return {
      startTime: "",
      endTime: "",
      deviceId: "",
      generalAlarm: 0,
      warn: {
        handle: "未处理",
        total: 0
      },
      warn1: {
        handle: "处理中",
        total: 0
      },
      warn2: {
        handle: "已处理",
        total: 0
      },
      page: 0,
      total: 0,
      columns: [
        {
          title: "设备Id",
          key: "deviceId"
        },
        {
          title: "设备名称",
          key: "deviceName"
        },
        {
          title: "告警名称",
          key: "logInfo"
        },
        // {
        //   title: "告警值",
        //   key: "warnValue"
        // },
        {
          title: "故障类型",
          key: "logType"
        },
        {
          title: "故障id",
          key: "logId",
          width: "0"
        },
        {
          title: "发生时间",
          key: "warnTime",
          render: (h, par) => {
            return h("div", new Date(par.row.createTime).toLocaleString());
          }
        },
        {
          title: "处理状态",
          key: "status"
        },
        {
          title: "添加保养说明",
          key: "action",
          width: 200,
          align: "center",
          render(h, { row }) {
            return [
              h("Button", {
                props: {
                  type: "success"
                },
                domProps: {
                  innerHTML: "处理"
                },
                style: {
                  marginLeft: "10px"
                },
                on: {
                  click: () => {
                    _that.handle(row.logId);
                  }
                }
              })
            ];
          }
        }
      ],
    };
  },
  computed: {
    warnData() {
      return this.$store.state.warn.warn;
    },
    ...mapState({
      autoHeight: state => state.pageHeight - 540
    }),
    size() {
      return this.$store.state.warn.pageSize;
    },
    devices() {
      return this.$store.state.device.devices;
    }
  },
  mounted() {
    this.initTime();
  },
  created() {
    this.$store.dispatch("warn/getWarnData", this.page)
      .then(res => {
        this.total = res;
      })
      .catch(err => {
        console.log(err);
      });
    this.$store.dispatch("warn/getHandleData")
      .then(res => {
        this.warn.total = res.untreated;
        this.warn2.total = res.processed;
        this.generalAlarm = res.untreated + res.processed;
      })
  },
  methods: {
    initTime() {
      let date = new Date();
      this.endTime = date;

      let mytime = new Date(
        new Date(new Date().toLocaleDateString()).getTime()
      );
      this.startTime = mytime;
    },
    changePage(page) {
      this.$store
        .dispatch("warn/getWarnData", page - 1)
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
      this.$store.commit("warn/changeSize", size);
      this.page = 0;
      this.$store
        .dispatch("warn/getWarnData", this.page)
        .then(res => {
          this.total = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 筛选数据
     */
    filterData() {
      let startTime = new Date(this.startTime).getTime();
      let endTime = new Date(this.endTime).getTime();
      let obj = {
        deviceId: this.deviceId,
        page: this.page,
        startTime: startTime,
        endTime: endTime
      }
      this.$store.dispatch("warn/filterData", obj)
        .then(res => {
          this.total = res;
        })
        .catch(err => {
          console.log(err);
        })
    },
    handle(logId) {
      this.warn.total -= 1;
      this.warn2.total += 1;
      this.$store.dispatch("warn/handle",logId)
        .then(res => {
          this.$store.dispatch("warn/getWarnData", this.page)
      .then(res => {
        this.total = res;
      })
      .catch(err => {
        console.log(err);
      });
        })
    },
    changeDevice(type) {
      this.deviceId = type;
    }
  },
  components: {
    HandleWarn
  } 
};
</script>
