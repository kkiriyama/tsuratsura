<template>
    <div>
        <common-header
            :is-logged-in="isLoggedIn"
            mode="other"/>
        <div class="container">
            <h1 style="margin: 30px;"> Contact </h1>
            <p>バグの報告・要望・改善要求などを書いてください。</p>
            <p>報告はログインしているユーザーのみが行なえます。</p>
            <form @submit.prevent="report">
                <fieldset class="row">
                  <div class="col-lg-6 offset-lg-3">
                    <textarea v-model="reportText" class="form-control" id="reportText" rows=5 placeholder="報告内容"/>
                    <b-button :disable="isProcessing" style="margin: 10px;" class="button" type="submit">完了</b-button>
                  </div>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import firebase from 'firebase'

const db = firebase.firestore()

export default {
  data () {
    return {
      reportText: '',
      isProcessing: false
    }
  },
  components: {
    'common-header': Header
  },
  created () {
    this.$store.dispatch('getLoginState')
    this.$store.dispatch('getUserInfoState')
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    report () {
      this.isProcessing = true
      db.collection('reports').doc().set({
        username: this.$store.state.userInfo.username,
        user_id: this.$store.state.userInfo.user_id,
        content: this.reportText
      })
        .then(() => {
          alert('正常に送信できました。ご協力ありがとうございます。')
          this.reportText = ''
          this.isProcessing = false
        })
    }
  }
}
</script>
