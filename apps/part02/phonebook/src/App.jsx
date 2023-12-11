import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const PhoneNumbers = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => <li key={person.id}>{person.name} | {person.number}</li>)}
    </ul>
  )
}


function App() {

  const [persons, setPersons] = useState([
    {  id: window.crypto.randomUUID(), name: 'Arto Hellas', number: '040-123456' },
    {  id: window.crypto.randomUUID(), name: 'Ada Lovelace', number: '39-44-5323523' },
    {  id: window.crypto.randomUUID(), name: 'Dan Abramov', number: '12-43-234345' },
    {  id: window.crypto.randomUUID(), name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newPerson, setNewPerson] = useState({
    id: window.crypto.randomUUID(),
    name: '',
    number: ''
  })

  const [search, setSearch] = useState('')
  

  const addPerson = (e) => {
    e.preventDefault()
    if(persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }
    setPersons([...persons, newPerson])
    setNewPerson({
      id: window.crypto.randomUUID(),
      name: '',
      number: ''
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
    console.log(search,persons)
  }

  useEffect(() => {
    search === '' ? setFilteredPersons(persons) : 
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())))
  }, [search])
  



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

  return (
    <div>
      <h2>Phonebook</h2>
      <label htmlFor="search">Search: </label>
      <input name='search' placeholder='Search' value={search} onChange={handleSearch} />
      <br/>
      <h3>Add New Contact </h3>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name">Name: </label>
          <input value={newPerson.name} name='name' onChange={handleOnChange}/>
          </div>
          <div>
          <label htmlFor="number">Number: </label>
          <input name='number' placeholder='000-000-000' onChange={handleOnChange} value={newPerson.number}/>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneNumbers persons={filteredPersons}/>
    </div>
  )
}

export default App
