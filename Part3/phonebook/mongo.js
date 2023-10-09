const mongoose = require("mongoose");
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://kevinctofel:${password}@fsopen.hynn5hn.mongodb.net/?retryWrites=true&w=majority
  `;
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose.set("strictQuery", false);
mongoose.connect(url);

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    // Display all of the phone book entries
    console.log("Phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length > 3) {
  const person = new Person({
    // write a new person object to the database
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(
      `Added ${person.name} with number ${person.number} to the phonebook database.`
    );
    mongoose.connection.close();
  });
}
