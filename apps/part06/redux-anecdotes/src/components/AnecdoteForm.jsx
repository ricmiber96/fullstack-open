import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

export default function AnecdoteForm() {

    const dispatch = useDispatch()

    const addAnecdote = (ev) => {
        ev.preventDefault()
        const content = ev.target.anecdote.value
        ev.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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
