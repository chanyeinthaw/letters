const {Firestore} = require('@google-cloud/firestore');
const store = new Firestore()

exports.letters = require('./letters')(store)
