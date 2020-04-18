const verifyPassword = require('../verify-password')

module.exports = (store) => async (request, response) => {
    if (!verifyPassword(request.headers['authorization'] || null)) response.status(401).send([])

    const doc = await store.collection('letters').add({
        createdAt: Date.now(),
        styles: request.headers['styles'],
        text: request.body
    })

    response.send({
        letterId: doc.id
    })
}
