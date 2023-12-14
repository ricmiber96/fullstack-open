import axios from 'axios'
import { BASE_URL } from '../utils/constants'
// const baseUrl = 'http://localhost:3001/persons'
let baseUrl = BASE_URL 

const getAllContacts = () => { 
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addContact = (newContact) => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

const updateContact = (id, newContact) => {
    const request = axios.put(`${baseUrl}/${id}`, newContact)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}


export default { getAllContacts, addContact, updateContact, deleteContact }