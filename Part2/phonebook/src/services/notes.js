import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getPeople = () => {
  return axios.get(baseUrl);
};
const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deletePerson = (entry) => {
  // console.log(`NotesServices got `, entry);
  confirm(`Do you want to delete the entry for ${entry.name}?`)
    ? axios.delete(`${baseUrl}/${entry.id}`)
    : console.log("We won't delete the entry.");
};

const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default { getPeople, createPerson, deletePerson, updatePerson };
