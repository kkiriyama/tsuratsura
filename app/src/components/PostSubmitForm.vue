<template>
    <div>
        <div class="form-horizontal submit-post-form" id="post">
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
                        <div class="col-md-12 col-md-offset-2">
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
import 'firebase/firestore'

const serviceAccount = require('../.firebaseconfig/apiconfig.json')
const firebaseApp = firebase.initializeApp(serviceAccount, 'exercise-vue')
const firestore = firebaseApp.firestore()

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
        .catch(e => console.error(e))
    }
  }
}
</script>

<style>
.submit-post-form {
    width: auto;
}
</style>
