const express = require('express')
const bodyParser = require('body-parser')
const { init } = require('./db')
const routes = require('./routes')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(routes)

const port = process.env.PORT || 3000

init().then(() => {
  console.log(`starting server on port ${port}`);
  app.listen(port);
})