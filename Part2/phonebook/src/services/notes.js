import axios from "axios";
const baseUrl = "/api/people";

const getPeople = () => {
  return axios.get(baseUrl);
};
const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deletePerson = (entry) => {
  axios.delete(`${baseUrl}/${entry.id}`);
  return axios.get(baseUrl);
};

const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default { getPeople, createPerson, deletePerson, updatePerson };
