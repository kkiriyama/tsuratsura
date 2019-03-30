<template>
    <div>
        <div id="header">
            <common-header
                :is-logged-in="isLoggedIn"/>
        </div>
        <div class="row">
            <div class="col-lg-3" id="submit-post" v-if="isLoggedIn">
                <post-submit-form/>
            </div>
            <div class="col-lg-6" id="timeline">
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
import Header from '@/components/Header'

export default {
  name: 'Timeline',
  components: {
    'post-submit-form': PostSubmitForm,
    'show-timeline': ShowTimeline,
    'common-header': Header
  },
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getTimeline')
    this.$store.dispatch('getLoginState')
  },
  computed: {
    posts () {
      return this.$store.state.posts.data
    },
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
  }
}
</script>
