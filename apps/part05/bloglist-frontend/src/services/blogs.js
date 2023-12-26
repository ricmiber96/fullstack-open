import axios from 'axios'

const getAll = () => {
  const baseUrl = import.meta.env.VITE_ENV === 'dev' ? 'http://localhost:3003/api/blogs' : '/api/blogs'
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blog, token) => {
  const baseUrl = import.meta.env.VITE_ENV === 'dev' ? 'http://localhost:3003/api/blogs' : '/api/blogs'
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

export default { getAll, addBlog }
