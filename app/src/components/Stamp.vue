<template>
    <span @click="toggle-stamp">
        <v-icon :name="stampKind" scale="1.5" :color="stampColor"/>
        <span>{{ stampNum }}</span>
    </span>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'

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
    post: {
      type: Object,
      required: true
    }
  },
  mounted () {
    if (this.kind === 'too-bad') {
      this.stampNum = this.post.posts.that_is_too_bad_list.length
      this.stampColor = 'blue'
      this.stampKind = 'sad-tear'
    } else if (this.kind === 'alright') {
      this.stampNum = this.post.posts.you_are_alright_list.length
      this.stampColor = 'pink'
      this.stampKind = 'hand-holding-heart'
    } else if (this.kind === 'good-job') {
      this.stampNum = this.post.posts.good_job_list.length
      this.stampColor = 'green'
      this.stampKind = 'thumbs-up'
    }
  }
}
