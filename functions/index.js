const admin = require('firebase-admin');
const express = require('express')
const bodyParser = require('body-parser')
const functions = require('firebase-functions')
const cors = require('cors')

let serviceAccount = require('./credentials.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const firestore = admin.firestore()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', require('./letters')(firestore))
app.post('/', require('./new-letter')(firestore))

exports.letters = functions.https.onRequest(app)
