const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports = function(app) {

  const whitelist = [
    {
      id: 123456,
      email: 'user@camba.coop',
      password: '$2b$08$ZRrJWppetUmKe5Zlc1Mtj.w51ZTmmx2M4YKUdS4QOBHXq2gzF/zyS', // bcrypt.hashSync('123456')
      permissions: ['guest']
    },
    {
      id: 234567,
      email: 'dev@camba.coop',
      password: '$2b$08$ZRrJWppetUmKe5Zlc1Mtj.w51ZTmmx2M4YKUdS4QOBHXq2gzF/zyS', // bcrypt.hashSync('123456')
      permissions: ['admin']
    }
  ]

  app.post('/auth/login', (req, res) => {
    // db.selectByEmail(req.body.email, (err, user) => {
    //     if (err) return res.status(500).send('Error on the server.');
    //     if (!user) return res.status(404).send('No user found.');
    //     let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
    //     if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    //     let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
    //     });
    //     res.status(200).send({ auth: true, token: token, user: user });
    // });

    const user = whitelist.find(user => user.email === req.headers.email);
    if (!user) return res.status(404).send('No user found.');
    const isPasswordValid = bcrypt.compareSync(req.headers.password, user.password);
    if (!isPasswordValid) return res.status(401).send({ auth: false, token: null });
    const token = jwt.sign({ id: user.id }, 'mySecret', { expiresIn: 86400 });
    res.status(200).send({ auth: true, token, user })
  })
}
