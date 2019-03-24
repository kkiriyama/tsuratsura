<template>
    <div>
        <div class="card p-2 mb-2">
            <div class="card-header text-left">
                {{ post.username.stringValue }}
            </div>
            <div class="card-body text-left">
                <span class="card-text">{{ post.body.stringValue }}</span>
            </div>
            <div class="card-footer text-right">
                <small class="text-muted">posted at</small>
                <span>{{ formattedCreatedTime }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Timeline',
  data () {
    return {}
  },
  mounted () {
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
  },
  computed: {
    formattedCreatedTime () {
      const d = new Date(this.post.created_at.integerValue * 1)
      const formattedMinutes = ('00' + d.getMinutes()).slice(-2)
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}:${formattedMinutes}`
    }
  }
}
</script>

<style>
.card {
    width: 80%;
    margin: 10px auto;
}
</style>
