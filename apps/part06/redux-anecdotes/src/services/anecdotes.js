import axios from 'axios'

const baseURL = 'http://localhost:3002/anecdotes'

const getAll = async () => {
    console.log('Server',response.data)
    const response = await axios.get(baseURL)
    return response.data
}

export default { getAll }