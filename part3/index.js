require("dotenv").config();
const Person = require("./models/person");
const express = require("express");
const morgan = require("morgan");
const app = express();
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.use(express.static("dist"));
app.use(express.json());
// Создаём токен для body
morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});
app.post("/api/persons", (req, res, next) => {
  let body = req.body;
  if (!body?.name || !body?.number) {
    res.status(400);
    res.json({ error: "Required two fields number and name" });
  }

  if (body?.number && body?.name) {
    // if (persons.find((person) => person.name == body?.name)) {
    //   res.status(400);
    //   res.json({ error: "name must be unique" });
    // } else {
    //   let person = { ...body, id: String(Math.random()) };
    //   persons.push(person);
    //   res.json(person);
    // }
    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person
      .save()
      .then((savedPerson) => {
        res.json(savedPerson);
      })
      .catch((error) => {
        next(error);
      });
  }
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});
app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(`Phonebook has info for ${persons.length} people`);
    res.write("<br/>");
    let date = new Date();
    res.write(String(date));
    res.end();
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }
      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});
const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);
// Это настройка для деплоя на render.com
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is runnin on ${PORT}`);
});
