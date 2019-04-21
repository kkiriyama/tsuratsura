<template>
    <div id="user-info">
        <common-header
            :is-logged-in="isLoggedIn"
            mode="other"/>
        <now-loading v-if="isLoading"/>
        <div v-if="!isLoading">
            <div class="row"> <div class="col-lg-4 col-top">
                    <table v-if="!isEditing" class="table table-hover">
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
                        <button v-if="isMyPage" type="button" @click="editProfile()">編集</button>
                    </table>
                    <form v-if="isEditing" @submit.prevent="editUserInfo">
                        <fieldset class="row">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th>ハンドルネーム</th>
                                        <input v-model="visitedUserInfo.username" type="text" class="form-control" id="editUsername">
                                    </tr>
                                    <tr>
                                        <th>Twitter ID</th>
                                        <input v-model="visitedUserInfo.twitter" type="text" class="form-control" id="editTwitterID">
                                    </tr>
                                    <tr>
                                        <th>自己紹介</th>
                                        <input v-model="visitedUserInfo.bio" type="textarea" class="form-control" id="editBio">
                                    </tr>
                                </tbody>
                                <button v-if="isMyPage" type="button" @click="completeEdit()">完了</button>
                            </table>
                        </fieldset>
                    </form>
                </div>
                <div class="col-lg-6 col-top">
                    <b-tabs content-class="mt-2">
                        <b-tab title="つらいTL" active>
                            <show-tsurai-timeline
                                v-for="(post, index) in userTsuraiPosts"
                                :key="index"
                                :post="post"/>
                        </b-tab>
                        <b-tab title="えらいTL">
                            <show-erai-timeline
                                v-for="(post, index) in userEraiPosts"
                                :key="index"
                                :post="post"/>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import NowLoading from '@/components/NowLoading'
import ShowTsuraiTimeline from '@/components/ShowTsuraiTimeline'
import ShowEraiTimeline from '@/components/ShowEraiTimeline'

import firebase from 'firebase'

const db = firebase.firestore()

export default {
  components: {
    'common-header': Header,
    'show-tsurai-timeline': ShowTsuraiTimeline,
    'show-erai-timeline': ShowEraiTimeline,
    'now-loading': NowLoading
  },
  data () {
    return {
      isEditing: false,
      isLoading: true,
      editedUserInfo: this.visitedUserInfo
    }
  },
  async created () {
    this.$store.dispatch('getLoginState')
    this.$store.dispatch('getUserInfoState')
    this.$store.dispatch('getVisitedUserInfoState', this.visitedUserID)
    await this.$store.dispatch('getTsuraiTimeline', {newPosts: undefined, numPosts: 1000})
    await this.$store.dispatch('getEraiTimeline', {newPosts: undefined, numPosts: 1000})
    this.isLoading = false
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    visitingUserInfo () {
      return this.$store.state.userInfo
    },
    visitedUserID () {
      return this.$route.params.id
    },
    visitedUserInfo () {
      return this.$store.state.visitedUserInfo
    },
    isMyPage () {
      return this.visitedUserID === this.visitingUserInfo.auth_id
    },
    userTsuraiPosts () {
      const timeline = this.$store.state.postsTsurai
      const posts = []
      for (let k of Object.keys(timeline)) {
        if (timeline[k].author.user_id === this.visitedUserInfo.user_id) {
          posts.push(timeline[k])
        }
      }
      return posts
    },
    userEraiPosts () {
      const timeline = this.$store.state.postsErai
      const posts = []
      for (let k of Object.keys(timeline)) {
        if (timeline[k].author.user_id === this.visitedUserInfo.user_id) {
          posts.push(timeline[k])
        }
      }
      return posts
    }
  },
  methods: {
    editProfile () {
      this.isEditing = true
    },
    completeEdit () {
      if (!this.visitedUserInfo.username) {
        alert('ユーザーネームを入力してください')
        return
      }
      if (!this.visitedUserInfo.bio) {
        this.visitedUserInfo.bio = ''
      }
      if (!this.visitedUserInfo.twitter) {
        this.visitedUserInfo.bio = ''
      }
      db.collection('users').doc(this.visitedUserInfo.user_id).update({
        username: this.visitedUserInfo.username,
        twitter: this.visitedUserInfo.twitter,
        bio: this.visitedUserInfo.bio
      })
        .then(() => {
          alert('プロフィールが正常に更新されました')
        })
      this.isEditing = false
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
