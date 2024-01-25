import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote, toggleImportanceOf, toogleImportance, voteAnecdote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer'
import AnecdoteItem from './AnecdoteItem'

export default function AnecdoteList () {
  // const anecdotes = useSelector(({filters, anecdotes}) => {
  //     console.log('Filters',filters)
  //     if (filters.typeByFilter === 'all') {
  //       return anecdotes.anecdotes
  //     } else if (filters.typeByFilter === 'important') {
  //       return anecdotes.anecdotes.filter(anecdote => anecdote.important)
  //     } else if (filters.typeByFilter === 'non-important') {
  //       return anecdotes.anecdotes.filter(anecdote => !anecdote.important)
  //     }
  //     // filters.typeByFilter === 'important' ? anecdotes.anecdotes.filter(anecdote => anecdote.important) : anecdotes.anecdotes.filter(anecdote => !anecdote.important)
  //     else if(filters.searchByFilter !== '') {
  //       console.log('Search')
  //       return anecdotes.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filters.search.toLowerCase()))
  //     }

  // })

  // const anecdotes = useSelector((state) => state.anecdotes)
  // const filteredAnecdotes = anecdotes.filter((anecdote) => {
  //   return(
  //     (state.filter.typeByFilter === 'all' || anecdote.type === state.filter.typeByFilter) &&
  //     anecdote.name.includes(state.filter.search)
  //   )})

  const filterByType = (anecdotes, typeByFilter) => {
    if (typeByFilter === 'all') {
      return anecdotes
    } else if (typeByFilter === 'important') {
      return anecdotes.filter(anecdote => anecdote.important)
    } else if (typeByFilter === 'non-important') {
      return anecdotes.filter(anecdote => !anecdote.important)
    }
  }

  const searchByContent = (anecdotes, searchByFilter) => {
    if (searchByFilter !== '') {
      console.log('Search')
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(searchByFilter.toLowerCase()))
    }
    return anecdotes
  }

  const { typeByFilter, search } = useSelector((state) => state.filters)
  const { anecdotes } = useSelector((state) => state.anecdotes)

  console.log('Anecdotes', anecdotes)
  console.log('Type', typeByFilter)
  console.log('Search', search)

  const filteredAnecdotes = searchByContent(filterByType(anecdotes, typeByFilter), search)
  console.log('Filtered', filteredAnecdotes)
  // const anecdotesArray = [...filteredAnecdotes]
  // const anecdotesSorted = anecdotesArray.sort((a,b)=>b.votes-a.votes)

  const dispatch = useDispatch()

  const handleVote = (id) => {
    console.log('vote', id)
    dispatch(setTimedNotification(`You voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`, 5))
    dispatch(voteAnecdote(id))
  }
  const handleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
   <div>
    <h2>Anecdotes</h2>
    {
       anecdotes &&
        filteredAnecdotes.map(anecdote =>
        // <div key={anecdote.id}>
        // <div onClick={()=>{handleImportance(anecdote.id)}}>
        //     {anecdote.content}

            // <strong style={{color:'red'}} >{anecdote.important ? 'important' : 'non-important'}</strong>
            // </div>
            // <div>
            //     has {anecdote.votes}
            //     <button onClick={() => handleVote(anecdote.id)}>vote</button>
            // </div>
            // </div>
            <AnecdoteItem key={anecdote.id} anecdote={anecdote} />
        )}
   </div>
  )
}
