const app = require('../')
const test = require('ava')
const http = require('ava-http')
const axios = require('axios')
const User = require('../app/models/user') // get our mongoose model
const userController = require('./app/user')
const { user } = require('./utils/user')
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
    /* _user.rollback(0, function (err, hist) {
      if (err) throw (err)
    }) */
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
  t.is(res.body.success, false)
})

test('accept request with token', async t => {
  var body = {'name': user().name, 'password': user().password}
  var res = await http.postResponse('http://localhost:8080/api/authenticate', {body})
  t.is(res.body.success, true)
})
