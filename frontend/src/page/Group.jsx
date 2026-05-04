import React from 'react'

function Group() {
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
        <div className='bg-white p-6 rounded-xl shadow mb-6 flex justify-between items-center'>
            <div>
                <h1 className='text-3xl font-bold text-indigo-600'>Manali Trip</h1>
                <p className="text-gray-500 mt-2">
                    Invite Code: <span className="font-semibold">MANALI123</span>
                </p>
            </div>
            <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700'>Copy Code</button>
        </div>
        <div className='grid md:grid-cols-2 gap-6 mb-6'>
            <div className='bg-white p-6 rounded-xl shadow'>
                <h2 className='text-xl font-bold mb-4'>Members</h2>
                <ul className='space-y-3'>
                    <li className='flex justify-between border-b pb-2'>
                        <span>Abhijeet</span>
                        <span className='text-indigo-600 font-semibold'>(You)</span>
                    </li>
                    <li className="border-b pb-2">Utkarsh</li>
                    <li className="border-b pb-2">Abhimanyu</li>
                    <li className="border-b pb-2">Priya</li>
                </ul>
            </div>

            <div className='grid md:grid-cols-2 gap-6 mb-6'>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <h2 className='text-xl font-bold mb-4'>Add Expenses</h2>
                    <input 
                        type="text"
                        placeholder='Description'
                        className='w-full border p-3 rounded mb-4'
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full border p-3 rounded mb-4"
                    />
                    <button className='w-full bg-green-600 text-white py-3 rounded hover:bg-green-700'>Add Expenses</button> 
                </div>
            </div>

            <div className='bg-white p-6 rounded-xl shadow'>
                <h2 className='text-xl font-bold mb-4'>Settlements</h2>
                <div className='mb-6'>
                    <h3 className='text-red-500 font-bold mb-3'>You Owe</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between bg-red-50 p-3 rounded">
                            <span>Utkarsh</span>
                            <span>₹300</span>
                        </div>

                        <div className="flex justify-between bg-red-50 p-3 rounded">
                            <span>Priya</span>
                            <span>₹150</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-green-600 font-bold mb-3">You Get</h3>

                    <div className="space-y-2">
                    <div className="flex justify-between bg-green-50 p-3 rounded">
                        <span>Abhimanyu</span>
                        <span>₹400</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Group

