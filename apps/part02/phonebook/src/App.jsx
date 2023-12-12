import { useEffect, useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhoneNumbers from './components/PhoneNumbers'
import contactService from './services/contact'
import Notification from './components/Notification'

function App() {

  const [persons, setPersons] = useState([])
  const [visible, setVisible] = useState(false)
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')

  const [newPerson, setNewPerson] = useState({
    id: window.crypto.randomUUID(),
    name: '',
    number: ''
  })

  const getContacts = async () => {
    await contactService.getAllContacts()
      .then(res => setPersons(res) )
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getContacts()
  }, [])

  const [search, setSearch] = useState('')
  
  const filteredPersons = search ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  : persons;

  const addPerson = (e) => {
    e.preventDefault()
    if((persons.some(person => person.name === newPerson.name)) && window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name === newPerson.name)
        contactService.updateContact(person.id, newPerson)
          .then(res => {
            setPersons(persons.map(person => person.id !== res.id ? person : res))
            setMessage(`${newPerson.name} has been updated`)
          })
          .catch((err) => {
            setMessage(`${newPerson.name} has already been deleted from the server`)
            setIsError(true)
          })   
          setNewPerson({
            id: window.crypto.randomUUID(),
            name: '',
            number: ''
          })
      }
    else {
      contactService.addContact(newPerson)
      .then(res => {
        setPersons([...persons, res])
        setNewPerson({
          id: window.crypto.randomUUID(),
          name: '',
          number: ''
        })
      })
      .catch(err => console.log(err))
      setMessage(`${newPerson.name} has been added`)
      setIsError(false)
    }
      setVisible(true)
      setTimeout(() => {
          setVisible(false)
        }, 5000)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handleOnChange = (e) => {
    let {name, value} = e.target
    if(name ==='number'){
      value = value.replace(/\D/g, '');
      if (value.length > 0) {
        value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 9)}`;
      }
    }
    if (e.nativeEvent.inputType === 'deleteContentBackward') {
      value = value.slice(0, -1);
    }
   
    setNewPerson({...newPerson, [name]: value})

  }

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this contact?')){
    contactService.deleteContact(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(err => console.log(err))
    }
    setMessage(`${newPerson.name} has been deleted`)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      { 
      visible && 
          <Notification message={message} isError={isError} />
      }
      <Filter search={search} handleSearch={handleSearch}/>
      <br/>
      <PersonForm addPerson={addPerson} newPerson={newPerson} handleOnChange={handleOnChange}/>
      <h2>Numbers</h2>
      <PhoneNumbers persons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
