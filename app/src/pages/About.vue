<template>
    <div>
        <common-header
            :is-logged-in="isLoggedIn"
            mode="other"/>
        <div class="container">
            <h1 style="margin: 30px;"> About </h1>
            <div class="container container-about">
                <p align="left" class="about-sentence">このサイトは「つらい人の、つらい人による、つらい人のためのSNS」を目指して作られたSNS、<b>TsuraTsura</b>です。
                </p>
                <p align="left" class="about-sentence"><b>つらいTL</b>では今日あったつらいことを投稿してみましょう。しばらくすれば他のユーザーから
                    労いや慰めのスタンプが届くことでしょう。スタンプの意味は左から「それはつらい」「よしよし」「頑張ったね」です。
                </p>
                <p align="left" class="about-sentence"><b>えらいTL</b>では今日成し遂げたえらいことを（どんなに些細なことでも！）投稿してみましょう。
                    しばらくすれば他のユーザーから賞賛のスタンプが届くことでしょう。スタンプの意味は左から「すごい！」「おめでとう！」「天才か？」です。
                </p>
                <p align="left" class="about-sentence">
                    このSNSはお互いのつらいこと、えらいことを共有することに特化しています。ダイレクトメッセージ、画像投稿、リプライ、誰がスタンプを押したかの確認などは悩んだ末に実装しない方針をとりました。
                </p>
                <p align="left" class="about-sentence">
                    匿名性の高い空間で、穏やかに、ひっそりとささやかな交流がなされることを願っています。
                </p>
            </div>
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

<style scoped>
.about-sentence {
    margin: 40px 10px;
}

.container-about {
    width: 95%;
}
</style>
