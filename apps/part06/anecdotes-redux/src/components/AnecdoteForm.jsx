import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setTimedNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

export default function AnecdoteForm() {

    const dispatch = useDispatch()

    const addAnecdote = async (ev) => {
        ev.preventDefault()
        const content = ev.target.anecdote.value
        ev.target.anecdote.value = ''
        const newNote = await anecdoteService.createNew(content)
        console.log(newNote)
        dispatch(createAnecdote(newNote))
        dispatch(setTimedNotification(`Created new anecdote: '${content}'`, 5))
    }

  return (
    <>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  );
}