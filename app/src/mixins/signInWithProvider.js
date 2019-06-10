import firebase from 'firebase'
const firestore = firebase.firestore()

export const signInWithProvider = {
  methods: {
    startProcessing () {
      this.isProcessing = true
    },
    endProcessing () {
      this.isProcessing = false
    },
    signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(async (result) => {
        this.startProcessing()
        let isFirstLogin = true
        await firestore.collection('users').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data.auth_id === result.user.uid) isFirstLogin = false
          })
        })
        if (isFirstLogin) {
          firestore.collection('users').add({
            auth_id: result.user.uid,
            icon_URL: '',
            last_login: new Date(),
            twitter: '',
            username: ''
          })
        }
        this.$router.push('timeline/tsurai')
        this.endProcessing()
      }).catch(() => {
        this.endProcessing()
      })
    },
    signInWithTwitter () {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider).then(async (result) => {
        this.startProcessing()
        let isFirstLogin = true
        firestore.collection('users').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data.auth_id === result.user.uid) isFirstLogin = false
          })
        })
        if (isFirstLogin) {
          firestore.collection('users').add({
            auth_id: result.user.uid,
            icon_URL: '',
            last_login: new Date(),
            twitter: '',
            username: ''
          })
        }
        this.$router.push('timeline/tsurai')
        this.endProcessing()
      }).catch((e) => {
        console.error(e)
        this.endProcessing()
      })
    }
  }
}
