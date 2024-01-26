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
      return state.blogs.push(newBlog)
    },
    appendBlog: (state, action) => {
      const newBlog = action.payload
      return state.blogs.push(newBlog)
    },
    setBlogs: (state, action) => {
      const blogs = action.payload
      return sortBlogs(blogs)
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

export const { createBlog, appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
