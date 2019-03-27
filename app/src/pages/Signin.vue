<template>
    <div class="signin container">
        <h2>ログイン</h2>
        <div class="form-horizontal" id="signin">
            <form @submit.prevent="confirmUserInfo">
                <fieldset class="row">
                    <div class="form-group col-sm-4 signin-form">
                        <div>
                            <input v-model="username" type="input" class="form-control" id="confirmUsername" placeholder="ハンドルネーム">
                        </div>
                    </div>
                    <div class="form-group col-sm-4 signin-form">
                        <div>
                            <input v-model="password" type="input" class="form-control" id="confirmPassword" placeholder="パスワード">
                        </div>
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

export default {
  name: 'Signin',
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
.signin-form {
    margin: 10px auto;
}
</style>
