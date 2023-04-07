import { createRouter, createWebHistory } from 'vue-router'
import header from '@/views/layout/header.vue'

import store from '@/store/index'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login.vue'),
  },

  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/auth/signup.vue'),
  },

  {
    path: '/',
    name: 'HomeRoot',
    component: header,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/shopping/homepage.vue'),
      },
    ],
    // beforeEnter(to, from, next){
    //   if (!store.state.isLogin && to.name !== 'Login' ) next({ name: 'Login' })
    //   else next()
    // },
  },


  {
    path: '/shopping',
    name: 'shoppingRoot',
    component: header,
    children: [
      {
        path: 'viewProducts',
        name: 'viewProducts',
        component: () => import('@/views/shopping/viewProducts.vue')
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('@/views/shopping/oneProduct.vue')
      },
    ],
    beforeEnter(to, from, next){
      if (!store.state.isLogin && to.name !== 'Login' ) next({ name: 'Login' })
      else next()
    },
  },

  {
    path: '/checkout',
    name: 'checkoutRoot',
    component: header,
    children: [
      {
        path: 'bill',
        name: 'bill',
        component: () => import('@/views/checkout/index.vue')
      },
    ],
    beforeEnter(to, from, next){
      if (!store.state.isLogin && to.name !== 'Login' ) next({ name: 'Login' })
      else next()
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
