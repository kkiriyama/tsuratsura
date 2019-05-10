<template>
    <div>
        <div class="card p-2 mb-2 erai-card-color">
            <div class="card-header erai-card-header">
                <div class="float-left">
                  <div class="text-left">
                    <img :src="iconURL" width=40px height=40px>
                    <router-link class="erai-username" :to="{name: 'UserPage', params: {id: author_auth_id}}">
                        {{ post.author.username }}
                    </router-link>
                    <span v-if="isAuthor" @click="deletePost">
                        <small>削除</small>
                    </span>
                  </div>
                  <div class="text-left erai-datetime">
                      <span>{{ formattedCreatedTime }}</span>
                  </div>
                </div>
                <div class="float-right">
                    <stamp
                        kind="great"
                        :active="isActive('great')"
                        :count="num_great"
                        @click="toggle_great"
                    />
                    <stamp
                        kind="congrat"
                        :active="isActive('congrat')"
                        :count="num_congrat"
                        @click="toggle_congrat"
                    />
                    <stamp
                        kind="genius"
                        :active="isActive('genius')"
                        :count="num_genius"
                        @click="toggle_genius"
                    />
                </div>
            </div>
            <div class="card-body text-left show-newline">
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
    num_great () {
      return this.post.posts.great_list.length
    },
    num_congrat () {
      return this.post.posts.congrat_list.length
    },
    num_genius () {
      return this.post.posts.genius_list.length
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

.dark-054{
  color: rgba(18,21,37,0.54);
}
.erai-datetime {
  padding: 5px 0 0 0;
  font-size: 10px;
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

.erai-card-color, .erai-username {
  color: #121525;
  background-color: #ffffff;
}

.erai-card-header {
  background-color: #ffffff;
}

.border-line {
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.3);
  border-width: 0.5px 0 0 0;
}

</style>
