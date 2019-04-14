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
    }
  },
  created () {
    this.$store.dispatch('getLoginState')
    this.$store.dispatch('getUserInfoState')
    db.collection('posts')
          .onSnapshot((querySnapshot) => {
              this.$store.dispatch('getTimeline')
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
  }
}
</script>
