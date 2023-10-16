/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import NoteServices from "../src/services/notes";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="confirm">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setSearch] = useState("");
  const [confirmMessage, setConfirmMessage] = useState(null);

  useEffect(() => {
    // hook to get data from json file and render it
    NoteServices.getPeople().then((response) => setPersons(response.data));
  }, []);

  const addNameAndNumber = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    let names = persons.map((obj) => obj.name);
    const hasDuplicateNames = names.includes(newName);

    if (hasDuplicateNames) {
      alert(`${newName} is already added to Phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      NoteServices.createPerson(personObject)
        .then(
          NoteServices.getPeople().then((response) => setPersons(response.data))
        )
        .then(() => {
          setConfirmMessage(`${newName} successfully added to the server.`);
          setNewName("");
          setNewNumber("");
        })
        .then(
          setTimeout(() => {
            setConfirmMessage(null);
          }, 5000)
        )
        .catch((error) => {
          setConfirmMessage(error.response.data.error);
          setNewName("");
          setNewNumber("");
        });
      // update the server with new person object
      //   axios
      //     .post("https://solitary-mountain-5684.fly.dev/api/people", personObject)
      //     .then((response) => setPersons(persons.concat(response.data)))
      //     .then(() =>
      //       setConfirmMessage(`${newName} successfully added to the server.`)
      //     )
      //     .then(
      //       setTimeout(() => {
      //         setConfirmMessage(null);
      //       }, 5000)
      //     );
      // }
    }
  };

  const Search = (props) => {
    console.log("Search got : ", props);

    return (
      <div>
        {props.props[0]
          .filter((eachPerson) =>
            eachPerson.name.toLowerCase().includes(props.props[1].toLowerCase())
          )
          .map((person) => (
            <Output key={person.id} props={person} />
          ))}
      </div>
    );
  };

  const Output = (props) => {
    // console.log("Output got ", props);
    return (
      <Name
        id={props.props.id}
        name={props.props.name}
        phone={props.props.number}
      />
    );
  };

  const Name = (props) => {
    const deleteEntry = (event) => {
      event.preventDefault();
      console.log(`Name got`, props);
      if (
        confirm(`Do you want to delete the entry for ${props.name}?`) === true
      ) {
        NoteServices.deletePerson(props).then(
          NoteServices.getPeople().then((response) => {
            console.log(response.data);
            setPersons(response.data);
          })
        );
      }
    };
    return (
      <form onSubmit={deleteEntry}>
        <div>
          <button type="submit">Delete</button> {props.name} {props.phone}
        </div>
      </form>
    );
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
        <Notification message={confirmMessage} />
      </div>
      <div>
        <h3>
          Filter by name: <input onChange={handleSearch} />
        </h3>
      </div>
      <div>
        <h2>Add new entry:</h2>
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
