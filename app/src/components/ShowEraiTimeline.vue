<template>
    <div>
        <div class="card p-2 mb-2 erai-card-color">
            <div class="card-header erai-card-header">
                <div class="wrapper">
                    <div class="content">
                        <img :src="iconURL" width=40px height=40px>
                    </div>
                    <div class="content">
                        <router-link class="erai-username" :to="{name: 'UserPage', params: {id: author_auth_id}}">
                           {{ post.author.username }}
                        </router-link>
                        <div class="erai-datetime">
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
  color:rgba(18, 21, 37, 0.54);
}

.stamp {
  margin: 0px 8px;
}

.erai-card-color {
  color: #121525;
  background-color: #ffffff;
  font-family: 'M PLUS 1p', sans-serif;
}

.erai-username {
  margin-left: 12px;
  color: #121525;
  background-color: #ffffff;
  font-weight: 900;
  font-family: 'Lato', 'M PLUS 1p', sans-serif;
}

.erai-datetime {
  margin-left:12px;
  color: rgba(18,21,37,0.54);
  font-size: 0.8rem;
  font-family: 'Lato', sans-serif;
}

.erai-card-header {
  background-color: #ffffff;
}

.border-line {
  border-style: solid;
  border-color: rgba(18, 21, 37, 0.12);
  border-width: 1px 0 0 0;
}

</style>
