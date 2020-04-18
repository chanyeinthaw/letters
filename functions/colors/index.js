const container = require('../setup/container')
const createExpressApp = require('../shared/express-app')

function colors() {
    const firestore = container.get('store')

    const colors = createExpressApp()

    colors.get('/', require('./colors')(firestore))

    return colors
}

module.exports = colors
