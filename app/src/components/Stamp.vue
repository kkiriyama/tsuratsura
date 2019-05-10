<template>
    <div class="stamp-layout">
      <span class="stamp" @click="click()">
        <component
            :is="stampComponent"
            :width="width"
            :height="height"
            :icon-color="stampColor"/>
      </span>
      <br><span :style="stampCounter">{{ count }}</span>
    </div>
</template>

<script>
import TooBad from '@/components/icon/TooBad'
import AllRight from '@/components/icon/AllRight'
import Congrat from '@/components/icon/Congrat'
import Great from '@/components/icon/Great'
import GoodJob from '@/components/icon/GoodJob'
import Genius from '@/components/icon/Genius'

const iconTable = {
  'too-bad': { component: TooBad, color: '#7892d6', inactiveColor: 'gray', numColor: 'rgba(255, 255, 255, 0.7)' },
  'alright': { component: AllRight, color: '#bd4f6c', inactiveColor: 'gray', numColor: 'rgba(255, 255, 255, 0.7)' },
  'good-job': { component: GoodJob, color: '#51a3a3', inactiveColor: 'gray', numColor: 'rgba(255, 255, 255, 0.7)' },
  'great': { component: Great, color: '#f4a55f', inactiveColor: 'gray', numColor: 'rgba(18, 21, 37, 0.54)' },
  'congrat': { component: Congrat, color: '#bd4f6c', inactiveColor: 'gray', numColor: 'rgba(18, 21, 37, 0.54)' },
  'genius': { component: Genius, color: '#51a3a3', inactiveColor: 'gray', numColor: 'rgba(18, 21, 37, 0.54)' }
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
      height: 20,
      stampCounter: {
        color: this.stampCounterColor,
        paddingRight: '4px'
      }
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
    },
    stampCounterColor () {
      const res = iconTable[this.kind]
      return res.stampColor
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>
<style>

.stamp-layout{
  padding-left:12px;
  float: left;
}

</style>
