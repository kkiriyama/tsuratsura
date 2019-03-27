<template>
    <div>
        <div id="header">
            <button @click="signOut">ログアウト</button>
        </div>
        <div id="title">
            <h2> TsuraTsura </h2>
        </div>
        <div class="row">
            <div class="col-sm-3" id="submit-post">
                <post-submit-form/>
            </div>
            <div class="col-sm-6" id="timeline">
                <show-timeline
                    v-for="(post, index) in posts"
                    :key="index"
                    :post="post"/>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

import PostSubmitForm from '@/components/PostSubmitForm'
import ShowTimeline from '@/components/ShowTimeline'

export default {
  name: 'Timeline',
  components: {
    'post-submit-form': PostSubmitForm,
    'show-timeline': ShowTimeline
  },
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getTimeline')
  },
  computed: {
    posts () {
      return this.$store.state.posts.data
    },
    isLoggedIn () {
      return firebase.auth().onAuthStateChanged(user => {
        if (user) {
          return true
        } else {
          return false
        }
      })
    }
  },
  methods: {
    signOut () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>
