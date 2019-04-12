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
                            <button :disabled="isProcessing" type="submit" class="btn btn-primary center-block">投稿</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

const firestore = firebase.firestore()

export default {
  data () {
    return {
      text: '',
      isProcessing: false
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
    startProcessing () {
      this.isProcessing = true
    },
    endProcessing () {
      this.isProcessing = false
    },
    sendPost () {
      if (this.text === '') {
        alert('投稿内容を入力してください')
        return
      }
      this.startProcessing()
      firestore.collection('posts').add({
        username: this.username,
        body: this.text,
        created_at: new Date().getTime(),
        enable: true,
        that_is_too_bad_list: [],
        you_are_alright_list: [],
        good_job_list: [],
        author: firestore.doc('/users/' + this.user_id)
      })
        .then((res) => {
          this.clearForm()
          this.$store.dispatch('getTimeline')
          this.endProcessing()
        })
        .catch(e => {
          console.error(e)
          this.endProcessing()
        })
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
