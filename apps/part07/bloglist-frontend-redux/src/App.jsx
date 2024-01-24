import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './pages/Login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Blogs from './pages/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './reducers/authSlice'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [formVisible, setFormVisible] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

 

  const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userParser = JSON.parse(loggedUserJSON)
      // dispatch(login(userParser))
    }
  }

  useEffect(() => {
    getUserFromLocalStorage()
  }, [])


  const sortedBlogs = (blogs) => {
   setBlogs(blogs.sort((a, b) => b.likes - a.likes))
}

  const addBlog = async (newBlog) => {
    try {
      await blogService.addBlog(newBlog, user.token)
      getAllBlogs()
    
      // await blogService.addBlog(newBlog, user.token)
      // const blogs = await blogService.getAll()
      // sortedBlogs(blogs)
    }
    catch (exception) {
      console.log(exception)
    }
  }

  const getAllBlogs = async () => {
    if (user === null) return
    try {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    catch (exception) {
      console.log(exception)
    }
  }
  
  useEffect(() => {
    getAllBlogs()
  }, [user])

  console.log(user);

  return (
    <>
      <Routes>
        <Route path="/" element={ user ? <Blogs />  : <Navigate to="/login" /> } />
        <Route path="/login" element={<Login /> } />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
