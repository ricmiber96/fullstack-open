import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authSlice'
import blogReducer from '../reducers/blogSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        blogs: blogReducer
    }
})

export default store