import firebase from 'firebase'
const firestore = firebase.firestore()

export const postDeletable = {
  methods: {
    deletePost () {
      if (confirm('投稿を削除しますか?')) {
        firestore.collection('posts').doc(this.post.posts.id).delete().then(() => {
          alert('投稿が削除されました')
        })
          .catch(e => alert('投稿を削除できませんでした。管理者にお問い合わせください。'))
      }
    }
  }
}
