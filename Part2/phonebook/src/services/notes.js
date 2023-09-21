import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getPeople = () => {
  return axios.get(baseUrl);
};
const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deletePerson = (id) => {
  console.log(`NotesServices got `, id);
  return console.log(`I want to delete the note with an ID of ${id}`);
};

const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default { getPeople, createPerson, deletePerson, updatePerson };
