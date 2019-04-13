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
                    </table>
                </div>
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
    this.$store.dispatch('getUserInfoState')
    const visitedUserID = this.$route.params.id
    this.$store.dispatch('getVisitedUserInfoState', visitedUserID)
    this.$store.dispatch('getTimeline')
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
    userPosts () {
      const timeline = this.$store.state.posts
      const userPosts = []
      for (let k of Object.keys(timeline)) {
        if (timeline[k].author.user_id === this.visitedUserInfo.user_id) {
          userPosts.push(timeline[k])
        }
      }
      return userPosts
    }
  },
  methods: {
  }
}

</script>

<style>
.col-top {
    margin: 20px 20px;
}
</style>
