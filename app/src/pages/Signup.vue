<template>
    <div class="siginup container">
        <h2> ユーザー登録 </h2>
        <div class="form-horizontal" id="signup">
            <form @submit.prevent="addUserInfo">
                <fieldset class="row">
                    <div class="form-group col-sm-4 signup-form">
                        <div>
                            <input v-model="email" type="text" class="form-control" id="registerUsername" placeholder="メールアドレス">
                        </div>
                    </div>
                    <div class="form-group col-sm-4 signup-form">
                        <div>
                            <input v-model="password" type="password" class="form-control" id="registerPassword" placeholder="パスワード">
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
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    addUserInfo () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert('メールアドレス: ' + user.email + 'で登録しました')
          this.$router.push('/')
        })
        .catch(error => {
          alert(error.message)
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
