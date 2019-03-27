<template>
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
                    <div>
                        <button class="button" type="submit">ログイン</button>
                    </div>
                </fieldset>
            </form>
        </div>
        <p> アカウントをお持ちではないですか？
            <router-link to="/signup">登録</router-link>
        </p>
    </div>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    confirmUserInfo () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert('ログインに成功しました')
          this.$router.push('/')
        })
        .catch(error => alert(error.message))
    }
  }
}

</script>

<style>
.signin-form {
    margin: 10px auto;
}
</style>
