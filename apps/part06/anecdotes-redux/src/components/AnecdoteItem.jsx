import React from 'react'

export default function AnecdoteItem ({ anecdote }) {
  const anecdoteStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black'
  }

  const importantStyle = {
    color: anecdote.important ? 'red' : 'green'
  }

  return (
    <div key={anecdote.id} style={anecdoteStyle}>
        <h2>Title: {anecdote.title}</h2>
        <p>Votes: <strong>{anecdote.content}</strong></p>
        <p><strong style={importantStyle} >{anecdote.important ? 'important' : 'non-important'}</strong></p>
    </div>
  )
}
