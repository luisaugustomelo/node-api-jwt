var mongoose = require('mongoose')
// var rollback = require('mongoose-rollback')

var Schema = mongoose.Schema

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({
  name: String,
  password: String,
  email: String,
  admin: Boolean
}))

/*
Documentação: https://www.npmjs.com/package/mongoose-rollback
User.plugin(rollback, {
    index: true, // index on _version field
    conn: 'mongodb://localhost:8080/setup', // required if connection isn't explict
    collectionName: 'model_collection' // your collection name or custom collection
}); */
