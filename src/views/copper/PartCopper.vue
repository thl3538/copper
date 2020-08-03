<template>
  <div>
    <Divider>单台设备数据</Divider>
    <div class="option">
      <div style="display: flex; justifyContent: space-between">
        <div>
          <i-select
            v-model="deviceId"
            :style="{width: '200px', marginBottom: '10px '}"
            @on-change="changeDevice"
          >
            <i-option
              v-for="item in devices"
              :key="item.deviceId"
              :value="item.deviceId"
            >{{ item.deviceName }}</i-option>
          </i-select>
        </div>
        <div>
          <Date-picker
            type="datetime"
            v-model="startTime"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择开始时间"
            :style="{width: '200px', marginRight: '20px'}"
          ></Date-picker>
          <Date-picker
            type="datetime"
            v-model="endTime"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择结束时间"
            :style="{width: '200px', marginRight: '20px'}"
          ></Date-picker>
          <Button type="primary" @click="searchCopper">搜索</Button>
        </div>
      </div>
      <Table :columns="columns" :data="copper" :height="autoHeight"></Table>
    </div>
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
  name: "partcopper",
  data() {
    return {
      deviceId: "1009",
      page: 0,
      total: 0,
      startTime: "",
      endTime: "",
      columns: [
        {
          title: "生成时间",
          key: "createTime",
          render: (h, par) => {
            return h("div", new Date(par.row.createTime).toLocaleString());
          }
        },
        {
          title: "实际长度",
          key: "actualLength"
        },
        {
          title: "班长度",
          key: "theoreticalLength"
        },
        {
          title: "线规",
          key: "wireGage"
        },
        {
          title: "累计运行时",
          key: "totalRunTimeHour"
        },
        {
          title: "累计运行分",
          key: "totalRunTimeMin"
        },
        {
          title: "运行标志",
          key: "runFlag"
        }
      ]
    };
  },
  mounted() {
    this.$store.dispatch("device/getAllDevice", this.page).then(res => {
      this.total = res;
      this.deviceId = this.devices[0].deviceId;
      let deviceObj = {
        deviceId: this.deviceId,
        page: this.page
      };
      this.$store
        .dispatch("partCopper/getDeviceCopper", deviceObj)
        .then(res => {
          this.total = res;
        })
        .catch(err => {
          console.log(err);
        });
    });
    //初始化时间
    this.initTime();
  },
  computed: {
    ...mapState({
      autoHeight: state => state.pageHeight - 280
    }),
    devices() {
      return this.$store.state.device.devices;
    },
    size() {
      return this.$store.state.copper.pageSize;
    },
    copper() {
      return this.$store.state.partCopper.copper;
    }
  },
  methods: {
    initTime() {
      let date = new Date();
      this.endTime = date;
      
      let mytime = new Date(new Date(new Date().toLocaleDateString()).getTime());
      this.startTime = mytime;
    },
    changeDevice(type) {
      this.deviceId = type;
      let deviceObj = {
        deviceId: type,
        page: this.page
      };
      this.$store
        .dispatch("partCopper/getDeviceCopper", deviceObj)
        .then(res => {
          this.total = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 按时间搜索
     */
    searchCopper() {
      let startTime = new Date(this.startTime).getTime();
      let endTime = new Date(this.endTime).getTime();
      let deviceObj = {
        deviceId: this.deviceId,
        page: this.page,
        startTime: startTime,
        endTime: endTime
      };
      this.$store.dispatch("partCopper/searchCopper", deviceObj);
    },
    /**
     * 调整当前第几页
     */
    changePage(page) {
      let deviceObj = {
        deviceId: this.deviceId,
        page: page - 1
      };
      this.$store
        .dispatch("partCopper/getDeviceCopper", deviceObj)
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
      this.$store.commit("partCopper/changeSize", size);
      this.page = 0;
      this.$store
        .dispatch("partCopper/getDeviceCopper", this.page)
        .then(res => {
          this.$Message.success(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.option {
  text-align: left;
}
</style>