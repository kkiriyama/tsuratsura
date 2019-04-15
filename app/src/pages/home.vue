<template>
    <div>
        <div id="header">
            <common-header
                :is-logged-in="isLoggedIn"/>
        </div>
        <div class="row">
            <div class="col-lg-3" id="submit-post" v-if="isLoggedIn">
                <post-submit-form/>
            </div>
            <div class="col-lg-6" id="timeline">
                <show-timeline
                    v-for="(post, index) in posts"
                    :key="index"
                    :post="post"/>
                <button class="button" @click="showMore">もっと見る</button>
            </div>
        </div>
    </div>
</template>

<script>
import PostSubmitForm from '@/components/PostSubmitForm'
import ShowTimeline from '@/components/ShowTimeline'
import Header from '@/components/Header'
import firebase from 'firebase'

const db = firebase.firestore()

export default {
  name: 'Timeline',
  components: {
    'post-submit-form': PostSubmitForm,
    'show-timeline': ShowTimeline,
    'common-header': Header
  },
  data () {
    return {
      showLength: 10
    }
  },
  created () {
    this.$store.dispatch('getLoginState')
    this.$store.dispatch('getUserInfoState')
    this.$store.dispatch('getTimeline')
    db.collection('posts')
      .onSnapshot((querySnapshot) => {
        const newPosts = []
        querySnapshot.forEach((doc, idx) => {
          const docData = doc.data()
          docData.id = doc.id
          if (idx < this.showLength) {
            newPosts.push(docData)
          }
        })
        newPosts.sort((a, b) => {
          if (a.created_at > b.created_at) return -1
          else return 1
        })
        this.$store.dispatch('getTimeline', {newPosts: newPosts, numPosts: undefined})
      })
  },
  computed: {
    posts () {
      return this.$store.state.posts
    },
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    username () {
      return this.$store.state.userInfo.username
    }
  },
  methods: {
    showMore () {
      this.showLength += 10
      this.$store.dispatch('getTimeline', {newPosts: undefined, numPosts: this.showLength})
    }
  }
}
</script>
