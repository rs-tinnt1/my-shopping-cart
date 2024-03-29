import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import NotFound from '../pages/404Page.vue' // import the 404 component
import authRoutes from './auth.route'
import publicRoutes from './public.route'

const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...authRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound } // add 404 route
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
