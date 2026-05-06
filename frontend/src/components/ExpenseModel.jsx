import React, { useState } from 'react'

function ExpenseModel({ isOpen, onClose, onSubmit, submitting }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmedDescription = description.trim()
    const numericAmount = Number(amount)

    if (!trimmedDescription) {
      setError('Description is required.')
      return
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Enter a valid amount greater than 0.')
      return
    }

    setError('')

    try {
      await onSubmit({
        description: trimmedDescription,
        amount: numericAmount,
      })
      setDescription('')
      setAmount('')
    } catch {
      // Keep user input in place when API fails.
    }
  }

  const handleClose = () => {
    setDescription('')
    setAmount('')
    setError('')
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4'>
      <div className='bg-white w-full max-w-md p-6 rounded-2xl shadow-xl'>
        <div className='flex justify-between items-center mb-5'>
          <h2 className='text-2xl font-bold text-indigo-600'>Add Expense</h2>
          <button className='text-gray-500 text-xl hover:text-red-500' onClick={handleClose} type='button'>✕</button>
        </div>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter Description'
            className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type='number'
            placeholder='Amount'
            className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min='0'
            step='0.01'
          />
          {error ? <p className='text-sm text-red-600'>{error}</p> : null}

          <div className='flex gap-3 mt-6'>
            <button className='w-1/2 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300' onClick={handleClose} type='button'>
              Cancel
            </button>
            <button className='w-1/2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-60' disabled={submitting} type='submit'>
              {submitting ? 'Saving...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExpenseModel
