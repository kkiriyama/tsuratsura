<template>
    <div>
        <div class="card p-2 mb-2">
            <div class="card-header text-left">
                <div class="text-left">
                    <router-link :to="{name: 'UserPage', params: {id: author_auth_id}}">
                        {{ post.author.username }}
                    </router-link>
                    <span v-if="isAuthor" @click="deletePost">
                        <small>削除</small>
                    </span>
                </div>
                <div class="text-left dark-054 smalltext">
                    <span>{{ formattedCreatedTime }}</span>
                </div>
            </div>
            <div class="card-body text-left show-newline">
                <span class="card-text">{{ post.posts.body }}</span>
            </div>
            <div class="card-footer text-right">
                <div>
                    <stamp
                        kind="great"
                        :active="isActive('great')"
                        :count="num_great"
                        @click="toggle_great"
                    />
                    <stamp
                        kind="congrat"
                        :active="isActive('congrat')"
                        :count="num_congrat"
                        @click="toggle_congrat"
                    />
                    <stamp
                        kind="genius"
                        :active="isActive('genius')"
                        :count="num_genius"
                        @click="toggle_genius"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import firebase from 'firebase'
import Stamp from '@/components/Stamp'
const firestore = firebase.firestore()

export default {
  name: 'Timeline',
  components: {
    'v-icon': Icon,
    'stamp': Stamp
  },
  data () {
    return {}
  },
  created () {},
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    num_great () {
      return this.post.posts.great_list.length
    },
    num_congrat () {
      return this.post.posts.congrat_list.length
    },
    num_genius () {
      return this.post.posts.genius_list.length
    },
    formattedCreatedTime () {
      const d = new Date(this.post.posts.created_at * 1)
      const formattedMinutes = ('00' + d.getMinutes()).slice(-2)
      return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}/ ${d.getHours()}:${formattedMinutes}`
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
    isActive (stampType) {
      if (this.user_id === undefined) return false
      switch (stampType) {
        case 'great':
          return this.post.posts.great_id_list.includes(this.user_id)
        case 'congrat':
          return this.post.posts.congrat_id_list.includes(this.user_id)
        case 'genius':
          return this.post.posts.genius_id_list.includes(this.user_id)
      }
      return false
    },
    deletePost () {
      console.log(this.post.posts_id)
      if (confirm('投稿を削除しますか?')) {
        firestore.collection('posts_erai').doc(this.post.posts.id).delete().then(() => {
          alert('投稿が削除されました')
        })
          .catch(e => alert('投稿を削除できませんでした。管理者にお問い合わせください。'))
      }
    }
  }
}
</script>

<style>
.dark-054{
  color: rgba(18,21,37,0.54);
}
.smalltext{
    font-size: 10px;
}
.card {
  width: 90%;
  margin: 10px auto;
}
.show-newline {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.stamp {
  padding: 10px 10px;
}
</style>
