<template>
  <div>
    <div class="changeFrequency">
      <Steps :current="current" :status="status" :style="{ textAlign: 'center' }">
        <Step title="输入设备Id"></Step>
        <Step title="设置设备保养周期"></Step>
        <Step title="设置完成" :content="last"></Step>
      </Steps>
      <Input
        :style="{ width: '500px', margin: '20px auto' }"
        search
        v-model="content"
        enter-button="下一步"
        @on-search="next"
        placeholder="请输入相应内容"
      />
    </div>
    <Table border :columns="columns" :data="maintenanceInfo" :height="autoHeight"></Table>
    <!-- 分页 -->
    <Page
      show-sizer
      :total="total"
      :page-size="size"
      @on-change="changePage"
      @on-page-size-change="changeSize"
      :style="{marginTop: '20px'}"
    />
    <!-- 添加保养信息模态框 -->
    <Modal v-model="show" title="请输入保养信息" @on-ok="ok" @on-cancel="cancel">
      <Form :model="formItem">
        <FormItem label="输入保养人姓名">
          <Input v-model="formItem.name"></Input>
        </FormItem>
        <FormItem label="输入保养相关信息">
          <Input type="textarea" :rows="4" v-model="formItem.logInfo"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from "vuex";
const { mapState } = createNamespacedHelpers("conf");
export default {
  name: "maintenance",
  data() {
    let _that = this;
    return {
      show: false,
      formItem: {},
      current: 0,
      content: "",
      status: "process",
      create: {},
      last: "设置成功",
      page: 0,
      total: 0,
      warn: {
        handle: "设备总数",
        total: "5台"
      },
      warn2: {
        handle: "本月已保养次数",
        total: "3次"
      },
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
          title: "距离下次保养天数",
          key: "deviceCycle"
        },
        {
          title: "上次保养时间",
          key: "startTime"
        },
        {
          title: "下次需要保养时间",
          key: "endTime"
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
                  innerHTML: "保养"
                },
                style: {
                  marginLeft: "10px"
                },
                on: {
                  click: () => {
                    _that.addMaintenance(row.deviceId);
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "success"
                },
                domProps: {
                  innerHTML: "详情"
                },
                style: {
                  marginLeft: "10px"
                },
                on: {
                  click: () => {
                    _that.getDetail(row.deviceId);
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
    maintenanceInfo() {
      return this.$store.state.maintenance.maintenance;
    },
    ...mapState({
      autoHeight: state => state.pageHeight - 300
    }),
    size() {
      return this.$store.state.maintenance.pageSize;
    }
  },
  mounted() {
    this.$store.dispatch("maintenance/getMaintenance", this.page);
  },
  methods: {
    addMaintenance(deviceId) {
      this.show = true;
      this.formItem.deviceId = deviceId;
    },
    getDetail(deviceId) {
      const obj = {
        deviceId: deviceId,
        page: this.page
      }
      this.$store.dispatch("maintenanceDet/getDetail",obj);
      this.$router.push("maintenanceDetail");
    },
    ok() {
      this.$store.dispatch("maintenance/addMaintenance",this.formItem)
        .then(res => {
          this.$Message.success(res);
          this.$store.dispatch("maintenance/getMaintenance", this.page);
        })
      this.formItem = {};
    },
    cancel() {
      this.formItem = {};
    },
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
        this.create.deviceCycle = parseInt(this.content.trim());
        this.status = "wait";
        this.$store
          .dispatch("maintenance/changeFrequency", this.create)
          .then(res => {
            this.$store.dispatch("maintenance/getMaintenance", this.page);
            this.status = "finish";
            this.last = "设置成功";
            this.reset(500);
            this.$Message.info('设置成功');
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
        .dispatch("maintenance/getMaintenance", page - 1)
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
      this.$store.commit("maintenance/changeSize", size);
      this.page = 0;
      this.$store
        .dispatch("maintenanceDet/getMaintenance", this.page)
        .then(res => {
          this.total = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
