import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filters from './components/Filters'
import Notification from './components/Notification'

const App = () => {

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