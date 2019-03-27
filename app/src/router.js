import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/home.vue'
import Signup from '@/pages/Signup.vue'
import Signin from '@/pages/Signin.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})

export default router
