const app = require('../')
const test = require('ava')
const http = require('ava-http')
const axios = require('axios')
const User = require('../app/models/user') // get our mongoose model
const userController = require('../app/controllers/userController')
const faker = require('faker')

test.before(t => {
  app.listen()
})

test('create user and validate token', async t => {
  var userName = faker.name.findName()
  var userPass = faker.internet.password()
  var userEmail = faker.internet.email()

  var _user = new User({
    name: userName,
    password: userPass,
    email: userEmail,
    admin: true
  })

  _user.save(function (err) {
    if (err) throw err
  })

  var token = userController.getToken(app, userName)

  var instance = await axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {'x-access-token': token}
  })

  t.true(instance.defaults.validateStatus(200))
  t.false(instance.defaults.validateStatus(403))
})

test('reject request without token', async t => {
  var body = {'name': faker.name.findName(), 'password': faker.internet.password()}
  var res = await http.postResponse('http://localhost:8080/api/authenticate', {body})
    .then(function (response) {
      t.is(response.body.success, false)
    })
    .catch(function () {
      console.log(res)
    })
})


test('accept request with token', async t => {
  body = {'name': 'Nick Mongoose', 'password': 'password'}
  res = await http.postResponse('http://localhost:8080/api/authenticate', {body})
    .then(function (response) {
      t.is(response.body.success, true)
    })
    .catch(function () {
      console.log(res)
    })
})
