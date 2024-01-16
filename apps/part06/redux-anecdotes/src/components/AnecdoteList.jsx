import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote, toogleImportance } from '../reducers/anecdoteReducer';

export default function AnecdoteList() {
    const anecdotes = useSelector(({filters, anecdotes}) => {
        console.log('Filters',filters) 
        if (filters.typeByFilter === 'all') {
          return anecdotes.anecdotes
        } else if (filters.typeByFilter === 'important') {
          return anecdotes.anecdotes.filter(anecdote => anecdote.important)
        } else if (filters.typeByFilter === 'non-important') {
          return anecdotes.anecdotes.filter(anecdote => !anecdote.important)
        }
        // filters.typeByFilter === 'important' ? anecdotes.anecdotes.filter(anecdote => anecdote.important) : anecdotes.anecdotes.filter(anecdote => !anecdote.important)
        else if(filters.searchByFilter !== '') {
          console.log('Search')
          return anecdotes.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filters.search.toLowerCase()))
        }
        
    })

    const anecdotes = useSelector((state) => state.anecdotes)
    const filteredAnecdotes = anecdotes.filter((anecdote) => {
      return(
        (state.filter.typeByFilter === 'all' || anecdote.type === state.filter.typeByFilter) &&
        anecdote.name.includes(state.filter.search)
      )})

    const dispatch = useDispatch()
    const handleVote = (id) => {
        dispatch(addVote(id))
    }
    const handleImportance = (id) => {
        dispatch(toogleImportance(id))
    }

    console.log(anecdotes)
  return (
   <div>
    <h2>Anecdotes</h2>
    {anecdotes.sort((a,b)=>b.votes-a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div onClick={()=>{handleImportance(anecdote.id)}}>
            {anecdote.content}
          
          <strong style={{color:'red'}} >{anecdote.important ? 'important' : ''}</strong>
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
   </div>
  );
}
