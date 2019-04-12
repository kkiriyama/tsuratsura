const functions = require('firebase-functions');

const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()

const cors = require('cors')({origin: true})

exports.timeline = functions.https.onRequest((req, res, next) => {
    cors(req, res, async () => {
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
    })
})

exports.getuser = functions.https.onRequest(async (req, res, next) => {
    cors(req, res, async () => {
        const userDoc = db.collection('users').where('auth_id', '==', req.query.id)
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
    })
})

