import React, { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default function Blog ({ blog, updateBlog, deleteBlog }) {
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
    updateBlog(newBlog)
  }

  const handleDeleteBlog = (blog) => {
    const userToken = JSON.parse(window.localStorage.getItem('loggedUser')).token
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog, userToken)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='blog-overview'> {blog.title} | {blog.author}</div>
      <Togglable visible={viewMore} setVisibility={setViewMore} buttonLabel='View more' />
      <div>
      {viewMore
        ? <div className='blog-content'>
          <div>Url {blog.url}</div>
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
