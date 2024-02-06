import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog: (state, action) => {
      const newBlog = action.payload
      console.log('newBlog:', newBlog)
      return state.concat(newBlog)
    },
    appendBlog: (state, action) => {
      const newBlog = action.payload
      return state.concat(newBlog)
    },
    setBlogs: (state, action) => {
      const blogs = action.payload
      return sortBlogs(blogs)
    },
    addVote: (state, action) => {
      const id = action.payload
      const blogToChange = state.find((blog) => blog.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    addComment: (state, action) => {
      const { id, comment } = action.payload
      const blogToChange = state.find((blog) => blog.id === id)
      const changedBlog = {
        ...blogToChange,
        comments: blogToChange.comments.concat(comment)
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    }
  }
})

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAllBlogs()
  dispatch(setBlogs(blogs))
}

export const createNewBlog = (blog, user) => async (dispatch) => {
  const newBlog = await blogService.addBlog(blog, user)
  dispatch(createBlog(newBlog))
}
export const updateLikes = (blog) => async (dispatch) => {
  const updatedBlog = await blogService.updateBlog(blog)
  dispatch(addVote(updatedBlog.id))
}

export const addNewComment = (id, comment) => async (dispatch) => {
  console.log('addNewComment:', id, comment)
  const updatedBlog = await blogService.addComent(id, comment)
  dispatch(addComment(updatedBlog.id, comment))
}

export const { createBlog, appendBlog, setBlogs, addVote, addComment } = blogSlice.actions
export default blogSlice.reducer
