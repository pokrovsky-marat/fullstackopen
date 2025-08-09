const express = require("express");
const app = express();
const persons = [
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

app.get("/api/persons", (req, res) => {
  res.json(persons);
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
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is runnin on ${PORT}`);
});
