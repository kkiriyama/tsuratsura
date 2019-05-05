<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
const serviceAccount = require('./.firebaseconfig/apiconfig.json')
firebase.initializeApp(serviceAccount)

export default {
  name: 'App'
}
</script>

<style>
html {
  height: 100%;
}
</style>

<style scoped>
#app {
  height: 100%;
  font-family: 'Lato', 'M PLUS 1p', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  overflow: hidden;
}
</style>
