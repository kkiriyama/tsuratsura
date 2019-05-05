<template>
    <div class="image-upload">
        <div class="form-group upload-form">
            <croppa
                v-model="iconCroppa"
                :placeholder-font-size="fontSize"
                :file-size-limit="maxFileSize"
                />
            <button class="btn btn-success" @click="uploadCroppedImage()">アップロード</button>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
const db = firebase.firestore()

export default {
  data () {
    return {
      iconCroppa: {},
      fontSize: 14,
      maxFileSize: 1024 * 1024 * 5
    }
  },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  methods: {
    uploadCroppedImage () {
      this.iconCroppa.generateBlob((blob) => {
        const fileName = this.userId + '.' + blob.type.split('/')[1]
        const newFile = new File([blob], fileName, {type: blob.type})
        const storageRef = firebase.storage().ref().child(`/icons/${newFile.name}`)
        storageRef.put(newFile).then((snapshot) => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            db.collection('users').doc(this.userId).update({
              'icon_URL': downloadURL
            })
          })
          alert('画像がアップロードされました!')
        })
          .catch(e => alert('アップロードできませんでした'))
      })
    }
  }
}
</script>
