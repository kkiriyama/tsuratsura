<template>
    <div>
        <div id="header">
            <common-header
                :is-logged-in="isLoggedIn"/>
        </div>
        <now-loading v-if="isLoading"/>
        <posting-button
            @popPost="popPost()"
            @toTop="toTop()"
            @toHome="toHome()"/>
        <div class="row" v-if="!isLoading">
            <div class="col-lg-3" id="submit-post" v-if="isLoggedIn">
                <post-submit-form
                    :is-mobile="isMobile"
                    :show-modal="showPostModal"
                    @close="closeModal()"/>
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
import NowLoading from '@/components/NowLoading'
import firebase from 'firebase'
import PostingButton from '@/components/PostingButton'
import IsMobile from 'ismobilejs'

const db = firebase.firestore()

export default {
  name: 'Timeline',
  components: {
    'post-submit-form': PostSubmitForm,
    'show-timeline': ShowTimeline,
    'common-header': Header,
    'now-loading': NowLoading,
    'posting-button': PostingButton
  },
  data () {
    return {
      showLength: 10,
      maxPosts: 1000,
      isLoading: true,
      showPostModal: false,
      isMobile: IsMobile.any
    }
  },
  created () {
    this.$store.dispatch('getLoginState')
    this.$store.dispatch('getUserInfoState')
    db.collection('posts')
      .onSnapshot(async (querySnapshot) => {
        const newPosts = []
        querySnapshot.forEach((doc) => {
          const docData = doc.data()
          docData.id = doc.id
          newPosts.push(docData)
        })
        newPosts.sort((a, b) => {
          if (a.created_at > b.created_at) return -1
          else return 1
        })
        const limitedNewPosts = []
        newPosts.forEach((doc, idx) => {
          if (idx < this.maxPosts) {
            limitedNewPosts.push(doc)
          }
        })
        await this.$store.dispatch('getTimeline', {newPosts: limitedNewPosts, numPosts: this.maxPosts})
        this.isLoading = false
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
    },
    user_id () {
      return this.$store.state.userInfo.auth_id
    }
  },
  methods: {
    showMore () {
      this.showLength += 10
      this.$store.dispatch('getTimeline', {newPosts: undefined, numPosts: this.showLength})
    },
    popPost () {
      this.showPostModal = true
    },
    closeModal () {
      this.showPostModal = false
    },
    toTop () {
      scrollTo(0, 0)
    },
    toHome () {
      this.$router.push('/user/' + this.user_id)
    }
  }
}
</script>
