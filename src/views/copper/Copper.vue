<template>
  <div id="copper">
    <Table :columns="columns" :data="list" :height="autoHeight"></Table>
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
    return {
      total: 0,
      page: 0,
      columns: [
        {
          title: "生成时间",
          key: "createTime",
          render: (h, par) => {
            return h("div", new Date(par.row.createTime).toLocaleString());
          }
        },
        {
          title: "小拉机名称",
          key: "deviceName"
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
  computed: {
    ...mapState({
      autoHeight: state => state.pageHeight - 160
    }),
    list() {
      return this.$store.state.copper.coppers;
    },
    size() {
      return this.$store.state.copper.pageSize;
    }
  },
  beforeMount() {
    this.$store
      .dispatch("copper/getAllCopper", this.page)
      .then(res => {
        this.total = res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    changePage(page) {
      this.$store
        .dispatch("copper/getAllCopper", page - 1)
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
      this.$store.commit("copper/changeSize", size);
      this.page = 0;
      this.$store
        .dispatch("copper/getAllCopper", this.page)
        .then(res => {
          this.total = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  destroyed() {
    this.$store.commit("copper/getCoppers", []);
  }
};
</script>

<style scoped>
</style>