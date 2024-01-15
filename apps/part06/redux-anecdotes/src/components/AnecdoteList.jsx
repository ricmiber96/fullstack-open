import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';

export default function AnecdoteList(props) {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    const handleVote = (id) => {
        dispatch(addVote(id))
    }
  return (
   <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
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
