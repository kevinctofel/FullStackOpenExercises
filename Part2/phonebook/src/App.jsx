/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import axios from "axios";

import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setSearch] = useState("");

  useEffect(() => {
    // hook to get data from json file and render it
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const addNameAndNumber = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      phone: newNumber,
    };
    let names = persons.map((obj) => obj.name);
    const hasDuplicateNames = names.includes(newName);

    if (hasDuplicateNames) {
      alert(`${newName} is already added to Phonebook`);
      // console.log("Duplicate name!");
      setNewName("");
      setNewNumber("");
    } else {
      // update the server with new person object
      axios
        .post("http://localhost:3001/persons", personObject)
        .then((response) => setPersons(persons.concat(response.data)));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <h3>
          Filter by name: <input onChange={handleSearch} />
        </h3>
      </div>
      <div>
        <h2>Add new entry: </h2>
        <form onSubmit={addNameAndNumber}>
          <div>
            Name: <input onChange={handleNameChange} value={newName} />
            <div>
              Number: <input onChange={handleNumberChange} value={newNumber} />
            </div>
          </div>
          <div>
            <button type="submit">Add entry</button>
          </div>
        </form>
      </div>
      <h2>Numbers</h2>

      <Search props={[persons, newSearch]} />
    </div>
  );
};

export default App;
