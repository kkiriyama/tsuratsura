<template>
    <div>
        <div class="card p-2 mb-2 tsurai-card-color">
            <div class="card-header tsurai-card-header">
                <div class="wrapper">
                    <div class="content">
                        <img v-lazy="iconURL" width=40px height=40px />
                    </div>
                    <div class="content">
                        <router-link class="tsurai-username" :to="{name: 'UserPage', params: {id: author_auth_id}}">
                           {{ post.author.username }}
                        </router-link>
                        <div class="tsurai-datetime">
                            <span>{{ formattedCreatedTime }}</span>
                        </div>
                    </div>
                    <div class="content delete-button">
                        <span v-if="isAuthor" @click="deletePost">
                        <small>削除</small>
                        </span>
                    </div>
                   <div class="float-right stamp-box">
                    <stamp
                        kind="too-bad"
                        :active="isActive('too-bad')"
                        :count="num_that_is_too_bad"
                        @click="toggle_too_bad"
                    />
                    <stamp
                        kind="alright"
                        :active="isActive('alright')"
                        :count="num_you_are_alright"
                        @click="toggle_alright"
                        />
                    <stamp
                        kind="good-job"
                        :active="isActive('good-job')"
                        :count="num_good_job"
                        @click="toggle_good_job"
                    />
                  </div>
                </div>
            </div>
              <div class="card-body text-left show-newline border-line">
                  <span class="card-text">{{ post.posts.body }}</span>
              </div>
              <div v-if="isAuthor" class="card-footer">
                <a :href=twiUrl target="_blank"><twitter-icon/></a>
              </div>
        </div>
    </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import Stamp from '@/components/Stamp'
import TwitterIcon from '@/components/icon/Twitter'
import { postDeletable } from '@/mixins/postDeletable'
import { stampHandler } from '@/mixins/stampHandler'

export default {
  name: 'Timeline',
  components: {
    'v-icon': Icon,
    'stamp': Stamp,
    'twitter-icon': TwitterIcon
  },
  mixins: [
    postDeletable,
    stampHandler
  ],
  created () {},
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    twiUrl () {
      return `https://twitter.com/intent/tweet?text=${this.post.posts.body}&hashtags=今日のえらい&url=https://sorehatsurai.firebaseapp.com`
    },
    num_that_is_too_bad () {
      return this.post.posts.that_is_too_bad_list.length
    },
    num_you_are_alright () {
      return this.post.posts.you_are_alright_list.length
    },
    num_good_job () {
      return this.post.posts.good_job_list.length
    },
    formattedCreatedTime () {
      const d = new Date(this.post.posts.created_at * 1)
      const formattedMinutes = ('00' + d.getMinutes()).slice(-2)
      return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${formattedMinutes}`
    },
    user_id () {
      return this.$store.state.userInfo.user_id
    },
    iconURL () {
      if (this.post.author.icon_URL !== '') return this.post.author.icon_URL
      return '/static/dummyicon/dummyicon' + String(this.author_auth_id.charCodeAt(0) % 12 + 1) + '.png'
    },
    author_auth_id () {
      return this.post.author.auth_id
    },
    isAuthor () {
      if (this.user_id === undefined) return false
      return this.user_id === this.post.author.user_id
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato|M+PLUS+1p');

.card {
  margin: 20px auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.show-newline {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.wrapper{
  overflow: hidden;
}

.content{
  float: left;
  text-align: left;
  margin: 8px 0 8px 0;
}

.delete-button{
  margin-left:8px;
}

.stamp-box{
  margin-top:8px;
}

.stamp {
  margin: 0px 8px;
}

.tsurai-card-color {
  color: #ffffff;
  background-color: #121525;
  font-family: 'M PLUS 1p', sans-serif;
}

.tsurai-username {
  margin-left: 12px;
  color: #ffffff;
  background-color: #121525;
  font-weight: 900;
  font-family: 'Lato', 'M PLUS 1p', sans-serif;
}

.tsurai-datetime{
  margin-left: 12px;
  color: rgba(255,255,255,0.7);
  font-size: 0.8rem;
  font-family: 'Lato', sans-serif;
}

.tsurai-card-header {
  background-color: #121525;
}

.border-line {
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.3);
  border-width: 2px 0 0 0;
}

</style>
