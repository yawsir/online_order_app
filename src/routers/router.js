import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    { 
      path: '/home', 
      name:'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/Order.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('../views/Personal.vue')
    }

  ]
})
