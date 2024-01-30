import VueRouter from 'vue-router'

const publicRoutes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    name: 'public',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/HomePage.vue')
      },
      {
        path: '/products',
        component: () => import('../pages/ProductListPage.vue')
      },
      {
        path: '/products/:id',
        component: () => import('../pages/ProductDetailPage.vue')
      },
      {
        path: '/checkout',
        component: () => import('../pages/CheckoutPage.vue')
      }
    ]
  }
]

export default publicRoutes
