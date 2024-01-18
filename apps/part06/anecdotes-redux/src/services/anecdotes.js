import axios from 'axios'

const baseURL = 'http://localhost:3002/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  console.log('Server', response.data)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0, important: false }
  const response = await axios.post(baseURL, object)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseURL}/${id}`, newObject)
  return response.data
}

export default { getAll, createNew, getOne, update }
