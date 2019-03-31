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
                                <td>{{ userInfo.username }}</td>
                                <td><button class="button">編集</button></td>
                            </tr>
                            <tr>
                                <th>メールアドレス</th>
                                <td>{{ userInfo.email }}</td>
                                <td><button class="button">編集</button></td>
                            </tr>
                            <tr>
                                <th> Twitter ID </th>
                                <td> {{ userInfo.twitter }} </td>
                                <td><button class="button">編集</button></td>
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
    this.$store.dispatch('getPostsWithCondition', {email: this.userInfo.email})
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    userPosts () {
      return this.$store.state.postsWithCondition.data
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
