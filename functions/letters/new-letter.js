const verifyPassword = require('../shared/verify-password')

module.exports = (store) => async (request, response) => {
    if (!verifyPassword(request.headers['authorization'] || null)) response.status(401).send([])

    console.log(request.headers)

    const doc = await store.collection('letters').add({
        createdAt: parseInt(request.headers['createdat']),
        styles: request.headers['styles'],
        text: request.body
    })

    response.send({
        letterId: doc.id
    })
}
