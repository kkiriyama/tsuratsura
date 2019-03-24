<template>
    <div>
        <div class="card p-2 mb-2 float-lg-left">
            <div class="card-header text-left">
                {{ post.username.stringValue }}
            </div>
            <div class="card-body text-left">
                <span class="card-text">{{ post.body.stringValue }}</span>
            </div>
            <div class="card-footer text-right">
                <small class="text-muted">posted at</small>
                <span>{{ post.created_at.integerValue }}</span>
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
  }
}
</script>
