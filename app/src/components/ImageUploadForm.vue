<template>
    <div class="image-upload">
        <div class="form-group upload-form">
            <croppa
                v-model="iconCroppa"
                :placeholder-font-size="fontSize"
                :file-size-limit="maxFileSize"
                />
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
    async uploadCroppedImage () {
      let blob = await new Promise((resolve) => this.iconCroppa.generateBlob(resolve))
      if (!blob) return
      const fileName = this.userId + '.' + blob.type.split('/')[1]
      const newFile = new File([blob], fileName, {type: blob.type})
      const storageRef = firebase.storage().ref().child(`/icons/${newFile.name}`)
      try {
        let snapshot = await storageRef.put(newFile)
        let downloadURL = await snapshot.ref.getDownloadURL()
        await db.collection('users').doc(this.userId).update({
          'icon_URL': downloadURL
        })
        return downloadURL
      } catch (e) {
        alert('画像をアップロードできませんでした')
      }
    }
  }
}
</script>
