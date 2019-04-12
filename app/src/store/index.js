import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'

Vue.use(Vuex)

const API_URL = 'https://tsuratsura-0000.firebaseapp.com'

export default new Vuex.Store({
  state: {
    posts: {},
    isLoggedIn: false,
    userInfo: {},
    postsWithCondition: {}
  },
  mutations: {
    setTimeline (state, payload) {
      state.posts = payload.data
    },
    setLoginState (state, payload) {
      state.isLoggedIn = payload.loginState
    },
    setUserInfoState (state, payload) {
      state.userInfo = payload.data
    },
    setTimelineWithCondition (state, payload) {
      state.postsWithCondition = payload.data
    }
  },
  actions: {
    async getTimeline () {
      const data = await axios.get(API_URL + '/timeline')
        .catch(e => console.error(e))
      this.commit('setTimeline', {data: data.data.data})
    },
    async getLoginState () {
      firebase.auth().onAuthStateChanged(user => {
        this.commit('setLoginState', {loginState: !!user})
      })
    },
    async getUserInfoState () {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const userData = await axios.get(API_URL + '/getuser?id=' + user.uid)
          this.commit('setUserInfoState', {data: userData.data.data})
        }
      })
    },
    async getPostsWithCondition (state, params) {
      let queryList = []
      if (params.email) {
        queryList.push('email=' + params.email)
      }
      const query = '?' + queryList.join('&')
      let data = await axios.get(API_URL + '/timeline' + query)
        .catch(e => console.error(e))
      this.commit('setTimelineWithCondition', {data: data.data})
    }
  }
})
