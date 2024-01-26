import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, createNewAnecdote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

export default function AnecdoteForm () {
  const dispatch = useDispatch()

  const addAnecdote = async (ev) => {
    ev.preventDefault()
    const content = ev.target.anecdote.value
    ev.target.anecdote.value = ''
    dispatch(createNewAnecdote(content))
    dispatch(setTimedNotification(`Created new anecdote: '${content}'`, 5))
  }

  return (
    <>
    <h2>Create New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}
