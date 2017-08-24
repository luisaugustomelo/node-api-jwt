const faker = require('faker')

module.exports.guest = () => ({
  name: faker.name.findName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  role: 'user'
})

module.exports.user = () => ({
  name: 'Nick Mongoose',
  password: 'password',
  email: faker.internet.email(),
  role: 'user'
})

module.exports.admin = () => ({
  name: faker.name.findName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  role: 'ADMIN'
})
