import React from 'react'

function Navbar() {
  return (
    <div>
        <nav className='bg-white shadow-md px-6 py-4 flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-indigo-600'>Splitify</h1>
            <div className='flex items-center gap-6'>
                <button className='text-gray-700 hover:text-indigo-600 font-medium'>Home</button>
                <button className='text-gray-700 hover:text-indigo-600 font-medium'>Group</button>
                <button className='text-gray-700 hover:text-indigo-600 font-medium'>Profile</button>
                <button className='text-gray-700 hover:text-indigo-600 font-medium'>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar