import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        
<footer class="rounded-lg shadow m-4 bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm  sm:text-center text-gray-400">
        &copy; {currentYear} Your App Name. All rights reserved.
        </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium  text-gray-400 sm:mt-0">
        <li>
            <Link to={'/blogs'} href="#" class="hover:underline me-4 md:me-6">Blogs</Link>
        </li>
        <li>
            <Link to={'/users'} href="#" class="hover:underline me-4 md:me-6">Users</Link>
        </li>
    </ul>
    </div>
</footer>
    );
}

