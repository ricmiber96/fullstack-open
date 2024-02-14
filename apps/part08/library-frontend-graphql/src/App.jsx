import { useState } from 'react'
import './App.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

function App() {
  const [page, setPage] = useState('authors')
  const token = localStorage.getItem('library-user-token')
  console.log('token', token)
  const logout = () => {  
    localStorage.clear()
    window.location.reload()
  }
  return (
    <>
     <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          !token ? (
            <button onClick={() => setPage('login')}>login</button>
          ) : (
            <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => logout()}>logout</button>
            </>
          )
        }
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm  show={page === 'login'} />
  
      
    </div>
    </>
  )
}

export default App
