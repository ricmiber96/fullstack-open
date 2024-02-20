import { useState } from 'react'
import './App.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, USER } from '../queries'
import Recommend from './components/Recommend'


function App() {
  const [page, setPage] = useState('authors')
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const user = useQuery(USER)
  const token = localStorage.getItem('library-user-token')
  console.log('token', token)
  const client = useApolloClient()

  const logout = () => {  
    localStorage.removeItem('library-user-token')
    client.resetStore()
    window.location.reload()
  }

  if(authors.loading || books.loading){
    return <div>loading...</div>
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
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
            </>
          )
        }
      </div>

      <LoginForm show={page === 'login'} />
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} books={books.data.allBooks} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} user={user.data} books={books.data.allBooks} />
            
    </div>
    </>
  )
}

export default App
