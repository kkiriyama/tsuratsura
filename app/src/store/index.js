import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:3000'

export default new Vuex.Store({
  state: {
    posts: {},
    isLoggedIn: false,
    userInfo: {}
  },
  mutations: {
    setTimeline (state, payload) {
      state.posts = payload.data
    },
    setLoginState (state, payload) {
      state.isLoggedIn = payload.loginState
      state.userIndo = payload.user
    }
  },
  actions: {
    async getTimeline () {
      const data = await axios.get(API_URL + '/timeline')
        .catch(e => console.error(e))
      this.commit('setTimeline', {data: data.data})
    },
    async getLoginState () {
      firebase.auth().onAuthStateChanged(user => {
          this.commit('setLoginState', {loginState: user ? true : false, user: user})
      })
    }
  }
})
