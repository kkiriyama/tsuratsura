<template>
    <div>
        <div class="form-horizontal" id="post">
            <form @submit.prevent="sendPost">
                <fieldset>
                    <div class="form-group">
                        <div class="col-md-12">
                            <input type="text" class="form-control" id="inputUsername" placeholder="ハンドルネーム">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <textarea class="form-control" rows=3 id="inputText" placeholder="投稿内容"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12 col-md-offset-2">
                            <button type="submit" class="btn btn-primary center-block">投稿</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      username: '',
      text: ''
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
