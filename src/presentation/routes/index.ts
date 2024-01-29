import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import NotFound from '../pages/404Page.vue' // import the 404 component
import publicRoutes from './publicRoutes'

const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound } // add 404 route
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
