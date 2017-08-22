// =================================================================
// get the packages we need ========================================
// =================================================================
require('dotenv').config()

const express	    = require('express');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const faker       = require('faker');

const User   = require('./app/models/user'); // get our mongoose model
const userController = require('./app/controllers/userController')


const app = express();
// =================================================================
// configuration ===================================================
// =================================================================
const port = process.env.PORT || process.env.PORT; // used to create, sign, and verify tokens

//sudo service mongod start
mongoose.connection.openUri(process.env.DB_HOST)

app.set('superSecret', process.env.JWT_SECRET); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =================================================================
// routes ==========================================================
// =================================================================
//Criar uma rota específica para este método
app.get('/setup', function(req, res) {

	// create a sample user
	var nick = new User({
		name: 'Nick Mongoose',
		password: 'password',
		admin: true
	});
	nick.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});

// basic route (http://localhost:8080)
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

userController.init(apiRoutes, app, User)

// =================================================================
// start the server ================================================
// =================================================================
app.listen(process.env.PORT);
console.log('Magic happens at http://localhost:' + process.env.PORT);
