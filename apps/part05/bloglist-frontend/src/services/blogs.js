import axios from 'axios'

const BASE_URL_DEV = 'http://localhost:3003'
const BASE_URL_PROD = 'https://bloglist-backend-heroku.herokuapp.com'

const getBaseUrl = () => {
  return process.env.VITE_ENV === 'dev' ? BASE_URL_DEV : BASE_URL_PROD
}

const getAll = () => {
  const endpoint = '/api/blogs'
  const request = axios.get(`${getBaseUrl()}${endpoint}`)
  return request.then(response => response.data)
}

const addBlog = async (blog, token) => {
  const baseUrl = `${getBaseUrl()}/api/blogs`
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const baseUrl = `${getBaseUrl()}/api/blogs/${blog.id}`
  const response = await axios.put(baseUrl, blog)
  return response.data
}

const deleteBlog = async (blog, token) => {
  const baseUrl = `${getBaseUrl()}/api/blogs/${blog.id}`
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.delete(baseUrl, config)
  return response.data
}

export default { getAll, addBlog, updateBlog, deleteBlog }
