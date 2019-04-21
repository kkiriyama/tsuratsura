<template>
    <div>
        <common-header
            :is-logged-in="isLoggedIn"
            mode="other"/>
        <div class="signin container">
            <h2>ログイン</h2> <div class="form-horizontal" id="signin"> <form @submit.prevent="confirmUserInfo"> <fieldset class="row">
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
                        <div class="col-sm-4 signin-form">
                            <b-button :disable="isProcessing" variant="info" type="submit">ログイン</b-button>
                            <v-icon v-if="isProcessing" name="sync" scale="1.3" spin/>
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
import Icon from 'vue-awesome/components/Icon'

const db = firebase.firestore()

export default {
  name: 'Signin',
  components: {
    'common-header': Header,
    'v-icon': Icon
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
        .then((user) => {
          this.$store.dispatch('getVisitedUserInfoState', user.user.uid)
          db.collection('users').doc(this.$store.state.visitedUserInfo.user_id).update({
            last_login: new Date()
          })
          this.endProcessing()
          this.$router.push('/timeline/tsurai')
        })
        .catch((e) => {
          console.error(e)
          alert('ログインできません')
          this.endProcessing()
        })
    }
  }
}

</script>

<style>

.signin {
    margin: 100px auto;
}

.signin-form {
    margin: 10px auto;
}
</style>
