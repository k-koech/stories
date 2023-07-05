import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (

<footer className="p-10 bg-gray-200 rounded-lg shadow dark:bg-gray-800">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">wattpad</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <Link to="/login" className="mr-4 hover:underline md:mr-6 "> Login</Link>
        <Link to="/register" className="mr-4 hover:underline md:mr-6 "> Register</Link>
    </ul>
    </div>
</footer>

  )
}
