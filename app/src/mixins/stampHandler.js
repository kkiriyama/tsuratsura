import firebase from 'firebase'
const firestore = firebase.firestore()

export const stampHandler = {
  methods: {
    toggle_great () {
      if (!this.$store.state.isLoggedIn) {
        alert('スタンプを押すにはログインしてください')
        return
      }
      const newRef = firestore.doc('/users/' + this.user_id)
      const idList = this.post.posts.great_id_list
      const index = idList.findIndex(item => item === this.user_id)
      if (index === -1) {
        firestore.collection('posts_erai').doc(this.post.posts.id).update({
          great_list: firebase.firestore.FieldValue.arrayUnion(newRef)
        })
      } else {
        firestore.collection('posts_erai').doc(this.post.posts.id).update({
          great_list: firebase.firestore.FieldValue.arrayRemove(newRef)
        })
      }
    },
    toggle_congrat () {
      if (!this.$store.state.isLoggedIn) {
        alert('スタンプを押すにはログインしてください')
        return
      }
      const newRef = firestore.doc('/users/' + this.user_id)
      const idList = this.post.posts.congrat_id_list
      const index = idList.findIndex(item => item === this.user_id)
      if (index === -1) {
        firestore.collection('posts_erai').doc(this.post.posts.id).update({
          congrat_list: firebase.firestore.FieldValue.arrayUnion(newRef)
        })
      } else {
        firestore.collection('posts_erai').doc(this.post.posts.id).update({
          congrat_list: firebase.firestore.FieldValue.arrayRemove(newRef)
        })
      }
    },
    toggle_genius () {
      if (!this.$store.state.isLoggedIn) {
        alert('スタンプを押すにはログインしてください')
        return
      }
      const newRef = firestore.doc('/users/' + this.user_id)
      const idList = this.post.posts.genius_id_list
      const index = idList.findIndex(item => item === this.user_id)
      if (index === -1) {
        firestore.collection('posts_erai').doc(this.post.posts.id).update({
          genius_list: firebase.firestore.FieldValue.arrayUnion(newRef)
        })
      } else {
        firestore.collection('posts_erai').doc(this.post.posts.id).update({
          genius_list: firebase.firestore.FieldValue.arrayRemove(newRef)
        })
      }
    },
    toggle_too_bad () {
      if (!this.$store.state.isLoggedIn) {
        alert('スタンプを押すにはログインしてください')
        return
      }
      const newRef = firestore.doc('/users/' + this.user_id)
      const idList = this.post.posts.too_bad_id_list
      const index = idList.findIndex(item => item === this.user_id)
      if (index === -1) {
        firestore.collection('posts').doc(this.post.posts.id).update({
          that_is_too_bad_list: firebase.firestore.FieldValue.arrayUnion(newRef)
        })
      } else {
        firestore.collection('posts').doc(this.post.posts.id).update({
          that_is_too_bad_list: firebase.firestore.FieldValue.arrayRemove(newRef)
        })
      }
    },
    toggle_alright () {
      if (!this.$store.state.isLoggedIn) {
        alert('スタンプを押すにはログインしてください')
        return
      }
      const newRef = firestore.doc('/users/' + this.user_id)
      const idList = this.post.posts.alright_id_list
      const index = idList.findIndex(item => item === this.user_id)
      if (index === -1) {
        firestore.collection('posts').doc(this.post.posts.id).update({
          you_are_alright_list: firebase.firestore.FieldValue.arrayUnion(newRef)
        })
      } else {
        firestore.collection('posts').doc(this.post.posts.id).update({
          you_are_alright_list: firebase.firestore.FieldValue.arrayRemove(newRef)
        })
      }
    },
    toggle_good_job () {
      if (!this.$store.state.isLoggedIn) {
        alert('スタンプを押すにはログインしてください')
        return
      }
      const newRef = firestore.doc('/users/' + this.user_id)
      const idList = this.post.posts.good_job_id_list
      const index = idList.findIndex(item => item === this.user_id)
      if (index === -1) {
        firestore.collection('posts').doc(this.post.posts.id).update({
          good_job_list: firebase.firestore.FieldValue.arrayUnion(newRef)
        })
      } else {
        firestore.collection('posts').doc(this.post.posts.id).update({
          good_job_list: firebase.firestore.FieldValue.arrayRemove(newRef)
        })
      }
    },
    isActive (stampType) {
      if (this.user_id === undefined) return false
      switch (stampType) {
        case 'great':
          return this.post.posts.great_id_list.includes(this.user_id)
        case 'congrat':
          return this.post.posts.congrat_id_list.includes(this.user_id)
        case 'genius':
          return this.post.posts.genius_id_list.includes(this.user_id)
        case 'too-bad':
          return this.post.posts.too_bad_id_list.includes(this.user_id)
        case 'alright':
          return this.post.posts.alright_id_list.includes(this.user_id)
        case 'good-job':
          return this.post.posts.good_job_id_list.includes(this.user_id)
      }
      return false
    }
  }
}
