<template>
    <div class="submit-post-form">
        <div class="form-horizontal" id="post">
            <form @submit.prevent="sendPost">
                <fieldset>
                    <div class="form-group">
                        <div class="col-md-12">
                            <textarea v-model="text" class="form-control" rows=3 id="inputText" placeholder="今日のつらかったこと"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12 col-mdhhoffset-2">
                            <button type="submit" class="btn btn-primary center-block">投稿</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
const serviceAccount = require('../.firebaseconfig/apiconfig.json')
firebase.initializeApp(serviceAccount)

const firestore = firebase.firestore()

export default {
  data () {
    return {
      text: ''
    }
  },
  computed: {
    username () {
      return this.$store.state.userInfo.username
    },
    user_id () {
      return this.$store.state.userInfo.user_id
    }
  },
  methods: {
    sendPost () {
      firestore.collection('posts').add({
        username: this.username,
        body: this.text,
        created_at: new Date().getTime(),
        enable: true,
        num_alright: 0,
        num_good_job: 0,
        num_that_is_too_bad: 0,
        author: firestore.doc('/users/' + this.user_id)
      })
        .then((res) => {
          this.clearForm()
          this.$store.dispatch('getTimeline')
        })
        .catch(e => console.error(e))
    },
    clearForm () {
      this.text = ''
    }
  }
}
</script>

<style>
.submit-post-form {
    margin: 20px 20px;
}
</style>
