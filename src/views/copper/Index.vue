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
    <Row>
      <Col span="18">
        <Row>
          <Col span="6">
            <div class="box1 active">
              <div class="card">
                <div>
                  <Icon type="logo-rss" size="100" />
                </div>
                <div class="params">
                  <p class="mb">设备总数</p>
                  <p>{{ devices }}</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span="6">
            <div class="box2 active">
              <div class="card">
                <div>
                  <Icon type="logo-reddit" size="100" />
                </div>
                <div class="params">
                  <p class="mb">员工总数</p>
                  <p>{{ employees }}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row :style="{ marginTop: '40px', marginRight: '20px' }">
          <Col>
            <Card>
              <Divider>关于产量</Divider>
              <ve-line :data="employeeLog"></ve-line>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span="6" type="flex" justify="center">
        <Card>
          <p slot="title">最新消息</p>
          <Timeline>
            <TimelineItem v-for="(item, index) in warn" :key="index">
              <p class="time">{{ item.createTime }}</p>
              <p class="content">{{ item.logInfo }}</p>
            </TimelineItem>
          </Timeline>
        </Card>
        <div
          :style="{ marginTop: '30px', fontSize: '24px', fontWeight: 'bold' }"
        >
          <Card>
            <p slot="title">环境状态</p>
            <p>
              当前温度:
              <span :style="{ marginLeft: '10px' }">32度</span>
            </p>
            <p>
              当前湿度:
              <span :style="{ marginLeft: '10px' }">56%</span>
            </p>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import "v-charts/lib/style.css";
export default {
  name: "index",
  data() {
    return {
      dataEmpty: true,
    };
  },
  computed: {
    employees() {
      return this.$store.state.employee.totalEmployee;
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
    warn() {
      return this.$store.state.home.warning;
    },
  },
  beforeCreate() {
    this.$store.dispatch("user/getUserInfo").catch((err) => {
      console.log(err);
    });
  },
  mounted() {
    this.$store.dispatch("user/getUserInfo").then(() => {
      let userId = this.$store.state.user.userInfo.userId;
      this.$store.dispatch("home/attendence", userId);
    });
    this.$store.dispatch("home/warning");
  },
  methods: {
    clock() {
      this.$store
        .dispatch("home/clock")
        .then((res) => {
          console.log(res);
          this.$Message.success(res);
        })
        .catch((err) => {
          this.$Message.warning(err);
        });
    },
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
.box1 {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #36cc84;
  margin-right: 20px;
}
.box2 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background: #54caf0;
  margin-right: 20px;
}
.box3 {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #ec5657;
  margin-right: 20px;
}
.card {
  display: flex;
  height: 200px;
  padding: 20px 40px;
  align-items: center;
  justify-content: space-between;
}
.params {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.5;
  color: #fff;
}

.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
</style>
