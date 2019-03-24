<template>
    <div>
        <div id="title">
            <h2> TsuraTsura </h2>
        </div>
        <div class="row">
            <div class="col-sm-3" id="submit-post">
                <post-submit-form/>
            </div>
            <div class="col-sm-6" id="timeline">
                <show-timeline
                    v-for="(post, index) in posts"
                    :key="index"
                    :post="post"/>
            </div>
        </div>
    </div>
</template>

<script>
import PostSubmitForm from '@/components/PostSubmitForm'
import ShowTimeline from '@/components/ShowTimeline'

export default {
  name: 'Timeline',
  components: {
    'post-submit-form': PostSubmitForm,
    'show-timeline': ShowTimeline
  },
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('getTimeline')
  },
  computed: {
    posts () {
      return this.$store.state.posts.data
    }
  }
}
</script>
