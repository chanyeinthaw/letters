async function getLetters(collection, limit, skip) {
    const counter = await collection.get()
    const documents = await (
        collection
            .orderBy('createdAt', 'desc')
            .offset(+skip)
            .limit(+limit).get()
    )

    return [documents.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
    })), skip < counter.size-1]
}

async function getLetter(collection, id) {
    const document = await (
        collection.doc(id).get()
    )

    if (!document.exists) return null

    return {
        _id: document.id,
        ...document.data()
    }
}

module.exports = (store) => async (request, response) => {
    const collection = store.collection('letters')

    if (request.params.id) {
        const letter = await getLetter(collection, request.params.id)

        if (!letter) response.status(400).send()

        return response.send(letter)
    }

    const {limit, skip} = request.query

    const [letters, hasNext] = await getLetters(collection, limit, skip)

    response
        .send({
            letters,
            hasNext
        })
}
