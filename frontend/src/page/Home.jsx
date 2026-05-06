import React, { useEffect, useState } from 'react'
import GroupCard from '../components/GroupCard'
import GroupActionModal from '../components/GroupActionModal'

function Home({ apiRequest, user }) {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [modalConfig, setModalConfig] = useState({ isOpen: false, mode: 'create' })

  const loadGroups = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await apiRequest('/groups')
      setGroups(response.data || [])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGroups()
  }, [])

  const handleModalSubmit = async (inputValue) => {
    setSubmitting(true)
    setError('')
    setMessage('')

    try {
      if (modalConfig.mode === 'create') {
        await apiRequest('/groups', {
          method: 'POST',
          body: JSON.stringify({ name: inputValue.trim() }),
        })
        setMessage('Group created successfully.')
      } else {
        const response = await apiRequest('/groups/join', {
          method: 'POST',
          body: JSON.stringify({ inviteCode: inputValue.trim().toUpperCase() }),
        })
        setMessage(response.message || 'Joined group successfully.')
      }
      setModalConfig({ ...modalConfig, isOpen: false })
      await loadGroups()
    } catch (requestError) {
      setError(requestError.message)
      throw requestError
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <GroupActionModal
        isOpen={modalConfig.isOpen}
        mode={modalConfig.mode}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onSubmit={handleModalSubmit}
        submitting={submitting}
        initialError={error}
      />

      <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12 mt-4'>
        <div>
          <h1 className='text-4xl font-extrabold text-[#5C4F4A] tracking-tight mb-2'>Dashboard</h1>
          <p className='text-[#5C4F4A]/80 font-medium'>Manage your expenses and groups efficiently.</p>
        </div>
        <div className='flex gap-4'>
          <button
            className='glass-panel px-6 py-3 rounded-xl font-bold text-[#F3E4C9] hover:text-white hover:border-[#F3E4C9]/30 transition-all duration-300'
            onClick={() => { setError(''); setModalConfig({ isOpen: true, mode: 'join' }); }}
            type='button'
          >
            Join Group
          </button>
          <button
            className='bg-[#C9996B] hover:brightness-105 text-white px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(201,153,107,0.4)] transition-all duration-300 transform hover:-translate-y-0.5'
            onClick={() => { setError(''); setModalConfig({ isOpen: true, mode: 'create' }); }}
            type='button'
          >
            + Create Group
          </button>
        </div>
      </div>

      {message ? (
        <div className='mb-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-4 text-emerald-600 font-bold backdrop-blur-md shadow-lg'>
          {message}
        </div>
      ) : null}

      {error && !modalConfig.isOpen ? (
        <div className='mb-8 rounded-xl bg-rose-500/10 border border-rose-500/20 px-5 py-4 text-rose-600 font-bold backdrop-blur-md shadow-lg'>
          {error}
        </div>
      ) : null}

      <div>
        <h2 className='text-2xl font-bold mb-6 text-[#5C4F4A] tracking-tight flex items-center gap-3'>
          Your Groups
          <span className='px-3 py-1 text-xs font-bold bg-[#5C4F4A]/10 text-[#5C4F4A] rounded-full border border-[#5C4F4A]/20'>
            {groups.length}
          </span>
        </h2>

        {loading ? (
          <div className='flex items-center justify-center p-12'>
            <div className='w-8 h-8 border-4 border-[#C9996B]/30 border-t-[#C9996B] rounded-full animate-spin'></div>
          </div>
        ) : null}

        {!loading && groups.length === 0 ? (
          <div className='glass-panel p-10 rounded-3xl text-center border-dashed border-2 border-[#5C4F4A]/30 hover:border-[#C9996B]/50 transition-colors'>
            <div className='w-16 h-16 bg-[#F3E4C9]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#5C4F4A]/20'>
              <span className='text-2xl'>👥</span>
            </div>
            <h3 className='text-xl font-bold text-[#F3E4C9] mb-2'>No groups yet</h3>
            <p className='text-[#F3E4C9]/70 max-w-md mx-auto'>Create a new group or join an existing one using an invite code to start splitting expenses.</p>
          </div>
        ) : null}

        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {groups.map((group) => (
            <GroupCard key={group._id} group={group} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
