require("dotenv").config();
const Person = require("./models/people");
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = process.env.MDB_URL;

mongoose.set("strictQuery", false);
mongoose.connect(url);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
}); // token to log request body

const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);
app.use(express.json()); // needed for parsing JSON
app.use(logger); // needed for logging server responses
app.use(express.static("dist"));

app.get("/api/people", (request, response) => {
  console.log("Getting people from mongo");
  Person.find({}).then((people) => {
    response.json(people);
  });
});

// No error handling but API works to display a single record
app.get("/api/people/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/people/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id).then((result) => {
    response.status(204).end();
  });
});

// Implement error handling for creating new entries.
app.post("/api/people", (request, response, next) => {
  const body = request.body;
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  // Only save entry to database if there's a name and number
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.get("/info", async (request, response) => {
  let entries = await Person.find().estimatedDocumentCount();
  let requestTime = new Date();
  response.send(
    `The phone book has information for ${entries} people.<br/><br/>${requestTime}`
  );
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests outside of expected parameters
app.use(errorHandler);
// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
