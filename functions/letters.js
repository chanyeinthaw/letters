const functions = require('firebase-functions');
const verifyPassword = require('./verify-password')

async function getAllLetters(collection) {
    const documents = await collection.listDocuments()
    let hasRetrievedFirst = false

    const documentData = []

    for(let doc of documents) {
        if (!hasRetrievedFirst) {
            doc = await doc.get()

            documentData.push({_id: doc.id, data: doc.data()})

            hasRetrievedFirst = true
        } else {
            documentData.push({_id: doc.id, data: null})
        }
    }

    return documentData
}

async function getOneLetter(id, collection) {
    const document = await collection.doc(id).get()

    return {
        _id: document.id,
        data: document.data()
    }
}

module.exports = (store) => functions.https.onRequest(async (request, response) => {
    if (!verifyPassword(request.header('authorization') || null)) response.status(401).send([])

    const collection = store.collection('letters')

    console.log(request.query.hasOwnProperty('id'))

    if (!request.query.hasOwnProperty('id')) {
        response.send(await getAllLetters(collection))
    } else {
        response.send(await getOneLetter(request.query.id, collection))
    }
});
