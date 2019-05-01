<template>
    <a class="fab" :class="postButtonStyle" id="fab" @click="clickItem()">
        <v-icon class="icon" name="pencil-alt" scale="2" color="#ffffff"/>
    </a>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    'v-icon': Icon
  },
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  computed: {
    postButtonStyle () {
      return this.mode === 'tsurai' ? 'post-button-tsurai' : 'post-button-erai'
    }
  },
  methods: {
    clickItem () {
      this.$emit('popPost')
    }
  }
}
</script>

<style scoped>

.fab {
    display: block;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    transition: .3s;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);
}

.fa-icon {
    margin: 10px auto;
}

.post-button-tsurai {
  background: #7892d6;
}

.post-button-erai {
  background: #f4a55f;
}
</style>
