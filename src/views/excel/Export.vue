<template>
  <!-- 数据导入导出页面 -->
  <div id="export" :style="{ height: autoHeight }">
    <Divider>二维码生成</Divider>
    <Input
      v-model="content"
      search
      enter-button="生成二维码"
      placeholder="输入要生成的内容"
      @on-search="search"
    />
    <Modal v-model="modal" title="设备二维码，点击图片下载">
      <img :src="src" alt="二维码" width="100%" @click="download" />
    </Modal>
    <Divider>Excel导出</Divider>
    <Card class="card">
      <div @click="excel('employee')">
        <Icon type="md-albums" size="100" />
        <h3>员工数据</h3>
      </div>
    </Card>
    <Card class="card">
      <div @click="excel('device')">
        <Icon type="md-restaurant" size="100" />
        <h3>设备数据</h3>
      </div>
    </Card>
    <Divider>Excel员工考勤数据</Divider>
    <div style="display: flex">
      <span style="marginRight: 20px">员工卡号</span>
      <i-select
        v-model="employeeCard"
        :style="{ width: '200px', marginBottom: '10px', marginRight: '20px' }"
        @on-change="changeEmployee"
      >
        <i-option
          v-for="item in employees"
          :key="item.employeeCard"
          :value="item.employeeCard"
        >{{ item.employeeCard }}</i-option>
      </i-select>
      <Date-picker type="datetime" v-model="startTime" format="yyyy-MM-dd HH:mm" placeholder="选择开始时间" :style="{width: '200px', marginRight: '20px'}"></Date-picker>
      <Date-picker type="datetime" v-model="endTime" format="yyyy-MM-dd HH:mm" placeholder="选择结束时间" :style="{width: '200px', marginRight: '20px'}"></Date-picker>
    </div>
    <Card class="checkCard">
      <div @click="employeeExcel">
        <Icon type="md-folder" size="100" />
        <h3>考勤数据</h3>
      </div>
    </Card>
    <Divider>Excel导入</Divider>
    <!-- 上传数据组件 -->
    <Upload
      multiple
      type="drag"
      :headers="headers"
      :action="upload"
      accept=".xlsx, .xls"
      :on-success="handleSuccess"
    >
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>上传员工信息Excel（按照导出的员工信息excel格式）</p>
      </div>
    </Upload>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from "vuex";
const { mapState } = createNamespacedHelpers("conf");
import conf from "../../../conf";
export default {
  data() {
    return {
      upload: `${conf.serverUrl}/api/excel/upload/employee`,
      content: "",
      page: 0,
      modal: false,
      src: "",
      employeeCard: "",
      startTime: "",
      endTime: ""
    };
  },
  computed: {
    ...mapState({
      autoHeight: state => state.pageHeight - 280
    }),
    headers() {
      return {
        token: this.$store.state.user.token
      };
    },
    employees() {
      return this.$store.state.employee.employees;
    }
  },
  created() {
    this.$store.dispatch("employee/getAllEmployee", this.page).then(() => {
      let arr = this.$store.state.employee.employees;
      let employee = arr[0];
      let employeeCard = employee.employeeCard;
      this.employeeCard = employeeCard;
    });
    this.initTime();
  },
  methods: {
    /**
     * 获取二维码
     */
    search() {
      if (this.content !== "") {
        this.$store
          .dispatch("code/getImage", this.content)
          .then(res => {
            this.src = `${conf.serverUrl}/api/code?content=${this.content}`;
            this.modal = true;
          })
          .catch(err => {
            this.$Message.error(err);
          });
      } else {
        this.$Message.error("输入点东西吧");
      }
    },
    /**
     * 二维码下载
     */
    download() {
      window.open(this.src);
    },
    /**
     * excel下载
     */
    excel(con) {
      this.$axios
        .get(`/api/excel/download/${con}`, {
          responseType: "blob"
        })
        .then(res => {
          // 构造a标签触发click事件进行下载
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel;charset=utf-8"
          });
          let url = URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${con}.xls`);
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url);
        });
    },
    employeeExcel() {
      let startTime = this.startTime.getTime();
      let endTime = this.endTime.getTime();
      this.$axios
        .get(`/api/excel/download/employeeLog?employeeCard=${this.employeeCard}&start=${startTime}&end=${endTime}`, {
          responseType: "blob"
        })
        .then(res => {
          // 构造a标签触发click事件进行下载
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel;charset=utf-8"
          });
          let url = URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `employeeExcel.xls`);
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url);
        });
    },
    changeEmployee(type) {
      this.employeeCard = type
    },
    /**
     * 下载成功回调函数
     */
    handleSuccess(res, file) {
      if (res.code === 200) {
        this.$Message.success(res.msg);
      } else {
        this.$Message.error(res.msg);
      }
    },
    initTime() {
      let date = new Date();
      this.endTime = date;
      const start = new Date()
      start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), 1)) 
      this.startTime = start;
    }
  }
};
</script>

<style scoped>
#export {
  overflow: auto;
  height: 100%;
  text-align: center;
}
.card {
  display: inline-block;
  margin: 10px;
  width: 30%;
}
.checkCard {
  width: 30%;
  margin: 10px 10px 10px 350px ;
}
</style>
