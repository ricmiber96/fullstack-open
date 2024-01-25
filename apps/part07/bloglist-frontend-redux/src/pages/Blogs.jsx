import React, { useEffect, useState } from 'react';
import BlogList from '../components/BlogList';
import BlogForm from '../components/BlogForm';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import blogService from '../services/blogs';

export default function Blogs(props) {

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = useState(false)
    const navigate = useNavigate()
    console.log(user);


    const [blogs, setBlogs] = useState([])
  
    const sortedBlogs = (blogs) => {
     setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }
  
    const addBlog = async (newBlog) => {
      try {
        await blogService.addBlog(newBlog, user.token)
        getAllBlogs()
      
        // await blogService.addBlog(newBlog, user.token)
        // const blogs = await blogService.getAll()
        // sortedBlogs(blogs)
      }
      catch (exception) {
        console.log(exception)
      }
    }
  
    const getAllBlogs = async () => {
      if (user === null) return
      try {
        const blogs = await blogService.getAllBlogs()
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      }
      catch (exception) {
        console.log(exception)
      }
    }
    
    useEffect(() => {
      getAllBlogs()
    }, [user])

  return (
    <div>
          <p>{user.name} logged-in</p>
          <button style={{ display: formVisible ? 'none' : '' }} onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? 'cancel' : 'new blog'}
          </button>
          <BlogForm createBlog={addBlog} isVisible={formVisible} onChangeVisible={setFormVisible}/>
          <BlogList blogs={blogs} user={user} sortedBlogs={sortedBlogs} />
    </div>
  );
}
