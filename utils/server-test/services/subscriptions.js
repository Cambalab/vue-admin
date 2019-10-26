const moment = require('moment')

module.exports = function(app) {
  const subscriptions = [
    {
      id: 1,
      month: 'January',
      shortMonth: 'Ja',
      subscriptions: 913,
      updatedAt: '2019-10-25T23:43:03.729Z',
    },
    {
      id: 2,
      month: 'February',
      shortMonth: 'Fe',
      subscriptions: 1020,
      updatedAt: '2019-10-25T23:18:07.702Z',
    },
    {
      id: 3,
      month: 'March',
      shortMonth: 'Ma',
      subscriptions: 980,
      updatedAt: '2019-10-25T15:47:53.627Z',
    },
    {
      id: 4,
      month: 'April',
      shortMonth: 'Ap',
      subscriptions: 853,
      updatedAt: '2019-10-25T22:55:19.225Z',
    },
    {
      id: 5,
      month: 'May',
      shortMonth: 'Ma',
      subscriptions: 795,
      updatedAt: '2019-10-26T13:14:53.367Z',
    },
    {
      id: 6,
      month: 'June',
      shortMonth: 'Ju',
      subscriptions: 750,
      updatedAt: '2019-10-26T08:50:04.573Z',
    },
    {
      id: 7,
      month: 'July',
      shortMonth: 'Ju',
      subscriptions: 613,
      updatedAt: '2019-10-25T19:55:46.293Z',
    },
    {
      id: 8,
      month: 'August',
      shortMonth: 'Au',
      subscriptions: 740,
      updatedAt: '2019-10-25T20:08:57.991Z',
    },
    {
      id: 9,
      month: 'September',
      shortMonth: 'Se',
      subscriptions: 780,
      updatedAt: '2019-10-26T06:47:55.558Z',
    },
    {
      id: 10,
      month: 'October',
      shortMonth: 'Oc',
      subscriptions: 890,
      updatedAt: '2019-10-26T13:07:44.519Z',
    },
    {
      id: 11,
      month: 'November',
      shortMonth: 'No',
      subscriptions: 420,
      updatedAt: '2019-10-26T07:30:39.037Z',
    },
    {
      id: 12,
      month: 'December',
      shortMonth: 'De',
      subscriptions: 627,
      updatedAt: '2019-10-26T02:54:10.989Z',
    },
  ]

  app.get('/api/subscriptions', (req, res) => {
    const sortedSubscriptions = subscriptions.sort((a, b) =>
      moment(a.updatedAt).isAfter(moment(b.updatedAt))
    )
    const { updatedAt } = sortedSubscriptions[sortedSubscriptions.length - 1]
    const response = {
      updatedAt,
      subscriptions,
    }
    res.json(response)
  })

  app.get('/api/subscriptions/:id', (req, res) => {
    const subscription = subscriptions.find(
      a => a.id.toString() === req.params.id
    )
    const index = subscriptions.indexOf(subscription)

    res.json(subscriptions[index])
  })

  app.patch('/api/subscriptions/:id', (req, res) => {
    const { body } = req
    const subscription = subscriptions.find(
      a => a.id.toString() === req.params.id
    )
    const index = subscriptions.indexOf(subscription)

    if (index >= 0) {
      subscription.name = body.name
      subscription.editorial = body.editorial
      subscription.issue = body.issue
      subscription.publisher = body.publisher
      subscriptions[index] = subscription
    }

    res.json(subscription)
  })

  app.put('/api/subscriptions/:id', (req, res) => {
    const { body } = req
    const subscription = subscriptions.find(
      a => a.id.toString() === req.params.id
    )
    const index = subscriptions.indexOf(subscription)

    if (index >= 0) {
      subscription.name = body.name
      subscription.editorial = body.editorial
      subscription.issue = body.issue
      subscription.publisher = body.publisher
      subscriptions[index] = subscription
    }

    res.json(subscription)
  })

  app.delete('/api/subscriptions/:id', (req, res) => {
    const subscription = subscriptions.find(
      a => a.id.toString() === req.params.id
    )
    const index = subscriptions.indexOf(subscription)

    if (index >= 0) subscriptions.splice(index, 1)

    res.status(202).send()
  })

  app.post('/api/subscriptions', (req, res) => {
    const id = subscriptions[subscriptions.length - 1].id + 1
    const { body } = req

    const subscription = {
      id,
      name: body.name,
      editorial: body.editorial,
      issue: body.issue,
      publisher: body.publisher,
    }

    subscriptions.push(subscription)

    res.status(201).send(subscription)
  })
}
