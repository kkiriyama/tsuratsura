<template>
    <div class="submit-post-form">
        <div :class="{'is-open': showModal, 'p-modal': !showModal}">
            <form @submit.prevent="sendPost" class="margin-top">
                <fieldset>
                    <div class="form-group row">
                        <div class="col-md-4 offset-md-4">
                            <textarea v-model="text" :class="postFormStyle" class="form-control form-margin" rows=5 id="inputText" :placeholder="placeholderMassage"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12 col-mdhhoffset-2">
                            <button :disabled="isProcessing" type="submit" :class="postButtonStyle" class="btn center-block" @click="$emit('close')">投稿</button>
                        </div>
                    </div>
                </fieldset>
            </form>
            <button class="btn btn-danger center-block" @click="$emit('close')">閉じる</button>
        </div>
        <div class="form-horizontal" id="post" v-if="!isMobile">
            <form @submit.prevent="sendPost">
                <fieldset>
                    <div class="form-group">
                        <div class="col-md-12">
                            <textarea v-model="text" :class="postFormStyle" class="form-control" rows=6 id="inputText" :placeholder=placeholderMassage></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12 col-mdhhoffset-2">
                            <button :disabled="isProcessing" type="submit" :class="postButtonStyle" class="btn center-block">投稿</button>
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
    },
    mode: {
      type: String,
      required: true
    }
  },
  computed: {
    placeholderMassage () {
      if (this.mode === 'tsurai') {
        return '今日のつらかったこと'
      }
      if (this.mode === 'erai') {
        return '今日やったえらいこと'
      }
      return ''
    },
    username () {
      return this.$store.state.userInfo.username
    },
    user_id () {
      return this.$store.state.userInfo.user_id
    },
    postFormStyle () {
      return this.mode === 'tsurai' ? 'post-form-tsurai' : 'post-form-erai'
    },
    postButtonStyle () {
      return this.mode === 'tsurai' ? 'post-btn-tsurai' : 'post-btn-erai'
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
      if (this.mode === 'tsurai') {
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
            this.$store.dispatch('getTsuraiTimeline')
            this.endProcessing()
          })
          .catch(e => {
            this.endProcessing()
          })
      }
      if (this.mode === 'erai') {
        this.startProcessing()
        firestore.collection('posts_erai').add({
          username: this.username,
          body: this.text,
          created_at: new Date().getTime(),
          enable: true,
          great_list: [],
          congrat_list: [],
          genius_list: [],
          author: firestore.doc('/users/' + this.user_id)
        })
          .then((res) => {
            this.clearForm()
            this.$store.dispatch('getEraiTimeline')
            this.endProcessing()
          })
          .catch(e => {
            this.endProcessing()
          })
      }
    },
    clearForm () {
      this.text = ''
    }
  }
}
</script>

<style scoped>
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
    background-color: rgba(0, 0, 0, 0.8);
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

.post-form-tsurai, .post-form-tsurai:focus {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #ffffff;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
}

.post-form-erai, .post-form-erai:focus {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #979797;
  color: #121525;
  background-color: #ffffff;
}

.post-form-tsurai::placeholder {
  color: #ffffff;
}

.post-form-erai::placeholder {
  color: #121525;
}

.post-btn-tsurai {
  background-color: #7892d6;
  color: #ffffff;
}

.post-btn-erai {
  background-color: #f4a55f;
  color: #ffffff;
}

</style>
