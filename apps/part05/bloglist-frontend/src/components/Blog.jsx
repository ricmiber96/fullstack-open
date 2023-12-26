import React, { useState } from 'react'

export default function Blog ({ blog }) {
  const [viewMore, setViewMore] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }
  return (
    <div style={blogStyle}>
      <div> {blog.title} | {blog.author}</div>
      <button onClick={() => setViewMore(!viewMore)}>{viewMore ? 'hide' : 'view'}</button>
      {viewMore
        ? <div>
          <div>{blog.url}</div>
          <div>likes:  {blog.likes}
            <button>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
        : null
      }
    </div>
  )
}
