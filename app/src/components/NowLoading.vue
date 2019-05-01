<template>
    <div class="now-loading">
        <h2> Now Loading ... </h2>
        <v-icon name="sync" scale="3" spin/>
    </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    'v-icon': Icon
  }
}
</script>

<style scoped>
.now-loading {
  height: 100%;
  margin: 100px auto;
}
</style>
