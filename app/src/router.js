import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/home'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'
import UserPage from '@/pages/UserPage'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import firebase from 'firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/signin'
    },
    {
      path: '/timeline',
      redirect: '/timeline/tsurai'
    },
    {
      path: '/timeline/:mode',
      name: 'Timeline',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
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
    },
    {
      path: '/user/:id',
      name: 'UserPage',
      component: UserPage
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
