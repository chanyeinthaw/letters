const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const verifyPassword = require('./verify-password')

function createExpressApp() {
    const app = express()
    app.use(bodyParser.json())
    app.use(cors())

    app.use((req, res, next) => {
        if (!verifyPassword(req.headers['authorization'] || null))
            res.status(401).send([])
        else next()
    })

    return app
}

module.exports = createExpressApp
