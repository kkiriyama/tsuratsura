import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

const db = firebase.firestore()

const snapshot2PostData = async function (snapshot, mode) {
  const data = Array(0)
  const authorPromiseList = []
  snapshot.forEach((doc) => {
    authorPromiseList.push(doc.author.get())
  })
  let authorList = []
  await Promise.all(authorPromiseList).then((a) => {
    authorList = a
  })
  if (mode === 'tsurai') {
    snapshot.forEach((doc, idx) => {
      const author = authorList[idx]
      const authorData = author.data()
      if (authorData === undefined) return
      authorData.user_id = author.id

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
      data.push({posts: doc, author: authorData, uid: doc.id})
    })
  }
  if (mode === 'erai') {
    snapshot.forEach((doc, idx) => {
      const author = authorList[idx]
      const authorData = author.data()
      if (authorData === undefined) return
      authorData.user_id = author.id

      // すごいスタンプ
      const greatRefList = doc.great_list
      const greatUserList = []
      for (let i = 0; i < greatRefList.length; i++) {
        const userDoc = greatRefList[i]
        const userId = userDoc.id
        greatUserList.push(userId)
      }
      doc.great_id_list = greatUserList

      // おめでとうスタンプ
      const congratRefList = doc.congrat_list
      const congratUserList = []
      for (let i = 0; i < congratRefList.length; i++) {
        const userDoc = congratRefList[i]
        const userId = userDoc.id
        congratUserList.push(userId)
      }
      doc.congrat_id_list = congratUserList

      // 天才スタンプ
      const geniusRefList = doc.genius_list
      const geniusUserList = []
      for (let i = 0; i < geniusRefList.length; i++) {
        const userDoc = geniusRefList[i]
        const userId = userDoc.id
        geniusUserList.push(userId)
      }
      doc.genius_id_list = geniusUserList
      data.push({posts: doc, author: authorData, uid: doc.id})
    })
  }
  return data
}

const getUser = function (userAuthId) {
  const userDoc = db.collection('users').where('auth_id', '==', userAuthId)
  const data = userDoc.get()
    .then((snapshot) => {
      let data = {}
      let index = ''
      snapshot.forEach((doc) => {
        data = doc.data()
        index = doc.id
      })
      data.user_id = index
      return data
    })
  return data
}

export default new Vuex.Store({
  state: {
    postsTsurai: {},
    postsErai: {},
    isLoggedIn: false,
    userInfo: {},
    postsWithCondition: {},
    visitedUserInfo: {}
  },
  mutations: {
    setTsuraiTimeline (state, payload) {
      state.postsTsurai = payload.data
    },
    setEraiTimeline (state, payload) {
      state.postsErai = payload.data
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
    async getTsuraiTimeline (state, payload) {
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
        const postData = await snapshot2PostData(newPosts, 'tsurai')
        this.commit('setTsuraiTimeline', {data: postData})
      } else {
        const postData = await snapshot2PostData(newPosts, 'tsurai')
        this.commit('setTsuraiTimeline', {data: postData})
      }
    },
    async getEraiTimeline (state, payload) {
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
        const snapshot = await db.collection('posts_erai').orderBy('created_at', 'desc').limit(num).get()
        const newPosts = []
        snapshot.forEach((doc) => {
          const docData = doc.data()
          docData.id = doc.id
          newPosts.push(docData)
        })
        const postData = await snapshot2PostData(newPosts, 'erai')
        this.commit('setEraiTimeline', {data: postData})
      } else {
        const postData = await snapshot2PostData(newPosts, 'erai')
        this.commit('setEraiTimeline', {data: postData})
      }
    },
    async getLoginState () {
      await new Promise((resolve) => {
        let unsubscribe = firebase.auth().onAuthStateChanged(user => {
          this.commit('setLoginState', {loginState: !!user})
          unsubscribe()
          resolve()
        })
      })
    },
    async getUserInfoState () {
      await new Promise((resolve) => {
        let unsubscribe = firebase.auth().onAuthStateChanged(async user => {
          if (user) {
            const userData = await getUser(user.uid)
            this.commit('setUserInfoState', {data: userData})
          }
          unsubscribe()
          resolve()
        })
      })
    },
    async getVisitedUserInfoState (state, userAuthId) {
      await new Promise((resolve) => {
        let unsubscribe = firebase.auth().onAuthStateChanged(async user => {
          const visitedUserData = await getUser(userAuthId)
          this.commit('setVisitedUserInfoState', {data: visitedUserData})
          unsubscribe()
          resolve()
        })
      })
    }
  }
})
