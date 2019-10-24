module.exports = function(app) {
  const subscriptions = [
    {
      id: 1,
      month: 'January',
      subscriptions: 913,
    },
    {
      id: 2,
      month: 'February',
      subscriptions: 1020,
    },
    {
      id: 3,
      month: 'March',
      subscriptions: 980,
    },
    {
      id: 3,
      month: 'April',
      subscriptions: 853,
    },
    {
      id: 3,
      month: 'May',
      subscriptions: 795,
    },
    {
      id: 3,
      month: 'June',
      subscriptions: 750,
    },
    {
      id: 3,
      month: 'July',
      subscriptions: 613,
    },
    {
      id: 3,
      month: 'August',
      subscriptions: 740,
    },
    {
      id: 3,
      month: 'September',
      subscriptions: 780,
    },
    {
      id: 3,
      month: 'October',
      subscriptions: 890,
    },
    {
      id: 3,
      month: 'November',
      subscriptions: 420,
    },
    {
      id: 3,
      month: 'December',
      subscriptions: 627,
    },
  ]

  app.get('/api/subscriptions', (req, res) => {
    res.json(subscriptions)
  })

  app.get('/api/subscriptions/:id', (req, res) => {
    const magazine = subscriptions.find(a => a.id.toString() === req.params.id)
    const index = subscriptions.indexOf(magazine)

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
    const magazine = subscriptions.find(a => a.id.toString() === req.params.id)
    const index = subscriptions.indexOf(magazine)

    if (index >= 0) subscriptions.splice(index, 1)

    res.status(202).send()
  })

  app.post('/api/subscriptions', (req, res) => {
    const id = subscriptions[subscriptions.length - 1].id + 1
    const { body } = req

    const magazine = {
      id,
      name: body.name,
      editorial: body.editorial,
      issue: body.issue,
      publisher: body.publisher,
    }

    subscriptions.push(magazine)

    res.status(201).send(magazine)
  })
}
