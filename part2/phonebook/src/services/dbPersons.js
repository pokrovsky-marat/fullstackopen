import axios from "axios";

// dev version
// const baseUrl = "http://localhost:3001/api/persons";
// deployed version
const baseUrl = "https://fso-nodejs-server-homework.onrender.com/api/persons";
const getAll = () => axios.get(baseUrl).then((response) => response.data);
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`).then(() => id);
const updatePerson = ({ name, number, id }) =>
  axios
    .put(`${baseUrl}/${id}`, { name, number })
    .then((response) => response.data);
//Returnы можно убрать и сделать как сверху,
const createPerson = (person) => {
  return axios.post(baseUrl, person).then((response) => {
    return response.data;
  });
};

export default { getAll, createPerson, deletePerson, updatePerson };
