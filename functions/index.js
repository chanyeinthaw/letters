const admin = require('firebase-admin');

let serviceAccount = require('./credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

exports.letters = require('./letters')(admin.firestore())
