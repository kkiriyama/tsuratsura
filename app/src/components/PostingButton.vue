<template>
    <vue-fab
        mainBtnColor="blue"
        size="big"
        @post="post()">
        <fab-item
            v-for="(item, index) in menu"
            :key="index"
            :idx="index"
            :title="item.title"
            :color="item.color"
            :icon="item.icon"
            @clickItem="clickItem"/>
    </vue-fab>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          name: '投稿',
          icon: 'create',
          color: 'blue'
        },
        {
          name: 'トップに戻る',
          icon: 'keyboard_arrow_up',
          color: 'red'
        },
        {
          name: 'マイページ',
          icon: 'home',
          color: 'green'
        }
      ]
    }
  },
  methods: {
    clickItem (idx) {
      if (idx.idx === 0) {
        this.$emit('popPost')
      } else if (idx.idx === 1) {
        this.$emit('toTop')
      } else if (idx.idx === 2) {
        this.$emit('toHome')
      }
    }
  }
}
</script>
