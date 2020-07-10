<template>
    <div class="attendence">
        <Divider>考勤总览</Divider>
        <div :style="{display: 'flex', justifyContent: 'space-around'}" class="querryInfo">
            <Input style="width: 300px" search enter-button="查询" placeholder="输入姓名" />
            <Button type="primary" icon="md-cloud-download">导出</Button>
        </div>
        <Table style="marginTop: 20px" :columns="columns" :data="data1" ></Table>
    </div>
</template>

<script>
export default {
    name: "attendence",
    data() {
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
                    title: "工时/小时",
                    key: "worktime"
                }
            ],
            data1: [
                {
                    employeeCard: "1001",
                    employeeName: "张三",
                    date: "2020-06-21",
                    status: "未打卡",
                    starttime: "2020-06-21 09:00:00",
                    endtime: "2020-06-21 18:00:00",
                    worktime: "8"
                }
            ]
        }
    }
}
</script>

<style scoped>
</style>