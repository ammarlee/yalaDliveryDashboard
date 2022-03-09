import guardDashBoard from "../../router/guardDashBoard";

export default [
  {
    path: "/shipping/report",
    name: "report",
    meta: { layout: "dashboard" },
    beforeEnter: guardDashBoard,
    component: () => import("./views/report.vue")
  },
  {
    path: "/shipping/balance",
    name: "balance",
    meta: { layout: "dashboard" },
    beforeEnter: guardDashBoard,
    component: () => import("./views/balance.vue")
  },

  {
    path: "/shipping/resturant",
    name: "resturant",
    meta: { layout: "dashboard" },
    beforeEnter: guardDashBoard,
    component: () => import("./views/resturant.vue")
  },

  {
    path: "/shipping/category",
    name: "category",
    meta: { layout: "dashboard" },
    beforeEnter: guardDashBoard,
    component: () => import("./views/category.vue")
  },
  {
    path: "/shipping/products",
    name: "products",
    meta: { layout: "dashboard" },
    beforeEnter: guardDashBoard,
    component: () => import("./views/products.vue")
  },
  {
    path: "/shipping/employees",
    name: "employees",
    meta: { layout: "dashboard" },
    beforeEnter: guardDashBoard,
    component: () => import("./views/employees.vue")
  },
  {
    path: "/shipping/jobApplicants",
    name: "jobApplicants",
    meta: { layout: "dashboard" },
    beforeEnter: guardDashBoard,
    component: () => import("./views/jobApplicants.vue")
  },

  {
    path: "/shipping/Drivers",
    name: "DriverList",
    meta: { layout: "dashboard" },
    beforeEnter: guardDashBoard,
    component: () => import("./views/DriverList.vue")
  },

  {
    path: "/shipping/profile",
    name: "profile",
    meta: { layout: "dashboard" },
    beforeEnter: guardDashBoard,
    component: () => import("./views/profile.vue")
  }
];
