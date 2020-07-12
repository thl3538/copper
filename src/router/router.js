import store from "../store/index";

export default [
  // 重定向到主页
  {
    path: "/",
    redirect: "/home"
  },
  // 登录页
  {
    path: "/login",
    name: "login",
    component: () => import("../views/user/Login.vue")
  },
  // 主页面，若本地用户token不存在则跳转到登录页
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
    beforeEnter: (to, from, next) => {
      const token = store.state.user.token;
      if (token) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    // 默认展示母线页面
    redirect: "/home/copper",
    children: [
      // 信息查询展示页面
      {
        path: "show",
        name: "show",
        component: () => import("../views/show/Show.vue")
      },
      // 数据导出子页面
      {
        path: "export",
        name: "export",
        component: () => import("../views/excel/Export.vue")
      },
      // 铜丝数据页面
      {
        path: "copper",
        name: "copper",
        component: () => import("../views/copper/Copper.vue")
      },
      // 单台设备铜丝数据
      {
        path: "partcopper",
        name: "partcopper",
        component: () => import("../views/copper/PartCopper.vue")
      },
      // 铜丝数据图表展示
      {
        path: "copperchart",
        name: "copperchart",
        component: () => import("../views/copper/CopperChart.vue")
      },
      // 设备数据子页面
      {
        path: "device",
        name: "device",
        component: () => import("../views/device/Device.vue")
      },
      // 员工信息子页面
      {
        path: "employee",
        name: "employee",
        component: () => import("../views/employee/Employee.vue")
      },
      // 设备详情页面
      {
        path: "detail",
        name: "detail",
        component: () => import("../views/device/Detail.vue")
      },
      //设备总详情页面
      {
        path: "allefficiency",
        name: "allefficiency",
        component: () => import("../views/device/AllEfficiency.vue")
      },
      //单台设备详情页面
      {
        path: "singleefficiency",
        name: "singleefficiency",
        component: () => import("../views/device/SingleEfficiency.vue")
      },
      //设备保养页面
      {
        path: "maintenance",
        name: "maintenance",
        component: () => import("../views/device/Maintenance.vue")
      },
      //保养详情页面
      {
        path: "maintenanceDetail",
        name: "maintenanceDetail",
        component: () => import("../views/device/MaintenanceDetail.vue")
      },
      //设备预警页面‘
      {
        path: "warn",
        name: "warn",
        component: () => import("../views/device/Warn.vue")
      },
      // 能源分析页面
      {
        path: "energy",
        name: "energy",
        component: () => import("../views/energy/Energy.vue")
      },
      //员工打卡页面
      {
        path: "timecard",
        name: "timecard",
        component: () => import("../views/employee/Timecard.vue")
      },
      // 员工考勤总览
      {
        path: "attendence",
        name: "attendence",
        component: () => import("../views/employee/Attendence.vue")
      }
    ]
  }
];
