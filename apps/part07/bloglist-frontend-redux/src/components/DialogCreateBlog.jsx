import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Save } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import ToastButton from './Toast'
import { useNavigate } from 'react-router-dom'
import { createNewBlog } from '@/reducers/blogSlice'

export default function DialogCreateBlog (props) {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [notification, setNotification] = useState({
    message: '',
    isError: false,
    isVisible: false
  })

  const getAllBlogs = async () => {
    try {
      const blogs = await blogService.getAllBlogs()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  const addBlog = async (newBlog) => {
    try {
      await blogService.addBlog(newBlog, user.token)
      getAllBlogs()

      // await blogService.addBlog(newBlog, user.token)
      // const blogs = await blogService.getAll()
      // sortedBlogs(blogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // setUser(JSON.parse(window.localStorage.getItem('loggedUser')))
    // await addBlog(newBlog)
    dispatch(createNewBlog(newBlog, user.token))
    setNotification({
      message: `A new blog ${newBlog.title} added`,
      isError: false,
      isVisible: true
    })

    setNewBlog({
      title: '',
      author: '',
      url: ''
    })

    const timeout = setTimeout(() => {
      setNotification({
        ...notification,
        isVisible: false
      })
    }, 5000)
    return () => clearTimeout(timeout)
  }

  return (
        <Dialog>
        <DialogTrigger asChild>
            <Button>
                <Plus className='mr-2 w-4 h-4' /> Create Blog
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
            <DialogDescription>
                Fill out the form below to add a new blog.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">

              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                value={newBlog.title}
                className="col-span-3"
                onChange={handleChange}
                placeholder="New Blog"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Author
              </Label>
              <Input
                name="author"
                placeholder="johndoe"
                value={newBlog.author}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Url
              </Label>
              <Input
                name="url"
                placeholder="https://example.com"
                className="col-span-3"
                value={newBlog.url}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
          <DialogClose asChild>
            {/* <Button type="submit">
               <Save className='mr-2 w-4 h-4'/> Save changes
            </Button> */}
            <ToastButton
              icon={<Save className='mr-2 w-4 h-4'/>}
              text={'Save changes'}
              title={'New blog'}
              description={`A new blog ${newBlog.title} added`}
            />
          </DialogClose>
            <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  )
}
