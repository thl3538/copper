<template>
<<<<<<< HEAD
  <div>
    <Divider>历史考勤记录</Divider>
    <div class="punch">
      <Button type="info">打卡</Button>
    </div>
    <Table :columns="columns10" :data="data9" :height="autoHeight"></Table>
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
import expandRow from "./table-expand.vue";
import { createNamespacedHelpers, mapGetters } from "vuex";
const { mapState } = createNamespacedHelpers("conf");
export default {
  components: { expandRow },
  data() {
    return {
      total: 0,
      columns10: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data9: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          job: "Data engineer",
          interest: "badminton",
          birthday: "1991-05-14",
          book: "Steve Jobs",
          movie: "The Prestige",
          music: "I Cry"
        },
        {
          name: "Jim Green",
          age: 25,
          address: "London No. 1 Lake Park",
          job: "Data Scientist",
          interest: "volleyball",
          birthday: "1989-03-18",
          book: "My Struggle",
          movie: "Roman Holiday",
          music: "My Heart Will Go On"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          job: "Data Product Manager",
          interest: "tennis",
          birthday: "1992-01-31",
          book: "Win",
          movie: "Jobs",
          music: "Don’t Cry"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          job: "Data Analyst",
          interest: "snooker",
          birthday: "1988-7-25",
          book: "A Dream in Red Mansions",
          movie: "A Chinese Ghost Story",
          music: "actor"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      autoHeight: state => state.pageHeight - 300
    }),
    size() {
        return this.$store.state.timeCard.pageSize;
    }
  },
  methods: {
      /**
     * 切换页面
     */
    changePage(page) {
      
    },
    /**
     * 调整页面大小
     */
    changeSize(size) {
      this.$store.commit("timeCard/changeSize", size);
      this.page = 0;
      
    },
  }
};
</script>

<style scoped>
.punch {
  padding: 10px 0;
  display: flex;
  flex-direction: row-reverse;
}
=======
    <div class="timecard">
        <Divider>点击打卡状态打卡</Divider>
        <Table :columns="columns" :data="data1" ></Table>
    </div>
</template>

<script>
export default {
    name: "timecard",
    data() {
        let _that = this;
        return {    
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
                    title: "打卡日期",
                    key: "date"
                },
                {
                    title: "打卡状态",
                    key: "status",
                },
                {
                    title: "打卡开始时间",
                    key: "starttime"
                },
                {
                    title: "打卡结束时间",
                    key: "endtime"
                },
                {
                    title: "操作",
                    key: "action",
                    width: 100,
                    align: "center",
                    //render函数渲染按钮
                    render(h, { row }) {
                        return [
                            h("Button", {
                              props: {
                              type: "info"
                              },
                            domProps: {
                              innerHTML: "打卡"
                            },
                            on: {
                            click: () => {
                                // 点击事件，出发删除操作
                              _that.clockIn(row.employeeCard);
                            }
                            }
                            })
                        ]
                    }
                }
            ],
            data1: [
                {
                    employeeCard: "1001",
                    employeeName: "张三",
                    date: "2020-06-21",
                    status: "未打卡",
                    starttime: "2020-06-21 09:00:00",
                    endtime: "2020-06-21 18:00:00"
                }
            ]
        }
    },
    methods: {
        clockIn(id){
            console.log(id);
        }
    }
}
</script>

<style scoped>
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
</style>