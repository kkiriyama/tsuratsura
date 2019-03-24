import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:3000'

export default new Vuex.Store({
  state: {
    posts: [{username: 'kkiriyama', text: '本日は晴天なり'}]
  },
  mutations: {
    setTimeline (state, payload) {
      state.posts = payload.data
    }
  },
  actions: {
    async getTimeline () {
      const data = await axios.get(API_URL + '/timeline')
        .catch(e => console.error(e))
      this.commit('setTimeline', {data: data.data})
    }
  }
})
