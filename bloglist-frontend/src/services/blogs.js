import axios from 'axios'
const baseUrl = '/api/blogs'
let token
const setToken = (newToken) => {
  token = newToken
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
const remove = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  )
  return response.data
}
export default { getAll, create, setToken, update, remove }
