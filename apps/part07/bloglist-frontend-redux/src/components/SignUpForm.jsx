import { useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../services/auth'
import Message from './Message'
import IMAGES from '@/img/Image'
import { Button } from './ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

export default function SignUpForm (props) {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)

  const resetState = () => {
    setUsername('')
    setName('')
    setPassword('')
    setPassword2('')
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    if (password !== password2) {
      setMessage('Passwords do not match')
      setIsError(true)
      setVisible(true)
      setInterval(() => {
        setVisible(false)
      }, 5000)
      return
    }
    const user = {
      username,
      name,
      password
    }
    try {
      await authService.signup(user)
      resetState()
      setMessage('User created successfully')
      setIsError(false)
      setVisible(true)
      setInterval(() => {
        setVisible(false)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setMessage('Username already exists')
      setIsError(true)
      setVisible(true)
      setInterval(() => {
        setVisible(false)
      }, 5000)
    }
  }

  return (
  // <div>
  //     <h2>Sign up to application</h2>
  //     <Message message={message} isError={isError} isVisible={visible} />
  //     <form onSubmit={handleSignUp}>
  //         <div>
  //             username
  //             <input
  //             type="text"
  //             value={username}
  //             name="Username"
  //             onChange={({ target }) => setUsername(target.value)}
  //             />
  //         </div>
  //         <div>
  //             name
  //             <input
  //             type="text"
  //             value={name}
  //             name="Name"
  //             onChange={({ target }) => setName(target.value)}
  //             />
  //         </div>
  //         <div>
  //             password
  //             <input
  //             type="password"
  //             value={password}
  //             name="Password"
  //             onChange={({ target }) => setPassword(target.value)}
  //             />
  //         </div>
  //         <div>
  //             repeat password
  //             <input
  //             type="password"
  //             value={password2}
  //             name="Password2"
  //             onChange={({ target }) => setPassword2(target.value)}
  //             />
  //         </div>
  //         <button type="submit">Sign up</button>
  //     </form>
  //     <Link to='/login'>Already have an account? Log in</Link>
  // </div>

    <div className='bg-gray-900 flex justify-center items-center w-full min-h-screen'>
            <div className='w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg'>
                <h2 className='text-4xl font-bold'>Sign up to application</h2>
                <Message message={message} isError={isError} isVisible={visible} />
                <p className='text-gray-500 text-md text-left mt-4'>Already have an account? <Link to='/login' className='text-green-500 hover:underline'>Log in</Link></p>
                <form onSubmit={handleSignUp} className='text-sm my-8 space-y-7'>
                    <div className='flex flex-col space-y-2 w-full'>
                        <Label htmlFor="username" className='text-gray-200'>Username</Label>
                        <Input
                        className='w-full border bg-white text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none '
                        type="text"
                        value={username}
                        id='username'
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div className='flex flex-col space-y-2 w-full'>
                        <Label htmlFor="name" className='text-gray-200'>Name</Label>
                        <Input
                        className='w-full border text-black bg-white border-gray-300 rounded-md py-2 px-3 focus:outline-none '
                        type="text"
                        value={name}
                        id='name'
                        name="Name"
                        onChange={({ target }) => setName(target.value)}
                        />
                    </div>
                    <div className='flex flex-col space-y-2 w-full'>
                        <Label htmlFor="password" className='text-gray-200'>Password</Label>
                        <Input
                        className='w-full border text-black bg-white border-gray-300 rounded-md py-2 px-3 focus:outline-none '
                        type="password"
                        value={password}
                        id='password'
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <div className='flex flex-col space-y-2 w-full'>
                        <Label htmlFor="password2" className='text-gray-200'>Repeat password</Label>
                        <Input
                        className='w-full border text-black bg-white border-gray-300 rounded-md py-2 px-3 focus:outline-none '
                        type="password"
                        value={password2}
                        id='password2'
                        name="Password2"
                        onChange={({ target }) => setPassword2(target.value)}
                        />
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">I accept the <a href="#" className="text-green-600 hover:text-green-700 hover:underline">terms</a> and <a href="#" className="text-green-600 hover:text-green-700 hover:underline">privacy policy</a></Label>
                    </div>
                    <div className='my-4 flex items-center justify-end space-x-4'>
                        <Button type="submit" className='text-white py-2 px-4 rounded-md'>Sign up</Button>
                    </div>
                </form>
            </div>
            <div className="w-3/5 h-screen hidden lg:block">
                <img src={IMAGES.imageSignUp} className="object-cover w-full h-full" alt="Placeholder Image" />
            </div>
    </div>
  )
}
