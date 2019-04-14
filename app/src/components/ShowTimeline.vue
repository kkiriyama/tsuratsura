<template>
    <div>
        <div class="card p-2 mb-2">
            <div class="card-header text-left">
                <router-link :to="{name: 'UserPage', params: {id: author_auth_id}}">
                    {{ post.author.username }}
                </router-link>
                <span v-if="isAuthor" @click="deletePost">
                    <small>削除</small>
                </span>
            </div>
            <div class="card-body text-left show-newline">
                <span class="card-text">{{ post.posts.body }}</span>
            </div>
            <div class="card-footer text-right">
                <small class="text-muted">posted at</small>
                <span>{{ formattedCreatedTime }}</span>
                <div>
                    <span @click="toggle_too_bad">
                        <v-icon name="sad-tear" scale="1.2" focusable="true" color="blue"/>
                        <span>{{ num_that_is_too_bad }}</span>
                    </span>
                    <span @click="toggle_alright">
                        <v-icon name="hand-holding-heart" scale="1.2" color="pink"/>
                        <span>{{ num_you_are_alright }}</span>
                    </span>
                    <span @click="toggle_good_job">
                        <v-icon name="thumbs-up" scale="1.2" color="green"/>
                        <span>{{ num_good_job }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import firebase from 'firebase'

const firestore = firebase.firestore()

export default {
  name: 'Timeline',
  components: {
    'v-icon': Icon
  },
  data () {
    return {}
  },
  created () {
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    num_that_is_too_bad () {
      return this.post.posts.that_is_too_bad_list.length
    },
    num_you_are_alright () {
      return this.post.posts.you_are_alright_list.length
    },
    num_good_job () {
      return this.post.posts.good_job_list.length
    },
    formattedCreatedTime () {
      const d = new Date(this.post.posts.created_at * 1)
      const formattedMinutes = ('00' + d.getMinutes()).slice(-2)
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}:${formattedMinutes}`
    },
    user_id () {
      return this.$store.state.userInfo.user_id
    },
    author_auth_id () {
      return this.post.author.auth_id
    },
    isAuthor () {
      if (this.user_id === undefined) return false
      return this.user_id === this.post.author.user_id
    }
  },
  methods: {
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
    deletePost () {
      console.log(this.post.posts_id)
      if (confirm('投稿を削除しますか?')) {
        firestore.collection('posts').doc(this.post.posts.id).delete().then(() => {
          alert('投稿が削除されました')
        })
          .catch(e => alert('投稿を削除できませんでした。管理者にお問い合わせください。'))
      }
    }
  }
}
</script>

<style>
.card {
    width: 80%;
    margin: 10px auto;
}
.show-newline {
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>
