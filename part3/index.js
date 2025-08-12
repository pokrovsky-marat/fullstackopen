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
  res.json(persons);
});
app.post("/api/persons", (req, res) => {
  let body = req.body;
  if (!body?.name || !body?.number) {
    res.status(400);
    res.json({ error: "Required two fields number and name" });
  }

  if (body?.number && body?.name) {
    if (persons.find((person) => person.name == body?.name)) {
      res.status(400);
      res.json({ error: "name must be unique" });
    } else {
      let person = { ...body, id: String(Math.random()) };
      persons.push(person);
      res.json(person);
    }
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});
app.get("/api/persons/:id", (req, res) => {
  let id = req.params.id;
  let person = persons.find((person) => person.id == id);
  if (!person) {
    res.status(404);
    res.end();
  } else {
    res.json(person);
  }
});
app.get("/info", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(`Phonebook has info for ${persons.length} people`);
  res.write("<br/>");
  let date = new Date();
  res.write(String(date));
  res.end();
});
// Это настройка для деплоя на render.com
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is runnin on ${PORT}`);
});
