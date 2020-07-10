<template>
  <div>
    <div :style="{marginBottom: '20px'}">
      <Card>
        <p slot="title">本月告警概况</p>
        <div>
          <Row :style="{display: 'flex', height: '100%', justifyContent: 'space-around'}">
            <Col span="6">
              <div :style="{display: 'flex', height: '100%', flexDirection: 'column', color: '#657180', justifyContent: 'space-around' }">
                <p>
                  一般告警
                  <span>178</span>条
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
      <Col span="8">
      <Date-picker type="datetime" v-model="startTime" format="yyyy-MM-dd HH:mm" placeholder="选择开始时间" :style="{width: '200px', marginRight: '20px'}"></Date-picker>
      <Date-picker type="datetime" v-model="endTime" format="yyyy-MM-dd HH:mm" placeholder="选择结束时间" :style="{width: '200px', marginRight: '20px'}"></Date-picker>
        <i-button type="primary" icon="ios-search">搜索</i-button>
      </Col>
    </Row>
    <Table :style="{marginTop: '20px'}" :columns="columns" :data="data1"></Table>
  </div>
  
</template>

<script>
import HandleWarn from "../../components/utils/HandleWarn";
export default {
  name: "warn",
  data() {
    return {
      startTime: "",
      endTime: "",
      warn: {
        handle: "未处理",
        total: "178条"
      },
      warn1: {
        handle: "处理中",
        total: "0条"
      },
      warn2: {
        handle: "已处理",
        total: "0条"
      },
      columns: [
        {
          title: "设备名称",
          key: "deviceName"
        },
        {
          title: "告警名称",
          key: "warnKey"
        },
        {
          title: "告警值",
          key: "warnValue"
        },
        {
          title: "故障类型",
          key: "warnType"
        },
        {
          title: "发生时间",
          key: "warnTime"
        },
        {
          title: "处理状态",
          key: "warnStatus"
        }
      ],
      data1: [
        {
          deviceName: "小拉机#71",
          warnKey: "小拉机闲置",
          warnValue: "12小时",
          warnTime: "2020-06-30 08:47:46",
          warnType: "一般告警",
          warnStatus: "未处理"
        }
      ],
      cityList: [
        {
          value: "A筛选",
          label: "A筛选"
        },
        {
          value: "B筛选",
          label: "B筛选"
        },
        {
          value: "C筛选",
          label: "C筛选"
        }
      ],
      model10: [],
      obj:[
        {
          value: "",
          value1: ""
        },
        {
          value: "",
          value1: ""
        },
        {
         value: "",
         value1: ""
        },
        {
          value: "",
          value1: ""
        },
        {
          value: "",
          value1: ""
        },
        {
          value: "",
          value1: ""
        }
      ]
    };
  },
  mounted() {
    this.initTime();
  },
  methods: {
    initTime() {
      let date = new Date();
      this.endTime = date;

      let mytime = new Date(
        new Date(new Date().toLocaleDateString()).getTime()
      );
      this.startTime = mytime;
    }
  },
  components: {
    HandleWarn
  }
};
</script>
