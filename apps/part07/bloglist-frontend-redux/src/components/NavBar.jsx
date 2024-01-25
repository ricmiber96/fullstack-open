import React from 'react';
import DialogCreateBlog from './DialogCreateBlog';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react';
// ICONS


import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { logout } from '@/reducers/authSlice';

export default function NavBar(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.user);
    const handleLogout = () => {
        console.log('logout')
        dispatch(logout())
        window.localStorage.removeItem('loggedUser')
    }

    const navBarStyle = {
        backgroundColor: '#1C1917',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '10px',
        marginBottom: '10px',
        width: '100%',
        color: 'white',
    }

  return (
    <header style={navBarStyle} className='flex justify-end flex-row-reverse space-x-4 mb-4'>
        <Link style={{ marginRight: '10px' }} to="/">Blogs</Link>
        <Link style={{ marginRight: '10px' }} to="/users">Users</Link>
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>{user.name} logged-in</span>
        <DialogCreateBlog/>
        <Button variant="secondary" onClick={handleLogout}>
            <LogOut className='mr-2 w-4 h-4' />    Logout
        </Button>
      
    </header>
   
  );
}
