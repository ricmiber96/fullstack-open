import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = {
  
//     anecdotes: [
//       'If it hurts, do it more often',
//       'Adding manpower to a late software project makes it later!',
//       'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//       'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//       'Premature optimization is the root of all evil.',
//       'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
//     ]  
// }

const getId = () => (100000 * Math.random()).toFixed(0)

// const transformedAnecdotes = {
//   anecdotes: anecdotesAtStart.anecdotes.map((content) => ({
//     content,
//     id: getId(), // Generating a simple id (adjust as needed)
//     votes: 0,
//     important: Math.random() > 0.5 ? true : false
//   }))
// }

// console.log(transformedAnecdotes);



// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//     important: Math.random() > 0.5 ? true : false
//   }
// }

// const anecdotesAsObject = anecdotesAtStart.map((anecdote) => {
//   return anecdote.anecdotes.map(asObject)
// })

// const initialState = anecdotesAtStart.map((anecdote) => {
//   return {
//     anecdotes: {...anecdotesAsObject} ,
//     filter: anecdote.filter
//   }
// })




// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export const addVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export const toogleImportance = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: { id }
//   }
// }

// const initialState = transformedAnecdotes

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      const content = action.payload
      // const newAnecdote = { 
      //   content,
      //   id: getId(),
      //   votes: 0,
      //   important: Math.random() > 0.5 ? true : false
      // }
      state.anecdotes.push(content)
    },
    addVote: (state, action) => {
      console.log(state.anecdotes)
      const id = action.payload
      console.log('ID', action.payload)
      const anecdoteToChange = state.anecdotes.find(a => a.id === id)
      console.log(anecdoteToChange)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      const newState = state.anecdotes.map(a => a.id === id ? changedAnecdote : a).sort((a, b) => b.votes - a.votes)
      console.log('newState', newState)
      return {...state, anecdotes: newState}
    },
    toogleImportance: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.anecdotes.find(a => a.id === id)
      const changedAnecdote = {...anecdoteToChange, important: !anecdoteToChange.important}
      const newState = state.anecdotes.map(a => a.id === id ? changedAnecdote : a).sort((a, b) => b.votes - a.votes)
      return {...state, anecdotes: newState}
    },
    appendAnecdote: (state, action) => {
      state.anecdotes.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      console.log('action', action)
      return {
        ...state,
        anecdotes: action.payload
      }
    }
  }
})

export const {createAnecdote, addVote, toogleImportance, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = async(dispatch) => {
  const initialAnecdotes =  await anecdoteService.getAll()
  dispatch(setAnecdotes(initialAnecdotes))
}


// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   const {type, payload} = action

//   switch (type) {
//     case 'NEW_ANECDOTE':
//       return [...state, payload]

//     case 'VOTE':{
//       const id = payload.id
//       const anecdoteToChange = state.find(a => a.id === id)
//       const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
//       const newState = state.map(a => a.id === id ? changedAnecdote : a).sort((a, b) => b.votes - a.votes)
//       return newState
//     }
//     case 'TOGGLE_IMPORTANCE':{
//       const id = payload.id
//       const anecdoteToChange = state.find(a => a.id === id)
//       console.log(anecdoteToChange)
//       const changedAnecdote = {...anecdoteToChange, important: !anecdoteToChange.important}
//       const newState = state.map(a => a.id === id ? changedAnecdote : a).sort((a, b) => b.votes - a.votes)
//       return newState
//     }
//     default:
//       return state
//   }

// }

// export default anecdoteReducer