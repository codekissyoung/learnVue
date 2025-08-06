import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
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
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'UserList',
        component: () => import('@/views/user/UserList.vue')
      },
      {
        path: 'detail/:id',
        name: 'UserDetail',
        component: () => import('@/views/user/detail.vue')
      }
    ]
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
  },
  {
    path: '/hooks-demo',
    name: 'HooksDemo',
    component: () => import('@/views/HooksDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router