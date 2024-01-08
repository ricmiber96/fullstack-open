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

const updateBlog = async (blog, token) => {
  const baseUrl = import.meta.env.VITE_ENV === 'dev' ? `http://localhost:3003/api/blogs/${blog.id}` : `/api/blogs/${blog.id}`
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.put(baseUrl, blog, config)
  return response.data
}

const deleteBlog = async (blog, token) => {
  const baseUrl = import.meta.env.VITE_ENV === 'dev' ? `http://localhost:3003/api/blogs/${blog.id}` : `/api/blogs/${blog.id}`
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.delete(baseUrl, config)
  return response.data
}

export default { getAll, addBlog, updateBlog, deleteBlog }
