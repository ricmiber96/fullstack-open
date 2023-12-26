import React, { useEffect, useState } from 'react'
import loginService from '../services/login'
import Message from './Message'

export default function Login ({ onUserChange }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [visible, setVisible] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      onUserChange(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setMessage('Wrong credentials')
      setIsError(true)
    }
    setVisible(true)
    setInterval(() => {
      setVisible(false)
    }, 5000)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true)
    }, 5000)
    return () => clearTimeout(timeout)
  }, [onUserChange])

  return (
    <div>
    <h2>Log in to application</h2>
    {
        <Message message={message} isError={isError} isVisible={visible} />
    }
    <form onSubmit={handleLogin}>
        <div>
            username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
    </form>
    </div>
  )
}
