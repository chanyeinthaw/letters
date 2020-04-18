const functions = require('firebase-functions')

require('./setup/firebase')()

exports.letters = functions.https.onRequest(require('./letters')())
exports.colors = functions.https.onRequest(require('./colors')())
