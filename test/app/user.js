const jwt = require('jsonwebtoken') // used t

function getToken (app, userName) {
  var token = jwt.sign(userName, app.get('superSecret'))
  return token
}

module.exports = {
  getToken
}
