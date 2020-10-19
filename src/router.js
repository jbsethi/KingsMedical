import Vue from 'vue'
import Router from 'vue-router'

import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
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
          component: () => import('./views/Lab.vue')
        },
        {
          path: '/services',
          name: 'service',
          component: () => import('./views/Service.vue')
        },
        {
          path: '/users',
          name: 'user',
          component: () => import('./views/User.vue')
        },
        {
          path: '/roles',
          name: 'role',
          component: () => import('./views/Role.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import('./views/Icons.vue')
        },
        {
          path: '/settings',
          name: 'setting',
          component: () => import('./views/Setting.vue')
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
  ]
})
