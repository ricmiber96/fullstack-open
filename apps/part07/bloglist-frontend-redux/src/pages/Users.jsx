import UsersTable from '@/components/UsersTable'
import userService from '../services/user'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Users (props) {
  const user = useSelector((state) => state.auth.user)
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAllUsers().then(data => {
      setUsers(data.filter(u => u.username !== user.username))
      setUsers(data)
    })
  }, [])

  return (
    <div className='flex items-center justify-center'>
        <UsersTable users={users} />
    </div>
  )
}
