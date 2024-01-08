import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

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
          <BlogForm isVisible={formVisible} onChangeVisible={setFormVisible}/>
          <h2>blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </>
  )
}

export default App
