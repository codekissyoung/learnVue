import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/counter',
    name: 'Counter',
    component: () => import('@/views/Counter.vue')
  },
  {
    path: '/global-counter',
    name: 'GlobalCounter',
    component: () => import('@/views/GlobalCounter.vue')
  },
  {
    path: '/user/detail/:id',
    name: 'UserDetail',
    component: () => import('@/views/user/detail.vue')
  },
  {
    path: '/reactivity-demo',
    name: 'ReactivityDemo',
    component: () => import('@/views/ReactivityDemo.vue')
  },
  {
    path: '/api-demo',
    name: 'ApiDemo',
    component: () => import('@/views/ApiDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router