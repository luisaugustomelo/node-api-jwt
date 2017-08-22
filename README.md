# Node Token Authentication

This repo uses JSON Web Tokens and the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package to implement token based authentication on a simple Node.js API.

This is a starting point to demonstrate the method of authentication by verifying a token using Express route middleware.

## Requirements

- node and npm


##Folder structure

Folders look like this:

```bash
.
├── /test/                       # unit tests
├── /app/                        # mvc files
│   ├── /model/                  # sql scripts and database connection
│   ├── /controllers/            # business logic
|   ├── /views/                  # application views
├── .env                         # put your keys and secrets here
└── server.js                    # start server
```

## Usage

1. Clone the repo: `git clone https://github.com/luisaugustomelo/node-api-with-token-authenticate`
2. Install dependencies: `npm install`
3. Change SECRET in `.env`
4. Add your own MongoDB database to `.env`
5. Start the server: `sudo npm run dev`
6. Create sample user by visiting: `http://localhost:8080/setup`
7. The test can runned with `npm test`

Once everything is set up, we can begin to use our app by creating and verifying tokens.

### Getting a Token

Send a `POST` request to `http://localhost:8080/api/authenticate` with test user parameters as `x-www-form-urlencoded`.

```
  {
    name: 'Nick Mongoose',
    password: 'password'
  }
```

### Verifying a Token and Listing Users

Send a `GET` request to `http://localhost:8080/api/users` with a header parameter of `x-access-token` and the token.

You can also send the token as a URL parameter: `http://localhost:8080/api/users?token=YOUR_TOKEN_HERE`

Or you can send the token as a POST parameter of `token`.
