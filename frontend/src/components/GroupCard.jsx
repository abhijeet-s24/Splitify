import React from 'react'

function GroupCard() {
  return (
    <div className='bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100'>
        <h2 className='text-xl font-bold text-indigo-600 mb-2"'>Manali Trip</h2>
        <p className='text-gray-500 text-sm mb-3'>4 Members</p>
        <div className='mb-4'>
            <p className='text-red-500 text-sm font-medium'>You owe ₹300</p>
            <p className="text-green-600 text-sm font-medium">You get ₹150</p>
        </div>
        <div className='border-t pt-3 flex justify-between items-center'>
            <span className='text-sm text-gray-40'>INVITE CODE: MANALI123</span>
            <button className='text-indigo-600 font-medium hover:underline'>Open →</button>
        </div>
    </div>
  )
}

export default GroupCard