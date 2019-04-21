// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import VueFab from 'vue-float-action-button'
import 'vue-awesome/icons/sad-tear'
import 'vue-awesome/icons/hand-holding-heart'
import 'vue-awesome/icons/thumbs-up'
import 'vue-awesome/icons/laugh-squint'
import 'vue-awesome/icons/award'
import 'vue-awesome/icons/user-graduate'
import 'vue-awesome/icons/sync'
import 'vue-awesome/icons/pencil-alt'

Vue.use(BootstrapVue)
Vue.use(VueFab)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { App },
  template: '<App/>'
})
