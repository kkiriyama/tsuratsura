import firebase from 'firebase'
const firestore = firebase.firestore()

export const signInWithProvider = {
  methods: {
    signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((result) => {
        this.startProcessing()
        const user = result.user
        firestore.collection('users').add({
          auth_id: user.uid,
          icon_URL: '',
          last_login: new Date(),
          twitter: '',
          username: ''
        })
        this.$router.push('timeline/tsurai')
        this.endProcessing()
      }).catch(() => {
        this.endProcessing()
      })
    },
    signInWithTwitter () {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((result) => {
        this.startProcessing()
        const user = result.user
        firestore.collection('users').add({
          auth_id: user.uid,
          icon_URL: '',
          last_login: new Date(),
          twitter: '',
          username: ''
        })
        this.$router.push('timeline/tsurai')
        this.endProcessing()
      }).catch(() => {
        this.endProcessing()
      })
    }
  }
}
