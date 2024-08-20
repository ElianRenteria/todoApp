// src/router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useToken } from './composables/useToken.ts'

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/',
    name: 'home',
    component: () => import('./views/Home.vue'),
  },
  { 
    path: '/login', 
    name: 'login',
    component: () => import('./views/Login.vue')
  },
  { 
    path: '/register', 
    name: 'register',
    component: () => import('./views/Register.vue')
  },
  { 
    path: '/app', 
    name: 'app',
    component: () => import('./views/TodoList.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) === false) {
    try {
      const tokenRef = useToken()
      const isTokenExpired = tokenRef.isTokenExpired()
      if (isTokenExpired) {
        next()
      } else {
        next("/App")
      }
    } catch (error) {
      next();
      return;
    }
  }
  if (to.matched.some((record) => record.meta.requiresAuth) === true) {
    const tokenRef = useToken()
    const isTokenExpired = tokenRef.isTokenExpired()
    if (isTokenExpired) {
      next("/login")
    } else {
      next()
    }
  }
})

export default router
