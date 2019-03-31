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
                    posts.push(doc.data())
                    authors.push(doc.data().author.get())
                })
                return {posts: posts, authors: authors}
            })
        data = []
        for (i=0; i<dataWithPromise.posts.length; i++) {
            a = await dataWithPromise.authors[i]
                .then(doc => doc.data())
            data.push({posts: dataWithPromise.posts[i], author: a})
        }
        res.send({
            data: data.reverse()
        })
    })().catch(next)
});

module.exports = router;
