import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/Search'),
    },
    {
      path: '/article/:articleId',
      name: 'article',
      component: () => import('@/views/Article'),
      props:true
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile'),
    },
    {
      path: '/',
      // name: 'layout',
      component: () => import('@/views/Layout'),
      children: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home'),
        },
        {
          path: '/question',
          name: 'question',
          component: () => import('@/views/Question'),
        },
        {
          path: '/video',
          name: 'video',
          component: () => import('@/views/Video'),
        },
        {
          path: '/my',
          name: 'my',
          component: () => import('@/views/My'),
        },
      ],
    },
  ],
})
export default router
