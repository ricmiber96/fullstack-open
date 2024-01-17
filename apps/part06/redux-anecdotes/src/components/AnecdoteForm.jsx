import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setTimedNotification } from '../reducers/notificationReducer';

export default function AnecdoteForm() {

    const dispatch = useDispatch()

    const addAnecdote = (ev) => {
        ev.preventDefault()
        const content = ev.target.anecdote.value
        ev.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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
