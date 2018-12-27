const Ipsum = require("bavaria-ipsum");

module.exports = function (app) {

  const ipsum = new Ipsum();

  const magazines = [
    {
      id: 1,
      name: 'Console log Oriented Programming',
      articles: [1, 2, 3],
      issue: 20,
      publisher: ipsum.generateSentence(2),
    },
    {
      id: 2,
      name: ipsum.generateWord(),
      articles: [],
      issue: 13,
      publisher: ipsum.generateSentence(2)
    },
    {
      id: 3,
      name: ipsum.generateWord(),
      articles: [],
      issue: 7,
      publisher: ipsum.generateSentence(2),
    }
  ];

  app.get("/api/magazines", (req, res) => {
    res.json(magazines);
  });

  app.get("/api/magazines/:id", (req, res) => {
    const magazine = magazines.find(a => a.id.toString() === req.params.id);
    const index = magazines.indexOf(magazine);

    res.json(magazines[index]);
  });

  app.patch("/api/magazines/:id", (req, res) => {
    const { body } = req;
    const magazine = magazines.find(a => a.id.toString() === req.params.id);
    const index = magazines.indexOf(magazine);

    if (index >= 0) {
      magazine.name = body.name;
      magazine.editorial = body.editorial;
      magazine.issue = body.issue;
      magazine.publisher = body.publisher;
      magazines[index] = magazine;
    }

    res.json(magazine);
  });

  app.put("/api/magazines/:id", (req, res) => {
    const { body } = req;
    const magazine = magazines.find(a => a.id.toString() === req.params.id);
    const index = magazines.indexOf(magazine);

    if (index >= 0) {
      magazine.name = body.name;
      magazine.editorial = body.editorial;
      magazine.issue = body.issue;
      magazine.publisher = body.publisher;
      magazines[index] = magazine;
    }

    res.json(magazine);
  });

  app.delete("/api/magazines/:id", (req, res) => {
    const magazine = magazines.find(a => a.id.toString() === req.params.id);
    const index = magazines.indexOf(magazine);

    if (index >= 0) magazines.splice(index, 1);

    res.status(202).send();
  });

  app.post("/api/magazines", (req, res) => {
    const id = magazines[magazines.length - 1].id + 1;
    const { body } = req;

    const magazine = {
      id,
      name: body.name,
      editorial: body.editorial,
      issue: body.issue,
      publisher: body.publisher
    };

    magazines.push(magazine);

    res.status(201).send(magazine);
  });
}
