require("dotenv").config();
const Person = require("./models/people");
const express = require("express");
const app = express();
const morgan = require("morgan");
// Adding mongoDB
const mongoose = require("mongoose");
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = process.env.MDB_URL;

mongoose.set("strictQuery", false);
mongoose.connect(url);

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// personSchema.set("toJSON", {
//   // remove unneeded db fields
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//     delete returnedObject.id;
//   },
// });

// const Person = mongoose.model("Person", personSchema);
// End of mongoDB configuration

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
}); // token to log request body

const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);
app.use(express.json()); // needed for parsing JSON
app.use(logger); // needed for logging server responses
app.use(express.static("dist"));

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

app.get("/api/people", (request, response) => {
  console.log("Getting people from mongo");
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/people/:id", (request, response) => {
  try {
    Person.findById(request.params.id).then((person) => {
      response.json(person);
    });
  } catch {
    response.status(404).end("That person was not found.");
  }
});

app.delete("/api/people/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id).then((result) => {
    response.status(204).end();
  });
});

// Implement error handling for creating new entries.
app.post("/api/people", (request, response) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/info", async (request, response) => {
  let entries = await Person.find().estimatedDocumentCount();
  console.log(entries);
  let requestTime = new Date();
  response.send(
    `The phone book has information for ${entries} people.<br/><br/>${requestTime}`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
