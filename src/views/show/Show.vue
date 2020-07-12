<template>
  <div id="search">
    <Row type="flex" justify="space-between">
      <Col span="12">
        <Card :dis-hover="disHover">
          <ve-line />
        </Card>
      </Col>
      <Col span="12">
        <Card :dis-hover="disHover">
          <ve-line />
        </Card>
      </Col>
      <Col span="12">
        <Card :dis-hover="disHover">
          <ve-line />
        </Card>
      </Col>
      <Col span="12">
        <Card :dis-hover="disHover">
          <ve-line />
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disHover: true
    };
  },
  computed: {
    deviceId() {
      return this.$store.state.device.curDetail;
    }
  }
};
</script>

<style scoped>
.ivu-col {
  padding: 10px;
}
</style>