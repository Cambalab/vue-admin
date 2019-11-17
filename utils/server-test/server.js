/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const bodyParser = require('body-parser')

const createMagazinesService = require('./services/magazines')
const createArticlesService = require('./services/articles')
const createAuthorsService = require('./services/authors')
const createAuthService = require('./services/auth')

/* eslint-enable */

var cors = require('cors')
const app = express()

app.use(cors())
app.options('*', cors())

app.use(express.static(__dirname))

app.use(bodyParser.json())

createArticlesService(app)
createMagazinesService(app)
createAuthService(app)
createAuthorsService(app)

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
  /* eslint-enable no-console */
})
