import VueRouter from "vue-router";

import publicRoutes from "./publicRoutes";

const routes: VueRouter.RouteRecordRaw[] = [...publicRoutes];
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});
export default router;
