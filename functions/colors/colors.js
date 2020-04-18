module.exports = (store) => async (request, response) => {
    const collection = store.collection('colors')

    const documents = await collection.get()

    response
        .send({colors: documents.docs.map(doc => doc.data().color)})
}
