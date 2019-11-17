const { generateModel } = require('fake-data-generator')

module.exports = function(app) {
  const model = {
    config: {
      locale: 'en',
    },
    model: {
      type: 'Object',
      value: {
        id: {
          type: 'randomNumberBetween',
          value: [1, 2500000],
        },
        name: {
          type: 'faker',
          value: 'name.firstName',
        },
        lastname: {
          type: 'faker',
          value: 'name.lastName',
        },
        birthdate: {
          type: 'faker',
          value: 'date.between',
          options: ['1970-01-01', '1996-12-31'],
        },
      },
    },
  }

  const authors = generateModel({
    amountArg: 40,
    modelArg: model,
    inputType: 'object',
    outputType: 'object',
  })

  app.get("/api/authors", (req, res) => {
    res.json(authors);
  });

  app.get("/api/authors/:id", (req, res) => {
    const author = authors.find(a => a.id.toString() === req.params.id);
    const index = authors.indexOf(author);

    res.json(authors[index]);
  });

  app.patch("/api/authors/:id", (req, res) => {
    const { body } = req;
    const author = authors.find(a => a.id.toString() === req.params.id);
    const index = authors.indexOf(author);

    if (index >= 0) {
      author.name = body.name;
      author.lastname = body.lastname;
      author.birthdate = body.birthdate;
      authors[index] = author;
    }

    res.json(author);
  });

  app.put("/api/authors/:id", (req, res) => {
    const { body } = req;
    const author = authors.find(a => a.id.toString() === req.params.id);
    const index = authors.indexOf(author);

    if (index >= 0) {
      author.name = body.name;
      author.lastname = body.lastname;
      author.birthdate = body.birthdate;
      authors[index] = author;
    }

    res.json(author);
  });

  app.delete("/api/authors/:id", (req, res) => {
    const author = authors.find(a => a.id.toString() === req.params.id);
    const index = authors.indexOf(author);

    if (index >= 0) authors.splice(index, 1);

    res.status(202).send();
  });

  app.post("/api/authors", (req, res) => {
    let id
    if (!authors.length) {
      id = 0
    } else {
      id = authors[authors.length - 1].id + 1;
    }
    const { body } = req;

    const author = {
      id,
      name: body.name,
      lastname: body.lastname,
      birthdate: body.birthdate
    };

    authors.push(author);

    res.status(201).send(author);
  });
}
