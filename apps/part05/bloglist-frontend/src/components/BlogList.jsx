import React from 'react';
import PropTypes from 'prop-types'
import Blog from './Blog'
import blogService from '../services/blogs'



export default function BlogList({blogs}) {

    const updateBlog = async(blog) => {
        try {
            await blogService.updateBlog(blog)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        catch (exception) {
            console.log(exception)
        }
    }

    const deleteBlog = async(blog) => {
        try {
            await blogService.deleteBlog(blog)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        catch (exception) {
            console.log(exception)
        }
    }

  return (
    <div>
      <h2>Blogs</h2>
        <div className="blog-list">
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
            )}
        </div>
    </div>
  );
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired
}
