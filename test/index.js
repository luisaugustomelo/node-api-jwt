const app = require('../')
const test = require('ava')
const axios = require('axios')
const User   = require('./app/models/user') // get our mongoose model
const faker = require('faker')

test.before(async t => {
  app.listen()

	userName = faker.name.findName()
	userPass = faker.internet.password()

	var _user = new User({
		name: userName,
		password: userPass,
		admin: true
	});
	_user.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});


  /* realizar um request para retornar o token
  axios.defaults.baseURL = 'http://localhost:8080/'
  axios.defaults.headers.common['x-app-token'] = token
  axios.defaults.validateStatus = (status) => (status >= 200 && status < 500)*/
})