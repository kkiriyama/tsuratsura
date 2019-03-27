import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/home.vue'
import Signup from '@/pages/Signup.vue'
import Signin from '@/pages/Signin.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/signin'
    },
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})

export default router
