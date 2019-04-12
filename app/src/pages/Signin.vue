<template>
    <div>
        <common-header :is-logged-in="isLoggedIn"/>
        <div class="signin container">
            <h2>ログイン</h2>
            <div class="form-horizontal" id="signin">
                <form @submit.prevent="confirmUserInfo">
                    <fieldset class="row">
                        <div class="form-group col-sm-4 signin-form">
                            <div>
                                <input v-model="email" type="input" class="form-control" id="confirmUsername" placeholder="メールアドレス">
                            </div>
                        </div>
                        <div class="form-group col-sm-4 signin-form">
                            <div>
                                <input v-model="password" type="password" class="form-control" id="confirmPassword" placeholder="パスワード">
                            </div>
                        </div>
                        <p>※ログイン処理には1-2秒かかります</p>
                        <div>
                            <button :disable="isProcessing" class="button" type="submit">ログイン</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <p> アカウントをお持ちではないですか？
                <router-link to="/signup">登録</router-link>
            </p>
        </div>
    </div>
</template>

<script>

import firebase from 'firebase'
import Header from '@/components/Header'

export default {
  name: 'Signin',
  components: {
    'common-header': Header
  },
  data () {
    return {
      email: '',
      password: '',
      isProcessing: false
    }
  },
  created () {
    this.$store.dispatch('getLoginState')
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    startProcessing () {
      this.isProcessing = true
    },
    endProcessing () {
      this.isProcessing = false
    },
    confirmUserInfo () {
      this.startProcessing()
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.endProcessing()
          alert('ログインに成功しました')
          this.$router.push('/')
        })
        .catch(error => {
          alert(error.message)
          this.endProcessing()
        })
    }
  }
}

</script>

<style>
.signin-form {
    margin: 10px auto;
}
</style>
