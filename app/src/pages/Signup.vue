<template>
    <div class="siginup container">
        <h2> ユーザー登録 </h2>
        <div class="form-horizontal" id="signup">
            <form @submit.prevent="addUserInfo">
                <fieldset class="row">
                    <div class="form-group col-sm-4 signup-form">
                        <div>
                            <input v-model="username" type="input" class="form-control" id="registerUsername" placeholder="ハンドルネーム">
                        </div>
                    </div>
                    <div class="form-group col-sm-4 signup-form">
                        <div>
                            <input v-model="password" type="input" class="form-control" id="registerPassword" placeholder="パスワード">
                        </div>
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
export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {}
}
</script>

<style>
.signup-form {
    margin: 10px auto;
}
</style>
