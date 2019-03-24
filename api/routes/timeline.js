const express = require('express');
const router = express.Router();
const admin = require('firebase-admin')
const cors = require('cors')

var serviceAccount = require("../.firebaseconfig/tsuratsura-0000-firebase-adminsdk-8wioi-c0cb2e6460.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

var db = admin.firestore()

router.get('/', cors(), function(req, res, next) {
    (async () => {
        const data = await db.collection('posts').get()
        let postData = []
        data._docs().forEach(doc => postData.push(doc._fieldsProto))
        res.send({
                data: postData
        })
    })().catch(next)
});

module.exports = router;
