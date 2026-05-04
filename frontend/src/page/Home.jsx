import React from 'react'

function Home() {
  return (
    <div className='min-h-screen bg-grey-100 p-6'>
        <div className='flex justify-between items-center mb-8'>
            <h1 className='text-3xl font-bold text-indigo-600'>Splitwise Dashboard</h1>
            <button className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'>LogOut</button>
        </div>

        <div className='grid md:grid-cols-2 gap-6 mb-10'>
            <div className='bg-white p-6 rounded-xl shadow'>
                <h2 className='text-xl font-semibold mb-4'>Create Group</h2>
                <input
                type='text'
                placeholder='Enter group name'
                className='w-full border p-3 rounded mb-4'
                />
                <button className='w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700'>Create group</button>
            </div>

            <div className='bg-white p-6 rounded-xl shadow'>
                <h2 className='text-xl font-semibold mb-4'>Join Group</h2>
                <input 
                type="text" 
                placeholder='Enter invite code'
                className='w-full border p-3 rounded mb-4'
                />
                <button className='w-full bg-green-600 text-white py-3 rounded hover:bg-green-700'>Join group</button>
            </div>
        </div>

        <div>
            <h2 className='text-2xl font-bold mb-5'>Your Groups</h2>
            <div className='grid md:grid-cols-3 gap-5'>
                <div className='bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition'>
                    <h3 className='text-xl font-semibold text-indigo-600'>Manali Trip</h3> 
                    <p className='text-sm text-gray-500 mt-2'>Members: 4</p>
                    <p className='text-sm text-gray-400 mt-2'>Click to open your Group→</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition">
                    <h3 className="text-xl font-semibold text-indigo-600">Flat Expenses</h3>
                    <p className="text-sm text-gray-500 mt-2">Members: 3</p>
                    <p className="text-sm mt-2 text-gray-400">Click to open group</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition">
                    <h3 className="text-xl font-semibold text-indigo-600">College Project</h3>
                    <p className="text-sm text-gray-500 mt-2">Members: 5</p>
                    <p className="text-sm mt-2 text-gray-400">Click to open group →</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home