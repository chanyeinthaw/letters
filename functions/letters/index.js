const container = require('../setup/container')
const createExpressApp = require('../setup/express-app')

function letters() {
    const firestore = container.get('store')

    const letters = createExpressApp()

    letters.get('/', require('./letters')(firestore))
    letters.post('/', require('./new-letter')(firestore))

    return letters
}

module.exports = letters
