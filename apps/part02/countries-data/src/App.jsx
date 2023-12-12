import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Countries from './components/Countries'

function App() {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleChanges = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let url = search ? `https://restcountries.com/v3.1/name/${search}` : 'https://restcountries.com/v3.1/all'
    axios.get(url)
      .then(response => {
        setCountries(response.data)
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Find Countries</label>
        <input type="text" placeholder='Search' onChange={handleChanges} />
      </form>
      {
        countries.length === 0 ? 'No data results' :
        countries.length > 10 ? <p>Too many matches, specify another filter</p> :
        <Countries countries={countries} />
      }
    </>
  )
}

export default App
