import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filters from './components/Filters'

const App = () => {

  return (
    <div>
      <Filters />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App