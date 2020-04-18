const verifyPassword = require('../verify-password')

async function getLetters(collection, limit, skip) {
    const counter = await collection.get()
    const documents = await (
        collection.orderBy('createdAt', 'desc')
            .offset(+skip)
            .limit(+limit).get()
    )

    return [documents.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
    })), skip < counter.size-1]
}

module.exports = (store) => async (request, response) => {
    if (!verifyPassword(request.headers['authorization'] || null)) response.status(401).send([])

    const collection = store.collection('letters')

    const {limit, skip} = request.query

    const [letters, hasNext] = await getLetters(collection, limit, skip)

    response
        .send({
            letters,
            hasNext
        })
}
