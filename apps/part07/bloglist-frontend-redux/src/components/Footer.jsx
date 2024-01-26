import { Link } from 'react-router-dom'

export default function Footer () {
  const currentYear = new Date().getFullYear()
  return (

<footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full">
    <div className="w-full relative mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm  sm:text-center text-gray-400">
        &copy; {currentYear} Your App Name. All rights reserved.
        </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium  text-gray-400 sm:mt-0">
        <li>
            <Link to={'/blogs'} href="#" className="hover:underline me-4 md:me-6">Blogs</Link>
        </li>
        <li>
            <Link to={'/users'} href="#" className="hover:underline me-4 md:me-6">Users</Link>
        </li>
    </ul>
    </div>
    </footer>
  )
}
