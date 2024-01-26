import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authSlice'
import blogReducer from '../reducers/blogSlice'
import notificationReducer from '@/reducers/notificationReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    notification: notificationReducer
  }
})

export default store
