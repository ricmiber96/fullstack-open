import BlogInfo from '@/components/BlogInfo'
import useFetch from '@/hooks/useFetch'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Blog (props) {
  const { blogId } = useParams()
  const { data, loading, error } = useFetch(`http://localhost:3003/api/blogs/${blogId}`)

  return (
    <div className='flex flex-col items-center content-center'>
     { loading
       ? <p>Loading...</p>
       : error
         ? <p>Error: {error}</p>
         : <BlogInfo blog={data} />
        }
    </div>
  )
}
