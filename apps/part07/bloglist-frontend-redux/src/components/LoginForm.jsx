import React, { useEffect, useState } from 'react'
import loginService from '../services/login'
import Message from './Message'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authSlice'

export default function LoginForm ({ onUserChange }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch(login(user))
      // onUserChange(user)
      setUsername('')
      setPassword('')
      navigate('/')

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
            id='username'
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            password
            <input
            type="password"
            value={password}
            id='password'
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
    </form>
    <div>
      <Link to='/signup'>You don't have an account? Sign up here!</Link>
    </div>
    </div>
  )
}
