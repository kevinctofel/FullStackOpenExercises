import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const updateNotes = () => {
  return axios.get(baseUrl);
};
