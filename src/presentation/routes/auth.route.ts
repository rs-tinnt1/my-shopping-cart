import VueRouter from 'vue-router'

const authRoutes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    name: 'auth',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        component: () => import('../pages/LoginPage.vue')
      },
      {
        path: '/register',
        component: () => import('../pages/RegisterPage.vue')
      }
    ]
  }
]

export default authRoutes
