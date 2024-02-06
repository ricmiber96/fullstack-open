import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from './ui/button'
import { Plus, Send, SendHorizonal } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useDispatch } from 'react-redux'
import { addNewComment, createNewBlog } from '@/reducers/blogSlice'
import { useParams } from 'react-router-dom'

export default function DialogAddComment (props) {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const { blogId } = useParams()

  const handleChange = (e) => {
    e.preventDefault()
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(comment)
    console.log(blogId)
    dispatch(addNewComment(blogId, comment))
    setComment('')
  }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="gap-2">
                <Plus />
                Add Comment
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Add New Comment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Comment
                </Label>
                <Input
                    name="comment"
                    className="col-span-3"
                    placeholder="New Comment"
                    value={comment}
                    onChange={handleChange}
                />
                </div>
            </div>
            <DialogFooter>
                <Button className="gap-2" type="submit">
                    <SendHorizonal />
                    Send Comment</Button>
            </DialogFooter>
            </form>
        </DialogContent>

    </Dialog>
  )
}
