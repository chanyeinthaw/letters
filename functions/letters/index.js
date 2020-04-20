const container = require('../setup/container')
const createExpressApp = require('../shared/express-app')

function letters() {
    const firestore = container.get('store')

    const letters = createExpressApp()

    letters.get('/:id?', require('./letters')(firestore))
    letters.delete('/:id', require('./delete-letter')(firestore))
    letters.post('/', require('./new-letter')(firestore))

    return letters
}

module.exports = letters
