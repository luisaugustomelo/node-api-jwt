const jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
const express = require('express')
const apiRoutes = express.Router()

function init (app, User) {
  apiRoutes.post('/authenticate', function (req, res) {
    User.findOne({
    // find the user
      name: req.body.name
    }, function (err, user) {
      if (err) {
        throw err
      }

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' })
      } else if (user) {
      // check if password matches
        if (user.password !== req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' })
        } else {
        // if user is found and password is right create a token
          var token = jwt.sign(user, app.get('superSecret'))

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          })
        }
      }
    })
  })

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
  apiRoutes.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
    var token = req.body.token || req.query['token'] || req.headers['x-access-token']

  // decode token
    if (token) {
    // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function (err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' })
        } else {
        // if everything is good, save to request for use in other routes
          req.decoded = decoded
          next()
        }
      })
    } else {
    // if there is no token
    // return an error
      return res.status(403).send({success: false, message: 'No token provided.:)'})
    }
  })

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
// Send a GET to ex: localhost:8080/api/check?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNTk5YmM5M2U3OWQyNDAzNmZiODkzZThiIiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX192IjoiaW5pdCIsImFkbWluIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsIm5hbWUiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsIm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiJwYXNzd29yZCIsIm5hbWUiOiJOaWNrIE1vbmdvb3NlIiwiX2lkIjoiNTk5YmM5M2U3OWQyNDAzNmZiODkzZThiIn0sIiRpbml0Ijp0cnVlLCJpYXQiOjE1MDMzODM5MzN9.BEFNKwRyC1zYVjeIfsXHEnRsBQjMSnqnqDKEryM1tuE
// or localhost:8080/api?token=... or localhost:8080/check?token=...
  apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' })
  })

  apiRoutes.get('/users', function (req, res) {
    User.find({}, function (err, users) {
      if (!err) { res.json(users) } else { res.json(err) }
    })
  })

  apiRoutes.get('/check', function (req, res) {
    res.json(req.decoded)
  })

  app.use('/api', apiRoutes)
}
// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
// POST -> Body -> x-www-form-unlencoded

module.exports = {
  init
}
