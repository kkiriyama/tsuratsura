<template>
    <div class="submit-post-form">
        <div :class="{'is-open': showModal, 'p-modal': !showModal}">
            <form @submit.prevent="sendPost" class="margin-top">
                <fieldset>
                    <div class="form-group row">
                        <div class="col-md-4 offset-md-4">
                            <textarea v-model="text" class="form-control form-margin" rows=5 id="inputText" placeholder="今日のつらかったこと"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12 col-mdhhoffset-2">
                            <button :disabled="isProcessing" type="submit" class="btn btn-primary center-block" @click="$emit('close')">投稿</button>
                        </div>
                    </div>
                </fieldset>
            </form>
            <button class="btn btn-primary center-block" @click="$emit('close')">閉じる</button>
        </div>
        <div class="form-horizontal" id="post" v-if="!isMobile">
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
  template: '#modal-template',
  data () {
    return {
      text: '',
      isProcessing: false
    }
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    },
    showModal: {
      type: Boolean,
      default: false
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
      if (this.text.length > 140) {
        alert('投稿は140文字以内にしてください')
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
.margin-top {
    margin: 200px 10px 0px 10px;
}
.p-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    visibility: hidden;
    opacity: 0;
    z-index: -1;
}
.is-open {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    visibility: visible;
    opacity: 1;
    z-index: 100;
}
</style>
