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
  // {
  //   path: '/viewProducts',
  //   name: 'viewProductsByNameLike',
  //   props: route => ({ name: route.query.name }),
  //   component: () => import('@/views/shopping/viewProducts.vue'),
  // },
  // {
  //   path: '/viewProducts',
  //   name: 'viewProductsById',
  //   props: route => ({ id: route.query.id }),
  //   component: () => import('@/views/shopping/viewProducts.vue'),
  // },
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
