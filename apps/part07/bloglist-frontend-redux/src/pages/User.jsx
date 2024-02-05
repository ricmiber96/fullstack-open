import UserInfo from '@/components/UserInfo'
import React, { useEffect, useMemo, useState } from 'react'
import userService from '../services/user'
import { useLocation, useParams } from 'react-router-dom'
import useFetch from '@/hooks/useFetch'
import Test from '@/components/Test'

export default function User (props) {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const { data, loading, error } = useFetch(`http://localhost:3003/api/users/${userId}`)
  console.log('data', data)

  return (
    <div className='flex items-center justify-center'>
        {/* <UserInfo user={data} loading={loading} error={error} /> */}
        {
          loading
            ? <p>Loading...</p>
            : error
              ? <p>Error: {error}</p>
              : <UserInfo user={data} />
        }
    </div>
  )
}
