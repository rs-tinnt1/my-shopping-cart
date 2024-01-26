import VueRouter from "vue-router";

const publicRoutes: VueRouter.RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../layouts/default.vue"),
    children: [
      {
        path: "/",
        component: () => import("../pages/HomePage.vue"),
      },
    ],
  },
];

export default publicRoutes;
