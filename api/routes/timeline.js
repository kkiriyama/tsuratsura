const express = require('express');
const router = express.Router();
const admin = require('firebase-admin')

var db = admin.firestore()

router.get('/', function(req, res, next) {
    (async () => {
        const dataWithPromise = await db.collection('posts').orderBy('created_at').get()
            .then((snapshot) => {
                const posts = []
                const authors = []
                snapshot.forEach((doc) => {
                    const docObj = doc.data()

                    // それはつらいスタンプ
                    const tooBadRefList = docObj.that_is_too_bad_list
                    const tooBadUserList = []
                    for (let i=0; i<tooBadRefList.length; i++) {
                        const userDoc = tooBadRefList[i]
                        const userId = userDoc.id
                        tooBadUserList.push(userId)
                    }
                    docObj.too_bad_id_list = tooBadUserList

                    // よしよしスタンプ
                    const alrightRefList = docObj.you_are_alright_list
                    const alrightUserList = []
                    for (let i=0; i<alrightRefList.length; i++) {
                        const userDoc = alrightRefList[i]
                        const userId = userDoc.id
                        alrightUserList.push(userId)
                    }
                    docObj.alright_id_list = alrightUserList

                    // 頑張ったねスタンプ
                    const goodJobRefList = docObj.good_job_list
                    const goodJobUserList = []
                    for (let i=0; i<goodJobRefList.length; i++) {
                        const userDoc = goodJobRefList[i]
                        const userId = userDoc.id
                        goodJobUserList.push(userId)
                    }
                    docObj.good_job_id_list = goodJobUserList

                    docObj.id = doc.id
                    posts.push(docObj)
                    authors.push(doc.data().author.get())
                })
                return {posts: posts, authors: authors}
            })
        data = []
        for (i=0; i<dataWithPromise.posts.length; i++) {
            a = await dataWithPromise.authors[i]
                .then((doc) => {
                    const docObj = doc.data()
                    docObj.user_id = doc.id
                    return docObj
                })
            data.push({posts: dataWithPromise.posts[i], author: a})
        }
        res.send({
            data: data.reverse()
        })
    })().catch(next)
});

module.exports = router;
