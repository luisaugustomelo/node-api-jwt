require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const faker = require('faker')
mongoose.Promise = require('bluebird')
const User = require('./app/models/user') // get our mongoose model
const userController = require('./app/controllers/userController')

const app = express()

// =================================================================
// configuration ===================================================
// =================================================================
const port = process.env.PORT || process.env.PORT // used to create, sign, and verify tokens

// sudo service mongod start
mongoose.connection.openUri(process.env.DB_HOST)

app.set('superSecret', process.env.JWT_SECRET) // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use morgan to log requests to the console
app.use(morgan('dev'))

// =================================================================
// main routes =====================================================
// =================================================================

app.get('/setup', function (req, res) { // Criar um modelo específico para este método
  var userName = faker.name.findName()
  var userPass = faker.internet.password()
  var userEmail = faker.internet.email()
  // create a sample user
  var _user = new User({
    name: userName,
    password: userPass,
    email: userEmail,
    admin: true
  })
  _user.save(function (err) {
    if (err) throw err

    console.log('User saved successfully')
    console.log(userController.getToken(app, userName))
    res.json({name: userName, password: userPass, email: userEmail, success: true})
  })
})

// basic route (http://localhost:8080)
app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api')
})

// =================================================================
// user routes =====================================================
// =================================================================

userController.init(app, User)

// =================================================================
// start the server ================================================
// =================================================================
app.listen(process.env.PORT)
console.log('Magic happens at http://localhost:' + process.env.PORT)

module.exports = app
