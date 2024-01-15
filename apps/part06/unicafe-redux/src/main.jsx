import React from 'react'
import ReactDOM from 'react-dom/client'

import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'

const store = configureStore({ reducer })

const App = () => {
  const goodHandler = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const okHandler = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const badHandler = () => {
    store.dispatch({
      type: 'BAD'
    })
  }


  const resetHandler = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const { good, ok, bad } = store.getState()

  return (
    <div>
      <button onClick={goodHandler}>good</button> 
      <button onClick={okHandler} >ok</button> 
      <button onClick={badHandler}>bad</button>
      <button  onClick={resetHandler}>reset stats</button>
      <div>good: {good}</div>
      <div>ok: {ok}</div>
      <div>bad: {bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
