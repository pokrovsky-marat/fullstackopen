import axios from "axios";

const baseUrl = "http://localhost:3001/persons";
const getAll = () => axios.get(baseUrl).then((response) => response.data);
//Returnы можно убрать и сделать как сверху,
const createPerson = (person) => {
  return axios.post(baseUrl, person).then((response) => {
    return response.data;
  });
};

export default { getAll, createPerson };
