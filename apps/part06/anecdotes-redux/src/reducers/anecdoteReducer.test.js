import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('anecdoteReducer', () => {
    test('returns new state with action NEW_ANECDOTE', () => {
        const state = []
        const action = {
        type: 'NEW_ANECDOTE',
        payload: {
            content: 'this is a test',
            id: 1,
            votes: 0
        }
        }
    
        deepFreeze(state)
        const newState = anecdoteReducer(state, action)
        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.payload)
    })
    
    test('returns new state with action VOTE', () => {
        const state = [
        {
            content: 'this is a test',
            id: 1,
            votes: 0
        },
        {
            content: 'this is another test',
            id: 2,
            votes: 0
        }
        ]
        const action = {
        type: 'VOTE',
        payload: {
            id: 1
        }
        }
    
        deepFreeze(state)
        const newState = anecdoteReducer(state, action)
        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual({
        content: 'this is a test',
        id: 1,
        votes: 1
        })
    })
    test('returns new state with action TOGGLE_IMPORTANCE', () => {
        const state = [
        {
            content: 'this is a test',
            id: 1,
            votes: 0,
            important: false
        },
        {
            content: 'this is another test',
            id: 2,
            votes: 0,
            important: false
        }
        ]
        const action = {
        type: 'TOGGLE_IMPORTANCE',
        payload: {
            id: 1
        }
        }
    
        deepFreeze(state)
        const newState = anecdoteReducer(state, action)
        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual({
        content: 'this is a test',
        id: 1,
        votes: 0,
        important: true
        })
    })
})