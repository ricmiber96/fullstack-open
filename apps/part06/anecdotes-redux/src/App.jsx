import { useEffect, useState } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import Filters from './components/Filters'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

function App() {
  const [count, setCount] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
  console.log('Hello world')
  console.info('Esto es un mensaje de info')
  anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }
  , [dispatch])

  return (
    <div>
    <Filters />
    <Notification />
    <AnecdoteList />
    <AnecdoteForm />
  </div>
  )
}

export default App
