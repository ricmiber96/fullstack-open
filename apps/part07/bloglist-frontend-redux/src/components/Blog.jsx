import React, { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react';


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
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          <div className='flex flex-row space-x-4'>
          <h3 className='text-3xl'>{blog.title}</h3>

          <Togglable visible={viewMore} setVisibility={setViewMore} buttonLabel='View more' />
          </div>
        </CardTitle>
        <CardDescription className="text-md">Author: {blog.author}</CardDescription>
      </CardHeader>
      <CardContent>
      <div>
      {viewMore
        ? <div className='blog-content'>
          <div>Url {blog.url}</div>
          <div>
            <p className='blog-likes'>likes: {blog.likes}</p>
            
          </div>
          <div>{blog.user.name}</div>
          <div className='flex flex-row w-full space-x-4 mt-4'>
          <Button onClick={handleUpdateLikes}>Vote</Button>
          {
            blog.user.username === JSON.parse(window.localStorage.getItem('loggedUser')).username
              ? <Button variant="secondary" onClick={() => { deleteBlog(blog) }}>Remove</Button>
              : null
          }
          </div>
        </div>
        
        : null
      }
      </div>
      </CardContent>
    </Card>
  )
}
