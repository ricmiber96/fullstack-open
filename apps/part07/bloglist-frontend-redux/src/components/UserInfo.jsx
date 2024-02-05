import React from 'react'

export default function UserInfo ({ user, loading, error }) {
  return (

    <div className='flex flex-col mt-10'>
      <h3 className='text-3xl mb-4'>User info</h3>
      <div className='flex flex-row gap-4'>
      { loading && <p>Loading...</p> }
      { error && <p>Error: {error}</p> }
        <div className='flex flex-col'>
          <h4 className='text-2xl mb-4'>Username:</h4>
          <h4 className='text-2xl mb-4'>Name:</h4>
        </div>
        <div className='flex flex-col'>
          <p className='text-2xl mb-4'>{user.username}</p>
          <p className='text-2xl mb-4'>{user.name}</p>
        </div>
       </div>
       <div className='flex flex-col gap-4 mt-16'>
       <h4 className='text-2xl mb-4'>Blogs created</h4>
        { user.blogs.length === 0 && <p>No blogs created</p> }
        <ul className='list-disc'>
        {
        user.blogs.map(blog => (
            <li key={blog.id} className='text-2xl mb-4'>{blog.title}</li>
        ))}
        </ul>
        </div>
    </div>
  )
}
