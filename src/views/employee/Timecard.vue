<template>
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
</style>