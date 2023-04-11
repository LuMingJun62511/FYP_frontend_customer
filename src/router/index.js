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
    component: () => import('@/views/checkout/index.vue'),
  },
  {
    path: '/memberCenter',
    name: 'memberCenter',
    component: () => import('@/views/user/memberCenter.vue'),
  },
  {
    path: '/addressManage',
    name: 'addressManage',
    component: () => import('@/views/user/addressManage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
