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

  // const handleDeleteBlog = (blog) => {
  //   const userToken = JSON.parse(window.localStorage.getItem('loggedUser')).token
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     deleteBlog(blog, userToken)
  //   }
  // }


  return (
    <div style={blogStyle} className='blog-item'>
      <div className='blog-overview'> {blog.title} | {blog.author}
      <Togglable visible={viewMore} setVisibility={setViewMore} buttonLabel='View more' />
      </div>
      <div>
      {viewMore
        ? <div className='blog-content'>
          <div>Url {blog.url}</div>
          <div>
            <p className='blog-likes'>likes: {blog.likes}</p>
            <button onClick={handleUpdateLikes}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {
            blog.user.username === JSON.parse(window.localStorage.getItem('loggedUser')).username
              ? <button onClick={() => { deleteBlog(blog) }}>remove</button>
              : null
          }
        </div>
        
        : null
      }
      </div>
    </div>
  )
}
