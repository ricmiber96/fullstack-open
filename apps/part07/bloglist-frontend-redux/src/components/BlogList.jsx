import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import Blog from './Blog'
import blogService from '../services/blogs'




export default function BlogList({blogs, user, sortedBlogs}) {


    const updateBlog = async(blog) => {
        try {
            await blogService.updateBlog(blog)
            const blogs = await blogService.getAll()
            sortedBlogs(blogs)
        }
        catch (exception) {
            console.log(exception)
        }
    }

    const deleteBlog = async(blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                await blogService.deleteBlog(blog, user)
                const newBlogs = blogs.filter(b => b.id !== blog.id)
                sortedBlogs(newBlogs)
            }
            catch (exception) {
                console.log(exception)
            }
        
        } 
    }

  return (
    <div>
      <h2>Blogs</h2>
        <div className="flex flex-row gap-4 mt-6">
            {blogs.length === 0 && <p>No blogs to show</p>}
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
            )}
        </div>
    </div>
  );
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    sortedBlogs: PropTypes.func.isRequired
}
