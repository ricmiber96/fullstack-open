import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

// ICONS
import { ThumbsUp, User } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from './ui/button'

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default function BlogCard ({ blog, updateBlog, deleteBlog }) {
  const [viewMore, setViewMore] = useState(false)

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
    // <Card className="mb-4">
    <Card className={`mb-4 ${viewMore ? 'row-span-2' : 'row-span-1'}`}>
      <CardHeader>
        <CardTitle>
          <div className='flex flex-row space-x-4'>
            <Link to={`/blogs/${blog.id}`}>
              <h3 className='text-3xl'>{blog.title}</h3>
            </Link>
          <Togglable visible={viewMore} setVisibility={setViewMore} buttonLabel='View more' />
          </div>
        </CardTitle>
        <CardDescription className="text-md">
           {blog.author}
        </CardDescription>
      </CardHeader>
      <CardContent>
      <div>
      {viewMore
        ? <div className='flex flex-col space-y-3'>
            <div className='flex flex-row gap-4'>
              <User />
              <p>{blog.user.name}</p>
            </div>
            <div className='flex flex-row gap-4'>
              <ThumbsUp/>
              <p>{blog.likes}</p>
            </div>
            <div className='flex flex-row gap-4'>
              <Link width={18} />
              {blog.url}
            </div>
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
