import React, { useEffect, useState } from 'react'
import authService from '../services/auth'
import Message from './Message'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authSlice'
import IMAGES from '@/img/Image'

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
      const user = await authService.login({
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
    // <div>
    // <h2>Log in to application</h2>
    // {
    //     <Message message={message} isError={isError} isVisible={visible} />
    // }
    // <form onSubmit={handleLogin}>
    //     <div>
    //         username
    //         <input
    //         type="text"
    //         value={username}
    //         id='username'
    //         name="Username"
    //         onChange={({ target }) => setUsername(target.value)}
    //         />
    //     </div>
    //     <div>
    //         password
    //         <input
    //         type="password"
    //         value={password}
    //         id='password'
    //         name="Password"
    //         onChange={({ target }) => setPassword(target.value)}
    //         />
    //     </div>
    //     <button type="submit">login</button>
    // </form>
    // <div>
    //   <Link to='/signup'>You don't have an account? Sign up here!</Link>
    // </div>
    // </div>
    <div class="bg-gray-800 flex justify-center items-center h-screen">
      <div class="w-1/2 h-screen hidden lg:block">
        <img src={IMAGES.imageLogin} alt="Placeholder Image" class="object-cover w-full h-full"/>
      </div>
      <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h2 class="text-4xl font-bold mb-4">Blog App</h2>
        <form onSubmit={handleLogin} className='space-y-4'>
        <div>
            <label for="username" class="block text-gray-200">Username</label>
            <input
            class="w-full border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            type="text"
            value={username}
            id='username'
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            <label for="password" class="block text-gray-200">Password</label>
            <input
            class="w-full border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            type="password"
            value={password}
            id='password'
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button className='bg-green-400 hover:bg-green-600 text-white font-semibold rounded-md py-2 px-4 w-full' type="submit">Login</button>
        <div>
          <Link to='/signup' className='text-green-500 hover:underline'>You don't have an account? Sign up here!</Link>
        </div>
    </form>    
      </div>
    </div>

  )
}
