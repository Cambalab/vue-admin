const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = 'mySecret'

module.exports = function(app) {
  let whitelist = [
    {
      id: 123456,
      email: 'user@camba.coop',
      password: '$2b$08$ZRrJWppetUmKe5Zlc1Mtj.w51ZTmmx2M4YKUdS4QOBHXq2gzF/zyS', // bcrypt.hashSync('123456')
      permissions: ['guest'],
      token: '',
    },
    {
      id: 234567,
      email: 'dev@camba.coop',
      password: '$2b$08$ZRrJWppetUmKe5Zlc1Mtj.w51ZTmmx2M4YKUdS4QOBHXq2gzF/zyS', // bcrypt.hashSync('123456')
      permissions: ['admin'],
      token: '',
    },
  ]

  app.post('/api/auth', (req, res) => {
    const user = whitelist.find(user => user.email === req.headers.username)
    if (!user) return res.status(401).send('Invalid user or password')
    const isPasswordValid = bcrypt.compareSync(
      req.headers.password,
      user.password
    )
    if (!isPasswordValid)
      return res.status(401).send('Invalid user or password')
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 3600 })
    // Saves the token in the whitelist user array
    whitelist = whitelist.map(_user => {
      if (_user.id === user.id) {
        _user.token = token
        return _user
      }
      return _user
    })
    const newUser = Object.assign({}, user)
    delete newUser.password
    delete newUser.token
    return res.status(200).send({ auth: true, token, user: newUser })
  })

  app.get('/api/auth', (req, res) => {
    const token = req.headers.token
    if (!token) return res.status(401).send('Invalid token')
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) return res.status(401).send('Token is invalid or has expired')
      const user = {}
      Object.assign(user, whitelist.find(user => user.id === decodedToken.id))
      delete user.token
      delete user.password
      return res.status(200).send({ user })
    })
  })
}
