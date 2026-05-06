import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ isAuthenticated, user, onLogout }) {
  const location = useLocation()
  const isGroupPage = location.pathname.startsWith('/groups/')

  return (
    <nav className='bg-white shadow-md px-6 py-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
      <div>
        <Link to='/' className='text-2xl font-bold text-indigo-600'>Splitify</Link>
        {isAuthenticated && user ? (
          <p className='text-sm text-gray-500 mt-1'>Signed in as {user.name}</p>
        ) : null}
      </div>

      <div className='flex items-center gap-4 flex-wrap'>
        <Link className='text-gray-700 hover:text-indigo-600 font-medium' to='/'>
          Home
        </Link>
        {isGroupPage ? (
          <span className='text-indigo-600 font-medium'>Current Group</span>
        ) : null}
        {isAuthenticated ? (
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'
            onClick={onLogout}
            type='button'
          >
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  )
}

export default Navbar
