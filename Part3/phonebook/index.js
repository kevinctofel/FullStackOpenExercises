const express = require("express");
const app = express();
app.use(express.json()); // needed for parsing JSON

const generateId = () => {
  const max = 10000;
  const min = 1;
  return Math.floor(Math.random() * (max - min) + min);
};

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/people", (request, response) => {
  response.json(people);
});

app.get("/api/people/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = people.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end("That person was not found.");
  }
});

app.delete("/api/people/:id", (request, response) => {
  const id = Number(request.params.id);
  people = people.filter((person) => person.id !== id);

  response.status(204).end("That person was removed from the phone book.");
});

app.post("/api/people", (request, response) => {
  const body = request.body;
  console.log(request.body);

  if (!body.name) {
    return response.status(400).json({
      error: "Name is missing",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  people = people.concat(person);
  response.json(person);
  console.log(person);
});

app.get("/info", (request, response) => {
  let entries = people.length;
  let requestTime = new Date();
  response.send(
    `The phonebook has information for ${entries} people.<br/><br/>${requestTime}`
  );
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
