<template>
  <!-- 员工信息页面 -->
  <div class="employee">
    <Row :style="{display: 'flex', marginBottom: '20px', flexDirection: 'row-reverse'}">
      <Col>
        <Button type="primary" @click="showAddModal">添加员工</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="list" :height="autoHeight"></Table>
    <Page
      show-sizer
      :total="total"
      :page-size="size"
      @on-change="changePage"
      @on-page-size-change="changeSize"
      :style="{marginTop: '20px'}"
    />
    <!-- 修改员工信息模态框 -->
    <Modal v-model="modal" title="修改员工信息" @on-ok="updateEmployee">
      <Form :model="formItem" :label-width="80">
        <FormItem label="卡号">
          <Input v-model="formItem.employeeCard" disabled></Input>
        </FormItem>
        <FormItem label="姓名">
          <Input v-model="formItem.employeeName"></Input>
        </FormItem>
        <FormItem label="年龄">
          <Input v-model="formItem.employeeAge"></Input>
        </FormItem>
        <FormItem label="性别">
          <Select v-model="formItem.employeeSex">
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="formItem.employeePhone"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 添加员工信息模态框 -->
    <Modal v-model="addModal" title="添加员工信息" @on-ok="addEmployee">
      <Form :model="addForm" :label-width="80">
        <FormItem label="用户名">
          <Input v-model="addForm.userName"></Input>
        </FormItem>
        <FormItem label="密码">
          <Input v-model="addForm.userPwd"></Input>
        </FormItem>
        <FormItem label="卡号">
          <Input v-model="addForm.employeeCard"></Input>
        </FormItem>
        <FormItem label="姓名">
          <Input v-model="addForm.employeeName"></Input>
        </FormItem>
        <FormItem label="年龄">
          <Input v-model="addForm.employeeAge"></Input>
        </FormItem>
        <FormItem label="性别">
          <Select v-model="addForm.employeeSex">
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="addForm.employeePhone"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from "vuex";
const { mapState } = createNamespacedHelpers("conf");
export default {
  data() {
    let _that = this;
    return {
      total: 0,
      page: 0,
      modal: false,
      addModal: false,
      formItem: {
        employeeCard: "",
        employeeName: "",
        employeeAge: "",
        employeeSex: "",
        employeePhone: ""
      },
      addForm: {
        employeeCard: "",
        employeeName: "",
        employeeAge: "",
        employeeSex: "",
        employeePhone: "",
        userName: "",
        userPwd: ""
      },
      // 表格表头
      columns: [
        {
          title: "员工卡号",
          key: "employeeCard"
        },
        {
          title: "员工姓名",
          key: "employeeName"
        },
        {
          title: "员工年龄",
          key: "employeeAge",
          sortable: true
        },
        {
          title: "员工性别",
          key: "employeeSex",
          filters: [
            {
              label: "男",
              value: "1"
            },
            {
              label: "女",
              value: "2"
            }
          ],
          // 条件过滤
          filterMethod(value, row) {
            if (value === "1") {
              return row.employeeSex === "男";
            } else if (value === "2") {
              return row.employeeSex === "女";
            }
          }
        },
        {
          title: "员工手机号",
          key: "employeePhone"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          // 按钮渲染
          render(h, { row }) {
            return [
              h("Button", {
                props: {
                  type: "info"
                },
                domProps: {
                  innerHTML: "修改"
                },
                style: {
                  marginRight: "10px"
                },
                on: {
                  click: () => {
                    _that.formItem = { ...row };
                    _that.showModal();
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
                    _that.removeEmployee(row.employeeCard);
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
      list: "employee/ascByTime"
    }),
    ...mapState({
      autoHeight: state => state.pageHeight - 160
    }),
    size() {
      return this.$store.state.employee.pageSize;
    },
    count() {
      return this.$store.state.employee.totalEmployee;
    }
  },
  beforeMount() {
    this.$store
      .dispatch("employee/getAllEmployee", this.page)
      .then(res => {
        this.total = res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    /**
     * 翻页
     */
    changePage(page) {
      this.$store
        .dispatch("employee/getAllEmployee", page - 1)
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
      this.$store.commit("employee/changeSize", size);
      this.page = 0;
      this.$store
        .dispatch("employee/getAllEmployee", this.page)
        .then(res => {
          this.total = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 删除员工信息
     */
    removeEmployee(card) {
      this.$Modal.confirm({
        title: "警告",
        content: "确定删除吗",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          this.$store
            .dispatch("employee/deleteEmployee", card)
            .then(res => {
              this.$Message.info(res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    /**
     * 显示模态框
     */
    showModal() {
      this.modal = !this.modal;
    },
    showAddModal() {
      this.addModal = !this.addModal;
    },
    /**
     * 添加员工信息
     */
    addEmployee() {
      this.$store
        .dispatch("employee/addEmployee", this.addForm)
        .then(res => {
          this.$Message.info(res);
          this.$store
            .dispatch("employee/getAllEmployee", this.page)
            .then(res => {
              this.total = res;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 修改员工信息
     */
    updateEmployee() {
      this.$store
        .dispatch("employee/updateEmployee", this.formItem)
        .then(res => {
          this.$Message.info(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>
