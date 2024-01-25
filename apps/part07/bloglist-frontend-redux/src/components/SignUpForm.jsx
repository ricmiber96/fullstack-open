import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/auth';
import Message from './Message';

export default function SignUpForm(props) {

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const [visible, setVisible] = useState(false)

    const resetState = () => {
        setUsername('');
        setName('');
        setPassword('');
        setPassword2('');
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (password !== password2) {
            setMessage('Passwords do not match');
            setIsError(true);
            setVisible(true);
            setInterval(() => {
                props.setVisible(false);
            }, 5000);
            return;
        }
        const user = {
            username,
            name,
            password
        };
        try {
            await authService.signup(user);
            resetState();
            setMessage('User created successfully');
            setIsError(false);
            setVisible(true);
            setInterval(() => {
                setVisible(false);
            }, 5000);
        }
        catch (exception) {
            console.log(exception);
            setMessage('Username already exists');
            setIsError(true);
            setVisible(true);
            setInterval(() => {
                setVisible(false);
            }, 5000);
        }
    }


  return (
    <div>
        <h2>Sign up to application</h2>
        <Message message={message} isError={isError} isVisible={visible} />
        <form onSubmit={handleSignUp}>
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
                name
                <input
                type="text"
                value={name}
                name="Name"
                onChange={({ target }) => setName(target.value)}
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
            <div>
                repeat password
                <input
                type="password"
                value={password2}
                name="Password2"
                onChange={({ target }) => setPassword2(target.value)}
                />
            </div>
            <button type="submit">Sign up</button>
        </form>
        <Link to='/login'>Already have an account? Log in</Link>
    </div>
  );
}
