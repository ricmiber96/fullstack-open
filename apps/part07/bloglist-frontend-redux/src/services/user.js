import axios from 'axios'

const BASE_URL_DEV = 'http://localhost:3003'
const BASE_URL_PROD = 'https://bloglist-backend-heroku.herokuapp.com'
const endpoint = '/api/users'

const getBaseUrl = () => {
  return process.env.VITE_ENV === 'dev' ? BASE_URL_DEV : BASE_URL_PROD
}

const getAllUsers = async () => {
  const baseUrl = `${getBaseUrl()}${endpoint}`
  const response = await axios.get(baseUrl)
  return response.data
}

const getUser = async (id) => {
  const baseUrl = `${getBaseUrl()}${endpoint}`
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAllUsers, getUser }
