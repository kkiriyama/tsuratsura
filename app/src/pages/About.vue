<template>
    <div>
        <common-header
            :is-logged-in="isLoggedIn"
            mode="other"/>
        <div class="container">
            <h1 style="margin: 30px;"> About </h1>
            <b-card-group deck>
                <b-card
                    title="いんぐらむ"
                    sub-title="プログラマー"
                    style="max-width: 100rem;"
                    class="mb-2">
                    <b-card-text>
                        このSNSを作りはじめた人です。
                    </b-card-text>
                    <b-link href="https://twitter.com/kazuokiriyama_" class="card-link"> @kazuokiriyama_ </b-link>
                </b-card>
                <b-card
                    title="TEICA"
                    sub-title="デザイナー"
                    style="max-width: 100rem;"
                    class="mb-2">
                    <b-card-text>
                        ねこです、よろしくお願いします。
                    </b-card-text>
                    <b-link href="https://twitter.com/teiflower" class="card-link"> @teiflower </b-link>
                </b-card>
                <!-- <b-card
                    title="Lenqth"
                    sub-title="プログラマー"
                    style="max-width: 100rem;"
                    class="mb-2">
                    <b-card-text>
                        hogehoge
                    </b-card-text>
                    <b-link href="https://twitter.com/lenqth" class="card-link"> @lenqth </b-link>
                </b-card> -->
            </b-card-group>
            <p> 一緒に開発してくれる人を募集しています！ </p>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    'common-header': Header
  },
  created () {
    this.$store.dispatch('getLoginState')
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  }
}
</script>
