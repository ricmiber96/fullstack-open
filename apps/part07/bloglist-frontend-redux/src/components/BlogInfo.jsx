import React from 'react'
import { Button } from './ui/button'
import { Plus, ThumbsUp, Trash2 } from 'lucide-react'
import DialogAddComment from './DialogAddComment'

export default function BlogInfo ({ blog, loading, error }) {
  return (
    <div className='flex flex-col mt-10'>
        <h3 className='text-3xl mb-4'>Blog info</h3>
        <div className='flex flex-col gap-4'>
            { loading && <p>Loading...</p> }
            { error && <p>Error: {error}</p> }
            <div className='flex flex-row gap-4'>
            <div className='flex flex-col'>
              <h4 className='text-2xl mb-4'>Title:</h4>
              <h4 className='text-2xl mb-4'>Author:</h4>
              <h4 className='text-2xl mb-4'>URL:</h4>
              <h4 className='text-2xl mb-4'>Likes:</h4>
              </div>
              <div className='flex flex-col'>
              <p className='text-2xl mb-4'>{blog.title}</p>
              <p className='text-2xl mb-4'>{blog.author}</p>
              <p className='text-2xl mb-4'>{blog.url}</p>
              <p className='text-2xl mb-4'>{blog.likes}</p>
            </div>
            </div>
            <div className='flex flex-row gap-4'>
            <Button className="gap-2"><ThumbsUp/> Like</Button>
            <DialogAddComment />
            {
              blog.user.username === JSON.parse(window.localStorage.getItem('loggedUser')).username
                ? <Button variant="secondary" onClick={() => { deleteBlog(blog) }}>Remove</Button>
                : null
            }
            </div>
            <div className='flex flex-col gap-4'>
            <h4 className='text-2xl mb-4'>Comments:</h4>
            <p className='text-2xl mb-4'>No comments yet</p>
            </div>
        </div>
    </div>
  )
}
