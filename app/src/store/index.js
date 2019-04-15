import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'

Vue.use(Vuex)

const db = firebase.firestore()

const API_URL = 'https://tsuratsura-0000.firebaseapp.com'
// const API_URL = 'http://localhost:5001/tsuratsura-0000/us-central1'

const snapshot2PostData = async function (snapshot) {
  const data = Array(snapshot.length)
  const authorPromiseList = []
  snapshot.forEach((doc) => {
    authorPromiseList.push(doc.author.get())
  })
  let authorList = []
  await Promise.all(authorPromiseList).then((a) => {
    authorList = a
  })
  snapshot.forEach((doc, idx) => {
    const author = authorList[idx]
    const authorData = author.data()

    // それはつらいスタンプ
    const tooBadRefList = doc.that_is_too_bad_list
    const tooBadUserList = []
    for (let i = 0; i < tooBadRefList.length; i++) {
      const userDoc = tooBadRefList[i]
      const userId = userDoc.id
      tooBadUserList.push(userId)
    }
    doc.too_bad_id_list = tooBadUserList

    // よしよしスタンプ
    const alrightRefList = doc.you_are_alright_list
    const alrightUserList = []
    for (let i = 0; i < alrightRefList.length; i++) {
      const userDoc = alrightRefList[i]
      const userId = userDoc.id
      alrightUserList.push(userId)
    }
    doc.alright_id_list = alrightUserList

    // 頑張ったねスタンプ
    const goodJobRefList = doc.good_job_list
    const goodJobUserList = []
    for (let i = 0; i < goodJobRefList.length; i++) {
      const userDoc = goodJobRefList[i]
      const userId = userDoc.id
      goodJobUserList.push(userId)
    }
    doc.good_job_id_list = goodJobUserList
    data[idx] = {posts: doc, author: authorData, uid: doc.id}
  })
  return data
}

export default new Vuex.Store({
  state: {
    posts: {},
    isLoggedIn: false,
    userInfo: {},
    postsWithCondition: {},
    visitedUserInfo: {}
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
    setVisitedUserInfoState (state, payload) {
      state.visitedUserInfo = payload.data
    },
    setTimelineWithCondition (state, payload) {
      state.postsWithCondition = payload.data
    }
  },
  actions: {
    async getTimeline (state, payload) {
      let newPosts = []
      let numPosts = 0
      if (payload !== undefined) {
        newPosts = payload.newPosts
        numPosts = payload.numPosts
      } else {
        newPosts = undefined
        numPosts = undefined
      }
      if (newPosts === undefined) {
        const num = numPosts !== undefined ? numPosts : 20
        const snapshot = await db.collection('posts').orderBy('created_at', 'desc').limit(num).get()
        const newPosts = []
        snapshot.forEach((doc) => {
          const docData = doc.data()
          docData.id = doc.id
          newPosts.push(docData)
        })
        const postData = await snapshot2PostData(newPosts)
        this.commit('setTimeline', {data: postData})
      } else {
        const postData = await snapshot2PostData(newPosts)
        this.commit('setTimeline', {data: postData})
      }
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
    async getVisitedUserInfoState (state, userAuthId) {
      (async () => {
        const visitedUserData = await axios.get(API_URL + '/getuser?id=' + userAuthId)
        this.commit('setVisitedUserInfoState', {data: visitedUserData.data.data})
      })().catch(e => console.error(e))
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
