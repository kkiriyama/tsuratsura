<template>
    <div>
    <common-header
        :is-logged-in="isLoggedIn"
        mode="other"/>
        <div class="signup container">
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
                            <b-button :disable="isProcessing" variant="info" type="submit">登録</b-button>
                            <v-icon v-if="isProcessing" name="sync" scale="1.3" spin/>
                        </div>
                    </fieldset>
                </form>
            </div>
            <p> アカウントをお持ちですか?
                <router-link to="/signin">ログイン</router-link>
            </p>
            <b-button :disable="isProcessing" variant="danger" @click="signInWithGoogle">Googleでログイン</b-button>
            <b-button :disable="isProcessing" variant="primary" @click="signInWithTwitter">Twitterでログイン</b-button>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import Header from '@/components/Header'
import Icon from 'vue-awesome/components/Icon'
import { signInWithProvider } from '@/mixins/signInWithProvider'

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
    'common-header': Header,
    'v-icon': Icon
  },
  mixins: [
    signInWithProvider
  ],
  async created () {
    await this.$store.dispatch('getLoginState')
    if (this.isLoggedIn) {
      this.$router.replace('/timeline')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    addUserInfo () {
      if (this.password !== this.passwordConfirm) {
        alert('パスワードを確認してください')
        return
      }
      if (this.username.length > 10) {
        alert('ハンドルネームは10文字以内にしてください')
        return
      }
      if (this.twitter.length > 30) {
        alert('Twitter IDが長すぎます')
        return
      }
      const twitterPattern = /^@[a-zA-Z0-9_]+$/
      const regMatch = this.twitter.match(twitterPattern)
      if (!!this.twitter && regMatch === null) {
        alert('Twiiter IDは1文字目が@でかつ半角英数字とアンダーバーのみしか入力できません')
        return
      }
      this.twitter = !this.twitter ? '' : regMatch[0]
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
          this.$router.push('/timeline/tsurai')
        })
        .catch(e => {
          if (e.code === 'auth/invalid-email') {
            alert('適切なメールアドレスを入力してください')
          }
          if (e.code === 'auth/weak-password') {
            alert('パスワードは6文字以上に設定してください')
          }
          this.endProcessing()
        })
    }
  }
}
</script>

<style scoped>

.signup {
    margin: 100px auto;
}

.signup-form {
    margin: 10px auto;
}
</style>
