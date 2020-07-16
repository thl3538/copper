<template>
  <div>
    <div class="active welcome">
      <div class="left">
        <Icon size="60" type="ios-person-outline" />
      </div>
      <div class="middle">
        <p class="name">张三</p>
        <p class="info">
          <span class="mr">所属部门 小拉机管理员</span>
          <span class="mr">员工卡号 1001</span>
          <span>管理设备 小拉机#77</span>
        </p>
      </div>
      <div class="right">
        <Button type="primary">打卡</Button>
      </div>
    </div>
    <Row>
      <Col span="18">
        <Row>
          <Col span="7">
            <div class="box1 active">
              <div class="card">
                <div>
                  <Icon type="logo-rss" size="100" />
                </div>
                <div class="params">
                  <p class="mb">设备总数</p>
                  <p>4台</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span="7">
            <div class="box2 active">
              <div class="card">
                <div>
                  <Icon type="logo-reddit" size="100" />
                </div>
                <div class="params">
                  <p class="mb">员工总数</p>
                  <p>5人</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span="7">
            <div class="box3 active">
              <div class="card">
                <div>
                  <Icon type="ios-paper-plane-outline" size="100" />
                </div>
                <div class="params">
                  <p class="mb">当前状态</p>
                  <p>上班</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row :style="{marginTop: '40px', marginRight: '20px'}">
          <Col>
            <Card>
                <ve-line :data="chartData"></ve-line>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span="6" type="flex" justify="center">
        <Card>
          <p slot="title">最新消息</p>
          <Timeline>
            <TimelineItem>
              <p class="time">1976年</p>
              <p class="content">Apple I 问世</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">1984年</p>
              <p class="content">发布 Macintosh</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2007年</p>
              <p class="content">发布 iPhone</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2010年</p>
              <p class="content">发布 iPad</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2011年10月5日</p>
              <p class="content">史蒂夫·乔布斯去世</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2011年10月5日</p>
              <p class="content">史蒂夫·乔布斯去世</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2011年10月5日</p>
              <p class="content">史蒂夫·乔布斯去世</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2011年10月5日</p>
              <p class="content">史蒂夫·乔布斯去世</p>
            </TimelineItem>
          </Timeline>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      chartData: {
        columns: ["日期", "成本", "利润"],
        rows: [
          { 日期: "1月1日", 成本: 15, 利润: 12 },
          { 日期: "1月2日", 成本: 12, 利润: 25 },
          { 日期: "1月3日", 成本: 21, 利润: 10 },
          { 日期: "1月4日", 成本: 41, 利润: 32 },
          { 日期: "1月5日", 成本: 31, 利润: 30 },
          { 日期: "1月6日", 成本: 71, 利润: 55 }
        ]
      }
    };
  }
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
  width: 400px;
  height: 200px;
  padding: 20px 40px;
  align-items: center;
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