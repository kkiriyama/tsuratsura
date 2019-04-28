<template>
    <span class="stamp" @click="click()">
        <component
            :is="stampComponent"
            :width="width"
            :height="height"
            :icon-color="stampColor"/>
        <span>{{ count }}</span>
    </span>
</template>

<script>
import TooBad from '@/components/icon/TooBad'
import AllRight from '@/components/icon/AllRight'
import Congrat from '@/components/icon/Congrat'
import Great from '@/components/icon/Great'
import GoodJob from '@/components/icon/GoodJob'
import Genius from '@/components/icon/Genius'

const iconTable = {
  'too-bad': { component: TooBad, color: '#7892d6', inactiveColor: 'gray' },
  'alright': { component: AllRight, color: '#bd4f6c', inactiveColor: 'gray' },
  'good-job': { component: GoodJob, color: '#51a3a3', inactiveColor: 'gray' },
  'great': { component: Great, color: '#f4a55f', inactiveColor: 'gray' },
  'congrat': { component: Congrat, color: '#bd4f6c', inactiveColor: 'gray' },
  'genius': { component: Genius, color: '#51a3a3', inactiveColor: 'gray' }
}

export default {
  name: 'Stamp',
  components: {
    TooBad,
    AllRight,
    Congrat,
    Great,
    GoodJob,
    Genius
  },
  data () {
    return {
      width: 20,
      height: 20
    }
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
    stampComponent () {
      const res = iconTable[this.kind]
      return res.component
    },
    stampColor () {
      let res = iconTable[this.kind]
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
