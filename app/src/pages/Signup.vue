<template>
    <div>
    <common-header
        :is-logged-in="isLoggedIn"/>
        <div class="siginup container">
            <h2> ユーザー登録 </h2>
            <div class="form-horizontal" id="signup">
                <form @submit.prevent="addUserInfo">
                    <fieldset class="row">
                        <div class="form-group col-md-8 signup-form">
                            <div>
                                <input v-model="username" type="text" class="form-control" id="registerUsername" placeholder="ハンドルネーム">
                            </div>
                        </div>
                        <div class="form-group col-md-8 signup-form">
                            <div>
                                <input v-model="email" type="text" class="form-control" id="registerEmail" placeholder="メールアドレス">
                            </div>
                        </div>
                        <div class="form-group col-md-8 signup-form">
                            <div>
                                <input v-model="twitter" type="text" class="form-control" id="registerTwitterID" placeholder="Twitter ID(任意)">
                            </div>
                        </div>
                        <div class="form-group col-md-8 signup-form">
                            <div>
                                <input v-model="password" type="password" class="form-control" id="registerPassword" placeholder="パスワード">
                            </div>
                        </div>
                        <div class="form-group col-md-8 signup-form">
                            <div>
                                <input v-model="passwordConfirm" type="password" class="form-control" id="confirmPassword" placeholder="パスワード(確認)">
                            </div>
                        </div>

                        <div class="col-md-8 signup-form">
                            <button :disable="isProcessing" class="button" type="submit">登録</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <p> アカウントをお持ちですか?
                <router-link to="/signin">ログイン</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import Header from '@/components/Header'

const firestore = firebase.firestore()

export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
      twitter: '',
      isProcessing: false
    }
  },
  components: {
    'common-header': Header
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
    addUserInfo () {
      if (this.password !== this.passwordConfirm) {
        alert('パスワードを確認してください')
        return
      }
      if (this.username.length > 10) {
        alert('ハンドルネームは10文字以内にしてください')
        return
      }
      this.startProcessing()
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              firestore.collection('users').add({
                auth_id: user.uid,
                icon_URL: '',
                last_login: new Date(),
                twitter: this.twitter,
                username: this.username
              })
            }
          })
          this.endProcessing()
          alert('登録が正常に完了しました。トップページに移ります。')
          this.$router.push('/')
        })
        .catch(e => {
          console.error(e)
          this.endProcessing()
        })
    }
  }
}
</script>

<style>
.signup-form {
    margin: 10px auto;
}
</style>
