import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ isAuthenticated, user, onLogout }) {
  const location = useLocation()
  const isGroupPage = location.pathname.startsWith('/groups/')

  return (
    <div className='px-6 pt-6 pb-2 sticky top-0 z-40'>
      <nav className='glass-panel px-6 py-4 rounded-2xl flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
        <div>
          <Link to='/' className='text-3xl font-extrabold text-[#C9996B] tracking-tight'>
            Splitify
          </Link>
          {isAuthenticated && user ? (
            <p className='text-sm text-[#F3E4C9]/70 mt-0.5 font-medium'>Signed in as <span className='text-[#F3E4C9]'>{user.name}</span></p>
          ) : null}
        </div>

        <div className='flex items-center gap-6 flex-wrap'>
          <Link className='text-[#F3E4C9]/70 hover:text-[#F3E4C9] font-medium transition-colors' to='/'>
            Dashboard
          </Link>
          {isGroupPage ? (
            <span className='text-[#C9996B] font-semibold text-glow'>Current Group</span>
          ) : null}
          {isAuthenticated ? (
            <button
              className='bg-rose-500/10 text-rose-400 border border-rose-500/20 px-5 py-2 rounded-xl font-bold hover:bg-rose-500 hover:text-white transition-all duration-300'
              onClick={onLogout}
              type='button'
            >
              Logout
            </button>
          ) : null}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
