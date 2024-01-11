import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [formVisible, setFormVisible] = useState(false)

  const getUserFromLocalStorage = async() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }

  useEffect(() => {
    getUserFromLocalStorage()
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const sortedBlogs = (blogs) => {
   setBlogs(blogs.sort((a, b) => b.likes - a.likes))
}

  const addBlog = async (newBlog) => {
    try {
      const createBlog = await blogService.addBlog(newBlog, user.token)
      sortedBlogs(blogs.concat({...createBlog, user: user}))
    }
    catch (exception) {
      console.log(exception)
    }
  }

  const getAllBlogs = async () => {
    if (user === null) return
    try {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    catch (exception) {
      console.log(exception)
    }
  }
  
  useEffect(() => {
    getAllBlogs()
  }, [user])

  return (
    <>
      {user === null
        ? <Login user={user} onUserChange={setUser} />
        : <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          <button style={{ display: formVisible ? 'none' : '' }} onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? 'cancel' : 'new blog'}
          </button>
          <BlogForm createBlog={addBlog} isVisible={formVisible} onChangeVisible={setFormVisible}/>
          <BlogList blogs={blogs} user={user} sortedBlogs={sortedBlogs} />
        </div>
      }
    </>
  )
}

export default App
