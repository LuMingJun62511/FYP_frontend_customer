import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/:catchAll(.*)',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'homepage',
    component: () => import('@/views/shopping/homepage.vue'),
  },
  {
    path: '/viewProducts',
    name: 'viewProductsByNameLike',
    component: () => import('@/views/shopping/viewProducts.vue'),
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('@/views/shopping/oneProduct.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/checkout/checkoutPage.vue'),
  },
  {
    path: '/memberCenter',
    name: 'memberCenter',
    component: () => import('@/views/user/memberCenter.vue'),
  },
  {
    path: '/addressManage',
    name: 'addressManage',
    component: () => import('@/views/checkout/components/addressBoard'),
  },
  {
    path: '/myOrders',
    name: 'myOrders',
    component: () => import('@/views/orders/myOrders.vue'),
  },
  {
    path: '/receipt/:id',
    name: 'receipt',
    component: () => import('@/views/orders/oneReceipt.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
