<template>
    <div>
        <common-header
            :is-logged-in="isLoggedIn"
            mode="other"/>
        <div class="container">
            <h2> About </h2>
            <table align="center" class="table">
                <thead>
                    <tr>
                        <th></th>
                        <td>プログラマー</td>
                        <td>デザイナー</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th> ハンドルネーム </th>
                        <td> いんぐらむ </td>
                        <td> TEICA </td>
                    </tr>
                    <tr>
                        <th> Twitter </th>
                        <td> @kazuokiriyama_ </td>
                        <td> @T_E_I_C_A </td>
                    </tr>
                    <tr>
                        <th> 一言 </th>
                        <td> 中退したい </td>
                        <td> ねこです、よろしくおねがいします </td>
                    </tr>
                </tbody>
            </table>
            <p>開発に協力してくれる方を随時募集しています！</p>
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
