import React, { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

export default function Blog ({ blog }) {
  const [viewMore, setViewMore] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }

  const handleUpdateLikes = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const userToken = JSON.parse(window.localStorage.getItem('loggedUser')).token
    blogService.updateBlog(newBlog, userToken)
  }

  const handleDeleteBlog = (blog) => {
    const userToken = JSON.parse(window.localStorage.getItem('loggedUser')).token
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog, userToken)
    }
  }

  return (
    <div style={blogStyle}>
      <div> {blog.title} | {blog.author}</div>
      <Togglable visible={viewMore} setVisibility={setViewMore} buttonLabel='view' />
      {/* <button onClick={() => setViewMore(!viewMore)}>{viewMore ? 'hide' : 'view'}</button> */}
      <div>
      {viewMore
        ? <div className='blog-content'>
          <div>{blog.url}</div>
          <div>
            <p>likes: {blog.likes}</p>
            <button onClick={handleUpdateLikes}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={() => { handleDeleteBlog(blog) }}>remove</button>
        </div>
        
        : null
      }
      </div>
    </div>
  )
}
