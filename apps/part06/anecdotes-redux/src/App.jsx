import { useEffect, useState } from 'react'
import { initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import Filters from './components/Filters'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
  console.log('Hello world')
  console.info('Esto es un mensaje de info')
  // anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  dispatch(initializeAnecdotes())
  }
  , [dispatch])

  return (
    <div>
    <Filters />
    <Notification />
    <AnecdoteForm />
    <AnecdoteList />
  </div>
  )
}

export default App
