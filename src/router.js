import Vue from 'vue'
import Router from 'vue-router'
import { checkAuthMiddleware, checkAccessMiddleware } from './middlewares'

import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      meta: { isAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('./views/Dashboard.vue')
        },
        {
          path: '/orders',
          name: 'order',
          component: () => import('./views/Order.vue')
        },
        {
          path: '/labs',
          name: 'lab',
          component: () => import('./views/Lab.vue'),
          meta: {
            canAccess: ['Administrator']
          }
        },
        {
          path: '/service-types',
          name: 'serviceType',
          component: () => import('./views/ServiceType.vue'),
          meta: {
            canAccess: ['Administrator']
          }
        },
        {
          path: '/services',
          name: 'service',
          component: () => import('./views/Service.vue'),
          meta: {
            canAccess: ['Administrator']
          }
        },
        {
          path: '/users',
          name: 'user',
          component: () => import('./views/User.vue'),
          meta: {
            canAccess: ['Administrator']
          }
        },
        {
          path: '/roles',
          name: 'role',
          component: () => import('./views/Role.vue'),
          meta: {
            canAccess: ['Administrator']
          }
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import('./views/Icons.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('./views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('./views/Register.vue')
        }
      ]
    }
  ],
})

router.beforeEach(checkAuthMiddleware)
router.beforeEach(checkAccessMiddleware)

export default router