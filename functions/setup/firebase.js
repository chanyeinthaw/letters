const container = require('./container')
const admin = require('firebase-admin');
const serviceAccount = require('../credentials.json');

function firebase() {
    admin.initializeApp({credential: admin.credential.cert(serviceAccount)})

    const firestore = admin.firestore()

    container.set('store', firestore)
    container.set('admin', admin)
}

module.exports = firebase
