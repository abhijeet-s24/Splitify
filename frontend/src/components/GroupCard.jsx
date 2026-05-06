import React from 'react'
import { useNavigate } from 'react-router-dom'

function GroupCard({ group }) {
  const navigate = useNavigate()

  return (
    <div className='bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100'>
      <h2 className='text-xl font-bold text-indigo-600 mb-2'>{group.name}</h2>
      <p className='text-gray-500 text-sm mb-3'>Invite Code: {group.inviteCode}</p>
      <div className='mb-4'>
        <p className='text-gray-600 text-sm font-medium'>Created on {new Date(group.createdAt).toLocaleDateString()}</p>
      </div>
      <div className='border-t pt-3 flex justify-between items-center'>
        <span className='text-sm text-gray-500'>Open group details</span>
        <button
          className='text-indigo-600 font-medium hover:underline'
          onClick={() => navigate(`/groups/${group._id}`)}
          type='button'
        >
          Open →
        </button>
      </div>
    </div>
  )
}

export default GroupCard
