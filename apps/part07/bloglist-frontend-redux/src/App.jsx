import { useState, useEffect } from 'react'
import Login from './pages/Login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Blogs from './pages/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { getUserFromLocalStorage, login, loginUser } from './reducers/authSlice'
import { initializeBlogs } from './reducers/blogSlice'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Layout from './components/Layout'
import Users from './pages/Users'
import User from './pages/User'
import Blog from './pages/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [formVisible, setFormVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Hello world')
    dispatch(getUserFromLocalStorage())
  }, [])

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

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
    } catch (exception) {
      console.log(exception)
    }
  }

  const getAllBlogs = async () => {
    if (user === null) return
    try {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  // useEffect(() => {
  //   dispatch(initializeBlogs())
  //   // getAllBlogs()
  // }, [user])

  console.log(isAuthenticated)

  return (
    <div className='bg-background dark:bg-background'>
      <Routes>
        {
          isAuthenticated
            ? (
            <>
            <Route path="/" element={<Layout/>}>
              <Route element={<Blogs />} />
              <Route path='/users' element={<Users/>} />
              <Route path='/users/:userId' element={<User/>} />
              <Route path='/' element={<Blogs />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/blogs/:blogId' element={<Blog />} />

              {/* <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} /> */}
            </Route>
            <Route path='/login' element={<Navigate to='/' />} />
            </>
              )
            : (
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='*' element={<Navigate to='/login' />} />
            </>
              )
        }
      </Routes>
    </div>
  )
}

export default App
