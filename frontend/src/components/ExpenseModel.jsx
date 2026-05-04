import React from 'react'

function ExpenseModel() {
  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
        <div className='bg-white w-full max-w-md p-6 rounded-2xl shadow-xl'>
            <div className='flex justify-between items-center mb-5'>
                <h2 className='text-2xl font-bold text-indigo-600'>Add Expense</h2>
                <button className='text-gray-500 text-xl hover:text-red-500'>✕</button>
            </div>
            <div className='space-y-4'>
                <input 
                type="text"
                placeholder='Enter Description'
                className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <input 
                type="text" 
                placeholder='Amount'
                className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <select className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                    <option>Paid By</option>
                    <option>Abhijeet</option>
                    <option>Abhimanyu</option>
                    <option>Utkarsh</option>
                </select>
                <select className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                    <option>Split Equally</option>
                    <option>Custom Split</option>
                </select>
            </div>
            <div className='flex gap-3 mt-6'>
                <button className='w-1/2 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300'>Cancel</button>
                <button className='w-1/2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700'>Add Expense</button>
            </div>
        </div>
    </div>
  )
}

export default ExpenseModel