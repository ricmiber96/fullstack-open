import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filters from './components/Filters'
import Notification from './components/Notification'
import { initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  console.log('App')

  useEffect(() => {
    console.log('App useEffect')
     dispatch(initializeAnecdotes())
  },[dispatch])

  useEffect(() => {
    console.log(dispatch)
  }, [dispatch])
  

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