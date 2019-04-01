const express = require('express');
const router = express.Router();
const admin = require('firebase-admin')

var db = admin.firestore()

router.get('/', function(req, res, next) {
    (async () => {
        const userDoc = db.collection('users').where("auth_id", "==", req.query.id)
        const data = await userDoc.get()
        .then((snapshot) => {
            let data = {}
            let index = ''
            snapshot.forEach((doc) => {
              data = doc.data()
              index = doc.id
            })
            data.user_id = index
            return data
        })
        res.send({
            data: data
        })
    })().catch(next)
});

module.exports = router;
