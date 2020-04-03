const functions = require('firebase-functions');
const verifyPassword = require('./verify-password')

async function getLetters(collection, limit, skip) {
    const documents = await (
        collection.orderBy('createdAt')
            .offset(+skip)
            .limit(+limit).get()
    )

    return documents.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
    }))
}

module.exports = (store) => functions.https.onRequest(async (request, response) => {
    if (!verifyPassword(request.header('authorization') || null)) response.status(401).send([])

    const collection = store.collection('letters')

    const {limit, skip} = request.query

    response.send(await getLetters(collection, limit, skip))
});
