<template>
    <div>
        <common-header :is-logged-in="isLoggedIn"/>
        <div class="container">
            <h2> About </h2>
            <h3> プログラムを書いた人 </h3>
            <table align="center" class="table table-hover">
                <tbody>
                    <tr>
                        <th> ハンドルネーム </th>
                        <td> いんぐらむ </td>
                    </tr>
                    <tr>
                        <th> Twitter </th>
                        <td> @kazuokiriyama_ </td>
                    </tr>
                    <tr>
                        <th> 一言 </th>
                        <td> 中退したい </td>
                    </tr>
                </tbody>
            </table>
            <h3> デザインを考えた人 </h3>
            <table align="center" class="table table-hover">
                <tbody>
                    <tr>
                        <th> ハンドルネーム </th>
                        <td> TEICA </td>
                    </tr>
                    <tr>
                        <th> Twitter </th>
                        <td> @T_E_I_C_A </td>
                    </tr>
                    <tr>
                        <th> 一言 </th>
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
