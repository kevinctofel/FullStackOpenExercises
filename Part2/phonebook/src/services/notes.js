import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getNotes = () => {
  return axios.get(baseUrl);
};
const createNote = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const updateNote = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default { getNotes, createNote, updateNote };
