import React, { useEffect, useState } from 'react'
import GroupCard from '../components/GroupCard'

function Home({ apiRequest, user }) {
  const [groupName, setGroupName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

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

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      setError('Group name is required.');
      setMessage('');
      return;
    }

    setSubmitting(true)
    setError('')
    setMessage('')

    try {
      await apiRequest('/groups', {
        method: 'POST',
        body: JSON.stringify({
          name: groupName.trim(),
        }),
      })
      setGroupName('')
      setMessage('Group created successfully.')
      await loadGroups()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleJoinGroup = async () => {
    if (!inviteCode.trim()) {
      setError('Invite code is required.');
      setMessage('');
      return;
    }

    setSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await apiRequest('/groups/join', {
        method: 'POST',
        body: JSON.stringify({
          inviteCode: inviteCode.trim().toUpperCase(),
        }),
      })
      setInviteCode('')
      setMessage(response.message || 'Joined group successfully.')
      await loadGroups()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-indigo-600'>Splitify Dashboard</h1>
          <p className='text-gray-600 mt-2'>Welcome, {user?.name}</p>
        </div>
      </div>

      {message ? (
        <div className='mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700'>
          {message}
        </div>
      ) : null}

      {error ? (
        <div className='mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700'>
          {error}
        </div>
      ) : null}

      <div className='grid md:grid-cols-2 gap-6 mb-10'>
        <div className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-xl font-semibold mb-4'>Create Group</h2>
          <input
            type='text'
            placeholder='Enter group name'
            className='w-full border p-3 rounded mb-4'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button
            className='w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 disabled:opacity-60'
            disabled={submitting}
            onClick={handleCreateGroup}
            type='button'
          >
            {submitting ? 'Working...' : 'Create group'}
          </button>
        </div>

        <div className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-xl font-semibold mb-4'>Join Group</h2>
          <input
            type='text'
            placeholder='Enter invite code'
            className='w-full border p-3 rounded mb-4'
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
          <button
            className='w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-60'
            disabled={submitting}
            onClick={handleJoinGroup}
            type='button'
          >
            {submitting ? 'Working...' : 'Join group'}
          </button>
        </div>
      </div>

      <div>
        <h2 className='text-2xl font-bold mb-5'>Your Groups</h2>

        {loading ? <p className='text-gray-500'>Loading groups...</p> : null}

        {!loading && groups.length === 0 ? (
          <div className='bg-white p-5 rounded-xl shadow text-gray-500'>
            No groups yet. Create one or join with an invite code.
          </div>
        ) : null}

        <div className='grid md:grid-cols-3 gap-5'>
          {groups.map((group) => (
            <GroupCard key={group._id} group={group} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
