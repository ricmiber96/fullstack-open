import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Link } from 'react-router-dom'

export default function UsersTable ({ users }) {
  return (
    <div className='flex flex-col w-1/2 mt-10 gap-4'>
        <h3 className='text-3xl mb-4'>Table of users</h3>
   <Table>
        <TableHeader>
        <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Blogs created</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {users.map(user => (
            <TableRow key={user.id}>
            <TableCell>
            <Link className='underline underline-offset-1' to={`/users/${user.id}`}>
                {user.name}
            </Link>
            </TableCell>
            <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    </div>
  )
}
