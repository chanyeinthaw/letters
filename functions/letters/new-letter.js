const verifyPassword = require('../shared/verify-password')

module.exports = (store) => async (request, response) => {
    if (!verifyPassword(request.headers['authorization'] || null)) response.status(401).send([])

    const doc = (await store.collection('letters').add({
        createdAt: request.body.createdAt,
        styles: request.body.styles,
        text: request.body.text
    }))

    response.send({
        _id: doc.id,
        ...request.body
    })
}
