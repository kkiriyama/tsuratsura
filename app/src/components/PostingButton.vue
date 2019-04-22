<template>
    <a class="fab" id="fab" @click="clickItem()">
        <v-icon class="fab-icon" name="pencil-alt" scale="2" color="#ffffff"/>
    </a>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    'v-icon': Icon
  },
  methods: {
    clickItem () {
      this.$emit('popPost')
    }
  }
}
</script>

<style>

.fab {
    display: block;
    width: 56px;
    height: 56px;
    background: #7892d6;
    border-radius: 50%;
    transition: .3s;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);
}

.fab-icon {
    margin: 10px auto;
}

</style>
