// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Croppa from 'vue-croppa'
import store from './store'
import 'vue-awesome/icons/sync'
import 'vue-awesome/icons/pencil-alt'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(BootstrapVue)
Vue.use(Croppa)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { App },
  template: '<App/>'
})
