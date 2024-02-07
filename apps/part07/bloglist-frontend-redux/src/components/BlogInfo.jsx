import React from 'react'
import { Button } from './ui/button'
import { MessageSquare, Plus, ThumbsUp, Trash2 } from 'lucide-react'
import DialogAddComment from './DialogAddComment'
import { updateLikes } from '@/reducers/blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function BlogInfo ({ loading, error }) {
  const { blogId } = useParams()
  const { blogs } = useSelector((state) => state)
  console.log(blogId)
  console.log(blogs)
  const blog = blogs.find(blog => blog.id === blogId)

  console.log(blog)
  const dispatch = useDispatch()

  const handleUpdateLikes = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(updateLikes(newBlog))
  }

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
            <Button onClick={handleUpdateLikes} className="gap-2"><ThumbsUp/> Like</Button>
            <DialogAddComment />
            {
              blog.user.username === JSON.parse(window.localStorage.getItem('loggedUser')).username
                ? <Button variant="secondary" onClick={() => { deleteBlog(blog) }}>Remove</Button>
                : null
            }
            </div>
            <div className='flex flex-col gap-4 mb-24'>
            <h4 className='text-2xl mb-4'>Comments:</h4>
            <div className='flex flex-col  gap-4  overflow-y-scroll h-[300px] min-h-[300px] max-h-[300px]'>
            {
              blog.comments.length === 0
                ? <p>No comments yet</p>
                : blog.comments.map((comment, index) => {
                  console.log(comment)
                  return (
                      <div key={index} className='flex flex-row gap-4'>
                          <MessageSquare/>
                        <p className='text-2xl mb-4'>
                         {comment.content}</p>
                      </div>
                  )
                })
            }
            </div>
            </div>
        </div>
    </div>
  )
}
