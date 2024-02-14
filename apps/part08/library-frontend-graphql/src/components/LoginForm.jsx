import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOGIN } from '../../queries';

export default function LoginForm(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log('error', error)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
            window.location.reload()
        }
    }, [result.data])


    const handleSubmit = (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
        setUsername('')
        setPassword('')
        console.log('logging in...')
        
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={props.username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={props.password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
        </form>
    </div>
  );
}
