import axios from "axios"

const signup = async (credentials) => {
    const baseUrl = import.meta.env.VITE_ENV === 'dev' ? 'http://localhost:3003/api/users' : '/api/users'
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { signup }