<template>
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
</style>