<template>
    <div id="user-info">
        <common-header :is-logged-in="isLoggedIn"/>
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-top">
                    <table class="table table-hover">
                        <tbody>
                            <tr>
                                <th>ハンドルネーム</th>
                                <td>{{ visitedUserInfo.username }}</td>
                            </tr>
                            <tr>
                                <th> Twitter ID </th>
                                <td> {{ visitedUserInfo.twitter }} </td>
                            </tr>
                            <tr>
                                <th> 自己紹介 </th>
                                <td> {{ visitedUserInfo.bio }} </td>
                            </tr>
                        </tbody>
                    </table> </div>
                <div class="col-lg-6 col-top">
                    <show-timeline
                        v-for="(post, index) in userPosts"
                        :key="index"
                        :post="post"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import ShowTimeline from '@/components/ShowTimeline'

export default {
  components: {
    'common-header': Header,
    'show-timeline': ShowTimeline
  },
  created () {
    this.$store.dispatch('getLoginState')
    this.$store.dispatch('getTimeline', {newPosts: undefined, numPosts: 1000})
  },
  mounted () {
    this.$store.dispatch('getVisitedUserInfoState', this.visitedUserID)
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    visitingUserInfo () {
      return this.$store.state.userInfo
    },
    visitedUserInfo () {
      return this.$store.state.visitedUserInfo
    },
    visitedUserID () {
      return this.$route.params.id
    },
    userPosts () {
      const timeline = this.$store.state.posts
      const posts = []
      for (let k of Object.keys(timeline)) {
        if (timeline[k].author.user_id === this.visitedUserInfo.user_id) {
          posts.push(timeline[k])
        }
      }
      return posts
    }
  },
  watch: {
    visitedUserID: function (newId, oldId) {
      this.$store.dispatch('getVisitedUserInfoState', newId)
    }
  }
}

</script>

<style>
.col-top {
    margin: 20px 20px;
}
</style>
