<template>
    <div class="header-char" :class="headerBg">
        <div class="title">
          <component
            :is=logoComponent />
        </div>
        <div id="nav-drawer">
            <input id="nav-input" type="checkbox" class="nav-unshown">
            <label id="nav-open" :class="headerContent" for="nav-input"><span></span></label>
            <label class="nav-unshown" id="nav-close" for="nav-input"></label>
            <div id="nav-content">
                <template v-if=!isLoggedIn>
                    <div class="header-menu-item">
                        <router-link class="header-char" to='/signin'>ログイン</router-link>
                    </div>
                    <div class="header-menu-item">
                        <router-link class="header-char" to='/signup'>新規登録</router-link>
                    </div>
                </template>
                <template>
                    <div class="header-menu-item">
                        <router-link id="tsurai" class="header-char" :to="{name: 'Timeline', params: {mode: 'tsurai'}}">つらいTL</router-link>
                    </div>
                </template>
                <template>
                    <div class="header-menu-item">
                        <router-link id="erai" class="header-char" :to="{name: 'Timeline', params: {mode: 'erai'}}">えらいTL</router-link>
                    </div>
                </template>
                <template v-if=isLoggedIn>
                    <div class="header-menu-item">
                        <router-link id="mypage" class="header-char" :to="{name: 'UserPage', params: {id: userAuthId}}">マイページ</router-link>
                    </div>
                </template>
                <template>
                    <div class="header-menu-item">
                        <router-link id="about" class="header-char" :to="{name: 'About'}">About</router-link>
                    </div>
                </template>
                <template v-if=isLoggedIn>
                    <div class="header-menu-item">
                        <router-link id="contact" class="header-char" :to="{name: 'Contact'}">Contact</router-link>
                    </div>
                </template>
                <template>
                    <div class="header-menu-item">
                        <a id="logout" class="header-char" v-if=isLoggedIn @click="signOut">ログアウト</a>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import whiteLogo from '@/components/logo/whiteLogo'
import blackLogo from '@/components/logo/blackLogo'

export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  computed: {
    userAuthId () {
      return this.$store.state.userInfo.auth_id
    },
    headerBg () {
      if (this.mode === 'tsurai') return 'header-bg-tsurai'
      if (this.mode === 'erai') return 'header-bg-erai'
      return 'header-bg-other'
    },
    headerContent () {
      if (this.mode === 'tsurai') return 'header-content-tsurai'
      if (this.mode === 'erai') return 'header-content-erai'
      return 'header-content-other'
    },
    logoComponent () {
      if (this.mode === 'tsurai') return whiteLogo
      return blackLogo
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

<style scoped>

#nav-drawer {
    position: relative;
    display: inline-block;
    float: right;
    margin: 14px 10px;
}

.nav-unshown {
    display: none;
}

#nav-open {
    display: inline-block;
    width: 30px;
    height: 22px;
    margin: auto;
    vertical-align: middle;
}

#nav-open span, #nav-open span:before, #nav-open span:after {
  position: absolute;
  height: 3px;
  width: 25px;
  border-radius: 3px;
  display: block;
  content: '';
  cursor: pointer;
}

#nav-open.header-content-tsurai span, #nav-open.header-content-tsurai span:before, #nav-open.header-content-tsurai span:after {
  background: #ffffff;
}

#nav-open.header-content-erai span, #nav-open.header-content-erai span:before, #nav-open.header-content-erai span:after {
  background: #121525;
}

#nav-open.header-content-other span, #nav-open.header-content-other span:before, #nav-open.header-content-other span:after {
  background: #121525;
}

#nav-open span:before {
  bottom: -8px;
}
#nav-open span:after {
  bottom: -16px;
}

#nav-close {
  display: none;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0;
  transition: .3s ease-in-out;
}

#nav-content {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 10%;
  z-index: 9999;
  width: 80%;
  max-height: 300px;
  height: 80%;
  background: #fff;
  transition: .3s ease-in-out;
  -webkit-transform: translateY(-110%);
  transform: translateY(-110%);
}

#nav-input:checked ~ #nav-close {
  display: block;
  opacity: .5;
}

#nav-input:checked ~ #nav-content {
  -webkit-transform: translateY(0%);
  transform: translateY(0%);
  box-shadow: 6px 0 25px rgba(0,0,0,.15);
}

.title {
    font-size: 30px;
    display: inline-block;
    margin: 4px;
}

.header-menu-item {
    margin: 15px 0;
}

.header-char {
    color: #121525;
}

.header-bg-tsurai {
    background-color: #425c9e;
}

.header-bg-erai {
    background-color: #f4a55f
}

.header-bg-other {
    background-color: rgba(18, 21, 37, 0.26);
}

.header-content-tsurai {
    color: #ffffff;
}

.header-content-erai {
    color: #121525;
}

.header-content-other {
    color: #121525;
}

</style>
