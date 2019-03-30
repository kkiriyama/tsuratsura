<template>
    <div class="submit-post-form">
        <div class="form-horizontal" id="post">
            <form @submit.prevent="sendPost">
                <fieldset>
                    <div class="form-group">
                        <div class="col-md-12">
                            <input v-model="username" type="text" class="form-control" id="inputUsername" placeholder="ハンドルネーム">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <textarea v-model="text" class="form-control" rows=3 id="inputText" placeholder="投稿内容"></textarea>
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
      username: '',
      text: ''
    }
  },
  computed: {
  },
  methods: {
    sendPost () {
      firestore.collection('posts').add({
        username: this.username,
        body: this.text,
        created_at: new Date().getTime(),
        enable: true
      })
        .then((res) => {
          this.clearForm()
          setTimeout(this.$store.dispatch('getTimeline'), 1000)
        })
        .catch(e => console.error(e))
    },
    clearForm () {
      this.username = ''
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
