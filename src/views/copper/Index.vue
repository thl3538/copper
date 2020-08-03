<template>
  <div>
    <div class="active welcome">
      <div class="left">
        <Icon size="60" type="ios-person-outline" />
      </div>
      <div class="middle">
        <p class="name">{{ userName }}</p>
        <p class="info">
          <span class="mr">{{ enterpriseName }}</span>
          <span>联系方式 {{ userPhone }}</span>
        </p>
      </div>
      <div class="right">
        <Button @click="clock" type="primary">打卡</Button>
      </div>
    </div>
    <Row type="flex" justify="space-between">
      <Col span="17">
        <Card>
          <div :style="{display: 'flex', justifyContent: 'space-around'}">
            <div style="background: #1CA3FF" class="top-box">
              <p>当前总长度</p>
              <span>{{ totalLength}}m</span>
            </div>
            <div style="background: #F84F77" class="top-box">
              <p>当前总产量</p>
              <span>{{ totalWeight }}kg</span>
            </div>
            <div style="background: #F7B84F" class="top-box">
              <p>生产效率最低设备名称</p>
              <span>{{ lowDevice }}</span>
            </div>
            <div style="background: #27D7C0" class="top-box">
              <p>环境数据</p>
              <p>
                <span>温度</span>
                <span>{{environment.temperature}}</span>
              </p>
              <p>
                <span>湿度</span>
                <span>{{ environment.humidity}}</span>
              </p>
            </div>
          </div>
        </Card>
        <Divider>设备状态</Divider>
        <Card>
          <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}">
            <div v-if="identity === 'Employee'" style="fontWeight: 600">
              <p>小拉机名称</p>
              <p>在线状态</p>
            </div>
            <div v-else>
              <i-select
                v-model="employeeName"
                :style="{ width: '100px', marginBottom: '10px' }"
                @on-change="changeEmployee"
              >
                <i-option
                  v-for="item in employees"
                  :key="item.employeeName"
                  :value="item.employeeName"
                >{{ item.employeeName }}</i-option>
              </i-select>
            </div>
            <div style="background: #31C9E8" class="is-online"
             v-for="(item, index) in deviceOnline" :key="item.deviceName">
             <div>
               <p>
                <span>{{item.deviceName}}</span>
              </p>
              <p>
                <span :class="{offline: item.deviceStatus == '离线'}">{{item.deviceStatus}}</span>
              </p>
             </div>
             <div class="img">
               <img src="../../assets/小拉机.jpeg" alt="">
             </div>
            </div>
          </div>
        </Card>
        <Row type="flex">
          <Col span="14">
            <div :style="{display: 'flex',marginTop: '10px'}">
            <div class="bot-box">
              <i-select
                v-model="deviceId"
                :style="{ width: '200px', marginBottom: '10px' }"
                @on-change="changeDevice"
              >
                <i-option
                  v-for="item in devices"
                  :key="item.deviceId"
                  :value="item.deviceId"
                >{{ item.deviceName }}</i-option>
              </i-select>
              <ve-line width="400px" height="350px" :data="realChartData"></ve-line>
            </div>
            <div class="gauge">
               <ve-gauge width="280px" :title="title1" :data="allEff" :settings="chartSettings"></ve-gauge>
               <ve-gauge width="280px" :title="title2" :data="highEff" :settings="chartSettings"></ve-gauge>
            </div>
          </div>
          </Col>
        </Row>
      </Col>
      <Col span="6">
        <Card style="marginBottom: 20px">
          <p slot="title">通知信息</p>
          <Timeline>
            <TimelineItem>
              <p class="time">2020/7/27 下午5:35:47</p>
              <p class="content">今晚开会</p>
            </TimelineItem>
          </Timeline>
        </Card>
        <Card style="marginBottom: 20px">
          <p slot="title">报警信息</p>
          <Timeline>
            <TimelineItem v-for="(item, index) in warn" :key="index">
              <p class="time">{{ item.createTime }}</p>
              <p class="content">{{ item.logInfo }}</p>
            </TimelineItem>
          </Timeline>
        </Card>
        <Card>
          <p slot="title">保养信息</p>
          <Timeline>
            <TimelineItem v-for="item in maintenance" :key="item.deviceId">
              <p class="time">{{item.createTime}}</p>
              <p class="content">{{item.logInfo}}</p>
            </TimelineItem>
          </Timeline>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import "v-charts/lib/style.css";
import conf from "../../../conf";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("conf");
export default {
  name: "index",
  data() {
    this.chartSettings = {
      dimension: "type",
      metrics: "value",
    };
    return {
      dataEmpty: true,
      employeeCard: "",
      page: 0,
      webscok: null,
      deviceId: "542531577",
      environment: {
        temperature: "",
        humidity: ""
      },
      chartData: {
        columns: ["a", "b", "type", "value"],
        rows: [{ type: "速度", value: 80, a: 1, b: 2 }],
      },
      employeeName: "",
      columns: [
        {
          title: "生成时间",
          key: "createTime",
          align: "center",
          render: (h, par) => {
            return h("div", new Date(par.row.createTime).toLocaleString());
          },
        },
        {
          title: "小拉机名称",
          key: "deviceName",
          align: "center",
        },
        {
          title: "实时效率(m/s)",
          key: "efficiency",
          align: "center",
        },
      ],
      title1: {
        text: "日均效率(m/s)"
      },
      title2: {
        text: "最高效率(m)"
      },
    };
  },
  computed: {
    ...mapState({
      autoHeight: (state) => (state.pageHeight - 400) / 2 + "px",
    }),
    totalEmployee() {
      return this.$store.state.employee.totalEmployee;
    },
    employees() {
      return this.$store.state.employee.employees;
    },
    devices() {
      return this.$store.state.device.totalDevice;
    },
    status() {
      return this.$store.state.home.status;
    },
    userName() {
      return this.$store.state.user.userInfo.userName;
    },
    enterpriseName() {
      return this.$store.state.user.userInfo.enterpriseName;
    },
    userPhone() {
      return this.$store.state.user.userInfo.userPhone;
    },
    employeeLog() {
      let lis = this.$store.state.home.employeeLog;
      return {
        columns: ["时间", "产量"],
        rows: lis.map((e) => {
          return {
            时间: new Date(e.createTime).toLocaleString(),
            产量: e.weight,
          };
        }),
      };
    },
    allEff() {
      let lis = this.$store.state.allEfficiency.detail.averEfficiency;
      return {
        columns: ["a", "b", "type", "value"],
        rows: [{ type: "日均效率", value: lis, a: 1, b: 2 }],
      }
    },
    highEff() {
      let lis = this.$store.state.allEfficiency.detail.maxEfficiency;
      return {
        columns: ["a", "b", "type", "value"],
        rows: [{ type: "最高效率", value: lis, a: 0.5, b: 1 }],
      }
    },
    warn() {
      return this.$store.state.home.warning;
    },
    maintenance() {
      return this.$store.state.home.maintenance;
    },
    identity() {
      return this.$store.state.user.identity;
    },
    realChartData() {
      let lis = this.$store.state.singleEfficiency.realEff;
      return {
        columns: ["生成时间", "实时效率"],
        rows: lis
          .sort((a, b) => {
            return a.createTime - b.createTime;
          })
          .map((e) => {
            return {
              生成时间: new Date(e.createTime).toLocaleString(),
              实时效率: e.efficiency,
            };
          }),
      };
    },
    devices() {
      return this.$store.state.device.devices;
    },
    lowDevice() {
      return this.$store.state.home.productData.deviceName;
    },
    totalLength() {
      return this.$store.state.home.productData.theoreticalLengthTotal;
    },
    totalWeight() {
      return this.$store.state.home.productData.weightTotal;
    },
    deviceOnline() {
      return this.$store.state.home.deviceOnline;
    }
  },
  created() {
    this.$store.dispatch("user/getUserInfo").catch((err) => {
      console.log(err);
    });
    this.$store.dispatch("singleEfficiency/getRealEfficiency", this.deviceId);
    this.$store.dispatch("home/getProduct");
    this.$store.dispatch("allEfficiency/getDetail");
    //页面刚进入时开启长连接
    this.initWebSocket();
  },
  mounted() {
    this.$store.dispatch("user/getUserInfo").then(() => {
      let userName = this.$store.state.user.userInfo.userName;
      let identity = this.$store.state.user.userInfo.identity;
      if (identity == "Employee") {
        this.$store.dispatch("home/changeEmployee", userName);
      } else {
        this.$store.dispatch("employee/getAllEmployee", this.page).then(() => {
          let arr = this.$store.state.employee.employees;
          let employee = arr[0];
          let employeeName = employee.employeeName;
          this.employeeName = employeeName;
          this.$store.dispatch("home/changeEmployee", employeeName);
        });
      }
    });
    this.$store.dispatch("home/warning");
  },
  destroyed() {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
  methods: {
    clock() {
      this.$store
        .dispatch("home/clock")
        .then((res) => {
          this.$Message.success(res);
        })
        .catch((err) => {
          this.$Message.warning("管理员未开放打卡功能");
        });
    },
    changeEmployee(type) {
      this.employeeCard = type;
      this.$store.dispatch("home/getOneOutput", type);
    },
    initWebSocket() {
      const wsuri = `${conf.wsUrl}/socketServer/张三`; //ws地址
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      // console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      let data = e.data.split(",");
      this.environment.humidity = data[0];
      this.environment.temperature = data[1];
      //数据接收
      // const redata = JSON.parse(e.data); //注意：长连接我们是后台直接1秒推送一条数据，
      //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
      // console.log(redata);
    },

    websocketsend(agentData) {
      //数据发送
      this.websock.send(agentData);
    },
    websocketclose(e) {
      //关闭
      console.log("connection closed");
    },
    // 切换设备时改变数据
    changeDevice(type) {
      this.$store.dispatch("singleEfficiency/getRealEfficiency", type);
    },
    changeEmployee(type) {
      this.$store.dispatch("home/changeEmployee",type);
    }
  },
};
</script>

<style scoped>
.welcome {
  margin-bottom: 30px;
}
.active {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 10px;
  border-radius: 5px;
}
.welcome {
  padding: 10px;
  display: flex;
  align-items: center;
}
.back {
  margin-right: 10px;
}
.avatar {
  width: 60px;
  height: 60px;
}
.name {
  padding: 5px 0 0 0;
  font-size: 14px;
  color: #42c1a2;
  text-align: left;
}
.info {
  text-align: left;
  color: #24a5f9;
}
.mr {
  margin-right: 20px;
}
.middle {
  flex: 1;
}
.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
.left {
  display: flex;
  align-items: center;
}

.top-box {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 10px;
  border-radius: 5px;
  padding: 20px 10px;
  width: 170px;
  box-sizing: border-box;
  color: #fff;
}
.blue-color {
  color: #24a5f9;
}
.green-color {
  font-size: 14px;
  font-weight: 600;
}
.ivu-select {
  display: flex;
}
.bot-box {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 10px;
  padding: 5px 5px;
  border-radius: 5px;
}
.gauge {
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 10px;
  padding: 20px 0px 0px 0px;
  border-radius: 5px;
  margin: 0 0 0 20px;
}
.offline {
 color: red;
}
.is-online {
  box-shadow: rgba(2, 1, 1, 0.35) 0px 2px 10px;
  border-radius: 5px;
  padding: 20px 10px;
  width: 170px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  justify-content: space-around;
}
img {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
