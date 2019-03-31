<template>
    <div>
    <common-header
        :is-logged-in="isLoggedin"/>
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
                                <input v-model="passwordConfirm" type="password" class="form-control" id="registerPassword" placeholder="パスワード(確認)">
                            </div>
                        </div>

                        <div>
                            <button class="button" type="submit">登録</button>
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

export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
      twitter: ''
    }
  },
  components: {
    'common-header': Header
  },
  methods: {
    addUserInfo () {
      if (this.password !== this.passwordConfirm) {
        alert('パスワードを確認してください')
        return
      }
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('登録が正常に完了しました。トップページに移ります。')
          this.$router.push('/')
        })
        .catch(e => console.error(e))
    }
  }
}
</script>

<style>
.signup-form {
    margin: 10px auto;
}
</style>
