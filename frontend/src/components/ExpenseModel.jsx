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
    <div className='fixed inset-0 bg-slate-950/60 flex justify-center items-center z-50 px-4 backdrop-blur-md'>
      <div className='glass-panel w-full max-w-md p-8 rounded-[24px] relative overflow-hidden'>
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9996B]/20 rounded-full blur-[40px] pointer-events-none" />

        <div className='flex justify-between items-center mb-8 relative z-10'>
          <h2 className='text-3xl font-extrabold text-[#F3E4C9] text-center w-full tracking-tight'>Add Expense</h2>
          <button className='text-[#F3E4C9]/60 absolute right-0 top-0 hover:text-[#F3E4C9] text-2xl transition-colors' onClick={handleClose} type='button'>✕</button>
        </div>

        <form className='flex flex-col gap-5 relative z-10' onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#F3E4C9]/90 ml-1">Description</label>
            <input
              type='text'
              placeholder='What was this for?'
              className='w-full bg-[#EDE9E6] border border-[#d2b48c] rounded-xl px-4 py-3 text-[#5C4F4A] placeholder:text-[#5C4F4A]/50 focus:outline-none transition-all neon-border'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#F3E4C9]/90 ml-1">Amount</label>
            <div className='relative'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[#5C4F4A]/70 font-bold'>₹</span>
              <input
                type='number'
                placeholder='0.00'
                className='w-full bg-[#EDE9E6] border border-[#d2b48c] rounded-xl pl-8 pr-4 py-3 text-[#5C4F4A] placeholder:text-[#5C4F4A]/50 focus:outline-none transition-all neon-border font-mono'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min='0'
                step='0.01'
              />
            </div>
          </div>
          
          {error ? <p className='text-sm text-rose-400 font-medium bg-rose-500/10 p-2 rounded-lg border border-rose-500/20'>{error}</p> : null}

          <div className='flex gap-4 mt-4'>
            <button
              className='w-1/2 glass-panel py-3.5 rounded-xl font-bold text-[#F3E4C9]/80 hover:text-[#F3E4C9] hover:bg-white/5 transition-colors'
              onClick={handleClose}
              type='button'
            >
              Cancel
            </button>
            <button
              className='w-1/2 bg-[#C9996B] hover:brightness-105 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(201,153,107,0.3)] hover:shadow-[0_0_30px_rgba(201,153,107,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0'
              disabled={submitting}
              type='submit'
            >
              {submitting ? 'Saving...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExpenseModel
