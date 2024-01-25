import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import { useSelector } from 'react-redux'
// import Message from './Message'

export default function BlogForm ({ createBlog, isVisible, onChangeVisible }) {
  const user = useSelector((state) => state.auth.user)
  console.log(user)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [notification, setNotification] = useState({
    message: '',
    isError: false,
    isVisible: false
  })
  // const [user, setUser] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // setUser(JSON.parse(window.localStorage.getItem('loggedUser')))
    try {
      await createBlog(newBlog)
      setNotification({
        message: `A new blog ${newBlog.title} added`,
        isError: false,
        isVisible: true
      })
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        isError: true,
        isVisible: true
      })
    }

    setNewBlog({
      title: '',
      author: '',
      url: ''
    })

    const timeout = setTimeout(() => {
      setNotification({
        ...notification,
        isVisible: false
      })
    }, 5000)
    return () => clearTimeout(timeout)
  }



  return (
    <div style={{ display: isVisible ? '' : 'none' }}>
      <h2>create new</h2>
      {
      // <Message message={notification.message} isError={notification.isError} isVisible={notification.isVisible}/>
      }
        <form onSubmit={handleSubmit}>
            <label> title: </label>
            <input
                type="text"
                value={newBlog.title}
                name="title"
                id='title'
                onChange={handleChange}
            />
            <br />
            <label> author: </label>
            <input
                type="text"
                value={newBlog.author}
                name="author"
                id='author'
                onChange={handleChange}
            />
            <br />
            <label> url: </label>
            <input
                type="text"
                value={newBlog.url}
                name="url"
                id='url'
                onChange={handleChange}
            />
            <br />
            <button type="submit">Create</button>
            <button onClick={() => onChangeVisible(!isVisible)}>cancel</button>
            </form>
    </div>
  )
}
