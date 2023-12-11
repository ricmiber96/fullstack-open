import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import Statistics from './components/Statistics'

function App() {

  const [comments, setComments] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total : 0,
  })

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [anecdote, setAnecdote] = useState(anecdotes[Math.floor(Math.random() * anecdotes.length)])
  let anecdoteIndex = anecdotes.indexOf(anecdote)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  })
  console.log(votes)

  const handleGoodClick = () => {
    setComments({...comments, 
      good: comments.good + 1,
      total: comments.total + 1})
  }

  const handleNeutralClick = () => {
    setComments({...comments, 
      neutral: comments.neutral + 1,
      total: comments.total + 1
    })
  
  }

  const handleBadClick = () => {
    setComments({...comments, 
      bad: comments.bad + 1,
      total: comments.total + 1
    })
  }

  const handleRandomAnecdote = () => {
    anecdoteIndex = Math.floor(Math.random() * anecdotes.length)
    setAnecdote(anecdotes[anecdoteIndex])
  }

  const handleVote = () => { 
    setVotes({...votes, [anecdoteIndex]: votes[anecdoteIndex] + 1})
    
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <h2>Statistics</h2>
      <Statistics comments={comments} />
      <h2>Random Anecdote</h2>
      <p>
        {anecdote}
        has {votes[anecdoteIndex]} votes
      </p>
      <Button handleClick={handleVote} text="Vote" />
      <Button handleClick={handleRandomAnecdote} text="Next Anecdote" />
      <h2>Anecdote with most votes</h2>
      <p>
        {anecdotes[Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)]}
        has {votes[Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)]} votes

      </p>
    </>
  )
}

export default App
