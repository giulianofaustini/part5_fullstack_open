import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'



const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const deleteBlog = async (blogId) => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const update = (id, newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newBlog, config)
  return request.then((response) => response.data)
}
let token = null

export default { setToken, getAll, create, deleteBlog, update }
