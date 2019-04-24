<template>
    <span class="stamp" @click="click()">
        <v-icon :name="stampName" scale="1.5" :color="stampColor"/>
        <span>{{ count }}</span>
    </span>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

var iconTable = {
  'too-bad': { name: 'sad-tear', color: 'blue', inactiveColor: 'gray' },
  alright: { name: 'hand-holding-heart', color: 'pink', inactiveColor: 'gray' },
  'good-job': { name: 'thumbs-up', color: 'green', inactiveColor: 'gray' },
  great: { name: 'laugh-squint', color: 'blue', inactiveColor: 'gray' },
  congrat: { name: 'award', color: 'gold', inactiveColor: 'gray' },
  genius: { name: 'user-graduate', color: 'green', inactiveColor: 'gray' }
}

export default {
  name: 'Stamp',
  components: {
    'v-icon': Icon
  },
  data () {
    return {}
  },
  props: {
    kind: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    stampName () {
      let res = iconTable[this.kind]
      if (res === undefined) {
        res = {
          name: 'question-square',
          color: 'red',
          inactiveColor: 'lightpink'
        }
      }
      return res.name
    },
    stampColor () {
      let res = iconTable[this.kind]
      if (res === undefined) {
        res = {
          name: 'question-square',
          color: 'red',
          inactiveColor: 'lightpink'
        }
      }
      return this.active ? res.color : res.inactiveColor
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>
