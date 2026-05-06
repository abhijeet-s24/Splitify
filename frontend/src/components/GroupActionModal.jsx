import React, { useState, useEffect } from 'react'

function GroupActionModal({ isOpen, onClose, mode, onSubmit, submitting, initialError }) {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setInputValue('')
      setError(initialError || '')
    }
  }, [isOpen, mode, initialError])

  useEffect(() => {
    setError(initialError || '')
  }, [initialError])

  if (!isOpen) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) {
      setError(mode === 'create' ? 'Group name is required.' : 'Invite code is required.')
      return
    }
    setError('')
    try {
      await onSubmit(inputValue)
    } catch (err) {
      setError(err.message || 'An error occurred.')
    }
  }

  const handleClose = () => {
    setInputValue('')
    setError('')
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-slate-950/60 flex justify-center items-center z-50 px-4 backdrop-blur-md'>
      <div className='glass-panel w-full max-w-sm p-8 rounded-[24px] relative overflow-hidden'>
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9996B]/20 rounded-full blur-[40px] pointer-events-none" />

        <div className='flex justify-between items-center mb-8 relative z-10'>
          <h2 className='text-3xl font-extrabold text-[#F3E4C9] text-center w-full tracking-tight'>
            {mode === 'create' ? 'Create Group' : 'Join Group'}
          </h2>
          <button className='text-[#F3E4C9]/60 absolute right-0 top-0 hover:text-[#F3E4C9] text-2xl transition-colors' onClick={handleClose} type='button'>✕</button>
        </div>

        <form className='flex flex-col gap-5 relative z-10' onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <label className='text-sm font-semibold text-[#F3E4C9]/90 ml-1'>
              {mode === 'create' ? 'Group Name' : 'Invite Code'}
            </label>
            <input
              type='text'
              placeholder={mode === 'create' ? 'E.g., Goa Trip 2026' : 'Enter 6-digit code'}
              className='w-full bg-[#EDE9E6] border border-[#d2b48c] rounded-xl px-4 py-3 text-[#5C4F4A] placeholder:text-[#5C4F4A]/50 focus:outline-none transition-all neon-border'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          {error ? <p className='text-sm text-rose-400 font-medium bg-rose-500/10 p-2 rounded-lg border border-rose-500/20'>{error}</p> : null}

          <div className='flex flex-col gap-3 mt-4'>
            <button
              className='w-full bg-[#C9996B] hover:brightness-105 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(201,153,107,0.3)] hover:shadow-[0_0_30px_rgba(201,153,107,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0'
              disabled={submitting}
              type='submit'
            >
              {submitting ? 'Working...' : mode === 'create' ? 'Create Group' : 'Join Group'}
            </button>
            <button
              className='w-full glass-panel py-3.5 rounded-xl font-bold text-[#F3E4C9]/80 hover:text-[#F3E4C9] hover:bg-white/5 transition-colors'
              onClick={handleClose}
              type='button'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GroupActionModal
