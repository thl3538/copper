<template>
  <div>
    <Divider>效率一览</Divider>
    <Row class="card-box">
      <Col span="24">
        <Row type="flex" justify="space-around" style="marginBottom: 20px">
          <Col span="7">
            <Card>
              <p slot="title">运行情况</p>
              <p>总体日均效率(m/s):{{detail.averEfficiency}}</p>
              <div>
                <p>最高效率(m/s): {{detail.maxEfficiency}}</p>
                <p>设备名称: {{detail.maxEffDevice}}</p>
              </div>
              <div>
                <p>最低效率(m/s): {{detail.minEfficiency}}</p>
                <p>设备名称: {{detail.minEffDevice}}</p>
              </div>
            </Card>
          </Col>
          <Col span="7">
            <Card>
              <p slot="title">运行情况</p>
              <p>总运行时长(min): {{detail.totalRunningTime}}</p>
              <p>闲置设备数量: {{detail.freeCounts}}</p>
              <p>累计时长(min): {{detail.freeTime}}</p>
            </Card>
          </Col>
          <Col span="7">
            <Card>
              <p slot="title">产量</p>
              <p>当天总产量(m): {{detail.totalOutput}}</p>
              <p>平均产量(m): {{detail.averOutput}}</p>
              <p>最高产量(m): {{detail.maxOutput}}</p>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
    <Divider>最近7日效率</Divider>
    <Row type="flex" justify="space-around" >
<<<<<<< HEAD
      <Col span="7" style="marginTop: 20px" class="active">
        <ve-pie :data="chartData" :settings="chartSettings"></ve-pie> 
      </Col>
      <Col span="15"  style="marginTop: 20px" class="active">
=======
      <Col span="7" style="marginTop: 40px" class="active">
        <ve-pie :data="chartData" :settings="chartSettings"></ve-pie> 
      </Col>
      <Col span="15" style="marginTop: 40px" class="active">
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
      </Col>
    </Row>
  </div>
</template>

<script>
import "echarts/lib/component/title";
export default {
  name: "allEfficiency",
  data() {
    return {
      chartSettings: {
        roseType: 'radius',
        title: '123',
        yAxisType: ['m/s'],
        yAxisName: ['效率']
      },
      chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '7/1', '访问用户': 1393 },
            { '日期': '7/2', '访问用户': 3530 },
            { '日期': '7/3', '访问用户': 2923 },
            { '日期': '7/4', '访问用户': 1723 },
            { '日期': '7/5', '访问用户': 3792 },
            { '日期': '7/6', '访问用户': 4593 },
            { '日期': '7/7', '访问用户': 4593 }
          ]
        }
    }
  },
  computed: {
    detail() {
      return this.$store.state.allEfficiency.detail;
    }
  },
  mounted() {
    this.$store.dispatch("allEfficiency/getDetail");
  }
};
</script>

<style scoped>
.card-box{
  font-size: 24px;
  font-weight: 700;
}
/* .ivu-card {
  background: #175890;
  color: #fff;
} */
.ivu-card /deep/ .ivu-card-body {
  height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
  justify-content: space-around;
}
.active{
  box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
<<<<<<< HEAD
  border-radius: 5px;
=======
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
}
</style>>
