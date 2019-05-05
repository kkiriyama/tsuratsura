<template>
    <div>
        <div class="card p-2 mb-2 tsurai-card-color">
            <div class="card-header tsurai-card-header">
                <div class="float-left">
                  <div class="text-left">
                    <img :src="iconURL" width=40px height=40px>
                    <router-link class="tsurai-username" :to="{name: 'UserPage', params: {id: author_auth_id}}">
                        {{ post.author.username }}
                    </router-link>
                    <span v-if="isAuthor" @click="deletePost">
                        <small>削除</small>
                    </span>
                  </div>
                  <div class="text-left tsurai-datetime">
                      <span>{{ formattedCreatedTime }}</span>
                  </div>
                </div>
                <div class="float-right">
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
            <div class="card-body text-left show-newline border-line">
                <span class="card-text">{{ post.posts.body }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import Stamp from '@/components/Stamp'
import { postDeletable } from '@/mixins/postDeletable'
import { stampHandler } from '@/mixins/stampHandler'

export default {
  name: 'Timeline',
  components: {
    'v-icon': Icon,
    'stamp': Stamp
  },
  mixins: [
    postDeletable,
    stampHandler
  ],
  data () {
    return {}
  },
  created () {},
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
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
      return this.post.author.icon_URL
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
.tsurai-datetime{
  color: rgba(255,255,255,0.7);
  font-size: 10px;
  margin: 5px 0 0 0;
}

.card {
  width: 90%;
  margin: 10px auto;
}

.show-newline {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.stamp {
  padding: 10px 10px;
}

.tsurai-card-color, .tsurai-username {
  color: #ffffff;
  background-color: #121525;
}

.tsurai-card-header {
  background-color: #121525;
}

.border-line {
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.3);
  border-width: 0.5px 0 0 0;
}

</style>
