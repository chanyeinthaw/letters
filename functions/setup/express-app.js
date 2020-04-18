const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

function createExpressApp() {
    const app = express()
    app.use(bodyParser.json())
    app.use(cors())

    return app
}

module.exports = createExpressApp
