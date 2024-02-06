import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Blog from './BlogCard'
import blogService from '../services/blogs'
import { useSelector } from 'react-redux'
import { Button } from './ui/button'
import BlogCard from './BlogCard'

export default function BlogList ({ user, sortedBlogs }) {
  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)

  const updateBlog = async (blog) => {
    try {
      await blogService.updateBlog(blog)
      const blogs = await blogService.getAllBlogs()
      sortedBlogs(blogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog, user)
        const newBlogs = blogs.filter(b => b.id !== blog.id)
        sortedBlogs(newBlogs)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  return (
    <div className='flex flex-col items-center align-middle'>
        <div className="grid grid-cols-4 gap-4 mt-6 mb-28">
            {blogs.length === 0 && <p>No blogs to show</p>}
            {blogs.map(blog =>
                <BlogCard key={blog.id} blog={blog} deleteBlog={deleteBlog} />
            )}
        </div>
    </div>
  )
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  sortedBlogs: PropTypes.func.isRequired
}
