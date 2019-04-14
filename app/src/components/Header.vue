<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-brand><router-link class="header-link" to="/"> TsuraTsura ~つらいひとのSNS~ </router-link></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-if=!isLoggedIn><router-link class="header-link" to='/signin'>ログイン</router-link></b-nav-item>
                    <b-nav-item v-if=!isLoggedIn><router-link class="header-link" to='/signup'>新規登録</router-link></b-nav-item>
                    <b-nav-item v-if=isLoggedIn><router-link class="header-link" :to="{name: 'UserPage', params: {id: userAuthId}}">マイページ</router-link></b-nav-item>
                    <b-nav-item v-if=isLoggedIn @click="signOut">ログアウト</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    userAuthId () {
      return this.$store.state.userInfo.auth_id
    }
  },
  methods: {
    signOut () {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch('getLoginState')
        this.$store.dispatch('getUserInfoState')
        this.$router.push('/signin')
      })
    }
  }
}
</script>

<style>

.header-link {
    color: cyan
}

</style>
