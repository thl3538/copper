<template>
  <!-- 设备信息页面 -->
  <div id="device">
    <Steps :current="current" :style="{ textAlign: 'center' }" :status="status">
      <Step title="输入设备编号" content="设备编号，说明书上有"></Step>
      <Step title="输入设备名称" content="设备的名称，不要包含特殊字符"></Step>
      <Step title="添加完成" :content="last"></Step>
    </Steps>
    <Input
      :style="{ width: '500px', margin: '20px auto' }"
      search
      v-model="content"
      enter-button="下一步"
      @on-search="next"
      placeholder="请输入相应内容"
    />
    <Divider>设备信息</Divider>
    <Table border :columns="columns" :data="list" :height="autoHeight"></Table>
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
export default {
  data() {
    let _that = this;
    return {
      modal: false,
      total: 0,
      page: 0,
      content: "",
      status: "process",
      last: "添加成功",
      current: 0,
      create: {},
      // 表格表头
      columns: [
        {
          title: "设备ID",
          key: "deviceId"
        },
        {
          title: "小车名称",
          key: "deviceName"
        },
        {
          title: "创建日期",
          key: "createTime",
          sortable: true,
          render: (h, par) => {
            return h("div", new Date(par.row.createTime).toLocaleString());
          }
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          // render函数渲染按钮
          render(h, { row }) {
            return [
              h("Button", {
                props: {
                  type: "info"
                },
                domProps: {
                  innerHTML: "详情"
                },
                style: {
                  marginLeft: "10px"
                },
                on: {
                  click: () => {
                    // 点击事件，出发删除操作
                    _that.getDetail(row.deviceId);
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "warning"
                },
                domProps: {
                  innerHTML: "删除"
                },
                style: {
                  marginLeft: "10px"
                },
                on: {
                  click: () => {
                    // 点击事件，出发删除操作
                    _that.removeDevice(row.deviceId);
                  }
                }
              })
            ];
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      list: "device/ascByTime"
    }),
    ...mapState({
      autoHeight: state => state.pageHeight - 320
    }),
    size() {
      return this.$store.state.device.pageSize;
    }
  },
  beforeMount() {
    this.$store
      .dispatch("device/getAllDevice", this.page)
      .then(res => {
        this.total = res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    /**
     * 创建设备步骤跳转
     */
    next() {
      if (this.content != "" && this.current == 0) {
        this.current++;
        this.create.deviceId = this.content.trim();
        this.content = "";
      } else if (this.content != "" && this.current == 1) {
        this.current++;
        this.create.deviceName = this.content.trim();
        this.status = "wait";
        this.$store
          .dispatch("device/createDevice", this.create)
          .then(res => {
            this.status = "finish";
            this.last = "创建成功";
            this.reset(500);
          })
          .catch(err => {
            this.status = "error";
            this.last = err;
            this.reset(2000);
          });
      }
    },
    /**
     * 重置步骤进度
     */
    reset(time) {
      let that = this;
      setTimeout(() => {
        this.current = 0;
        this.content = "";
      }, time);
    },
    /**
     * 翻页
     */
    changePage(page) {
      this.$store
        .dispatch("device/getAllDevice", page - 1)
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
      this.$store.commit("device/changeSize", size);
      this.page = 0;
      this.$store
        .dispatch("device/getAllDevice", this.page)
        .then(res => {
          this.total = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 删除设备
     */
    removeDevice(deviceId) {
      this.$Modal.confirm({
        title: "警告",
        content: "确定删除吗",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          this.$store
            .dispatch("device/deleteDevice", deviceId)
            .then(res => {
              this.$Message.info(res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    getDetail(deviceId) {
      this.$store.commit("device/updateDetail", deviceId);
      this.$router.push("detail");
    }
  }
};
</script>

<style scoped>
</style>
