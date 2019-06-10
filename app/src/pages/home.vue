<template>
    <div :class="timelineBg">
        <div id="header">
            <common-header
                :is-logged-in="isLoggedIn"
                :mode="mode"
                :key="mode"/>
        </div>
        <now-loading v-if="isLoading"/>
        <posting-button
            class="posting-button"
            :mode="mode"
            @popPost="popPost()"/>
        <div class="row" v-if="!isLoading">
            <div class="col-lg-3" id="submit-post" v-if="isLoggedIn">
                <post-submit-form
                    :mode="mode"
                    :is-mobile="isMobile"
                    :show-modal="showPostModal"
                    @close="closeModal()"/>
            </div>
            <div class="col-lg-3" v-if="!isLoggedIn" />
            <div class="col-lg-6" id="timeline" v-if="mode==='tsurai'">
                <show-tsurai-timeline
                    v-for="(post, index) in posts"
                    :key="index"
                    :post="post"/>
                <infinity-loading @infinite="infiniteHandler"></infinity-loading>
            </div>
            <div class="col-lg-6" id="timeline" v-if="mode==='erai'">
                <show-erai-timeline
                    v-for="(post, index) in posts"
                    :key="index"
                    :post="post"/>
                <infinity-loading @infinite="infiniteHandler"></infinity-loading>
            </div>
        </div>
    </div>
</template>

<script>
import PostSubmitForm from '@/components/PostSubmitForm'
import ShowTsuraiTimeline from '@/components/ShowTsuraiTimeline'
import ShowEraiTimeline from '@/components/ShowEraiTimeline'
import Header from '@/components/Header'
import NowLoading from '@/components/NowLoading'
import firebase from 'firebase'
import PostingButton from '@/components/PostingButton'
import IsMobile from 'ismobilejs'
import InfinityLoading from 'vue-infinite-loading'

const db = firebase.firestore()

export default {
  name: 'Timeline',
  components: {
    'post-submit-form': PostSubmitForm,
    'show-tsurai-timeline': ShowTsuraiTimeline,
    'show-erai-timeline': ShowEraiTimeline,
    'common-header': Header,
    'now-loading': NowLoading,
    'posting-button': PostingButton,
    'infinity-loading': InfinityLoading

  },
  data () {
    return {
      showLength: 30,
      showMoreNum: 10,
      isLoading: true,
      showPostModal: false,
      isMobile: IsMobile.any
    }
  },
  watch: {
    async mode (newMode, oldMode) {
      if (newMode === 'tsurai') {
        this.startLoading()
        await this.$store.dispatch('getTsuraiTimeline')
        this.endLoading()
      }
      if (newMode === 'erai') {
        this.startLoading()
        await this.$store.dispatch('getEraiTimeline')
        this.endLoading()
      }
    }
  },
  created () {
    this.startLoading()
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
          if (idx < this.showLength) {
            limitedNewPosts.push(doc)
          }
        })
        await this.$store.dispatch('getTsuraiTimeline', {newPosts: limitedNewPosts, numPosts: this.showLength})
      })
    db.collection('posts_erai')
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
          if (idx < this.showLength) {
            limitedNewPosts.push(doc)
          }
        })
        await this.$store.dispatch('getEraiTimeline', {newPosts: limitedNewPosts, numPosts: this.showLength})
        this.endLoading()
      })
  },
  computed: {
    mode () {
      return this.$route.params.mode
    },
    posts () {
      return this.mode === 'tsurai' ? this.$store.state.postsTsurai : this.$store.state.postsErai
    },
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    username () {
      return this.$store.state.userInfo.username
    },
    user_id () {
      return this.$store.state.userInfo.auth_id
    },
    timelineBg () {
      return this.mode === 'tsurai' ? 'timeline-background-tsurai' : 'timeline-background-erai'
    }
  },
  methods: {
    startLoading () {
      this.isLoading = true
      document.body.style.height = '100%'
    },
    endLoading () {
      this.isLoading = false
      document.body.style.height = 'auto'
    },
    infiniteHandler (state) {
      const prelength = this.posts.length
      this.showMore()
        .then(() => {
          if (prelength !== this.posts.length) {
            state.loaded()
          } else {
            state.complete()
          }
        })
        .catch(e => alert('データを正常に読み込めませんでした'))
    },
    async showMore () {
      this.showLength += this.showMoreNum
      if (this.mode === 'tsurai') {
        await this.$store.dispatch('getTsuraiTimeline', {newPosts: undefined, numPosts: this.showLength})
      }
      if (this.mode === 'erai') {
        await this.$store.dispatch('getEraiTimeline', {newPosts: undefined, numPosts: this.showLength})
      }
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

<style scoped>
.posting-button {
    position: fixed;
    z-index: 100;
    bottom: 48px;
    right: 48px;
}

.timeline-background-tsurai {
  background-color: #030405;
  height: 100%;
}

.timeline-background-erai {
  background-color: rgba(18, 21, 37, 0.12);
  height: 100%;
}
</style>
