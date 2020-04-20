const verifyPassword = require('../shared/verify-password')

module.exports = (store) => async (request, response) => {
    if (!verifyPassword(request.headers['authorization'] || null)) response.status(401).send([])

    const letters = store.collection('letters')
    let {_id, createdAt, styles, text} = request.body

    if (_id === undefined) {
        const doc = await letters.add({
            createdAt: createdAt,
            styles: styles,
            text: text
        })

        _id = doc.id
    } else {
        await letters.doc(_id).update({
            createdAt: createdAt,
            styles: styles,
            text: text
        })
    }

    response.send({
        _id: _id,
        ...request.body
    })
}
