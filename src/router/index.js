import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index'

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
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      if (to.meta.requiresAuth && !store.state.isLogin) {
        next({ name: 'login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/paymentSuccess',
    name: 'paymentSuccess',
    component: () => import('@/views/checkout/paymentSuccessPage.vue'),
  },
  {
    path: '/memberCenter',
    name: 'memberCenter',
    component: () => import('@/views/user/memberCenter.vue'),
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      if (to.meta.requiresAuth && !store.state.isLogin) {
        next({ name: 'login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/myOrders',
    name: 'myOrders',
    component: () => import('@/views/orders/myOrders.vue'),
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      if (to.meta.requiresAuth && !store.state.isLogin) {
        next({ name: 'login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/receipt/:id',
    name: 'receipt',
    component: () => import('@/views/orders/oneReceipt.vue'),
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      if (to.meta.requiresAuth && !store.state.isLogin) {
        next({ name: 'login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
