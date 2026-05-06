import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExpenseModel from '../components/ExpenseModel'

function Group({ apiRequest, user }) {
  const { groupId } = useParams()
  const [groupData, setGroupData] = useState(null)
  const [members, setMembers] = useState([])
  const [expenses, setExpenses] = useState([])
  const [settlements, setSettlements] = useState([])
  const [loading, setLoading] = useState(true)
  const [submittingExpense, setSubmittingExpense] = useState(false)
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const loadGroupData = async () => {
    setLoading(true)
    setError('')

    try {
      const [groupResponse, membersResponse, expensesResponse, settlementsResponse] = await Promise.all([
        apiRequest(`/groups/${groupId}`),
        apiRequest(`/groups/${groupId}/members`),
        apiRequest(`/groups/${groupId}/expenses`),
        apiRequest(`/groups/${groupId}/settlements`),
      ])

      setGroupData(groupResponse.data)
      setMembers(membersResponse.data || [])
      setExpenses(expensesResponse.data || [])
      setSettlements(settlementsResponse.data?.settlements || [])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGroupData()
  }, [groupId])

  const handleCopyCode = async () => {
    if (!groupData?.group?.inviteCode) {
      return
    }

    try {
      await navigator.clipboard.writeText(groupData.group.inviteCode)
      setMessage('Invite code copied.')
    } catch {
      setMessage('Could not copy invite code.')
    }
  }

  const handleExpenseSubmit = async ({ description, amount }) => {
    const trimmedDescription = description.trim()
    const numericAmount = Number(amount)

    if (!trimmedDescription) {
      const validationError = new Error('Description is required.')
      setError(validationError.message)
      throw validationError
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      const validationError = new Error('Amount must be a positive number.')
      setError(validationError.message)
      throw validationError
    }

    setSubmittingExpense(true)
    setError('')
    setMessage('')

    try {
      await apiRequest('/expenses', {
        method: 'POST',
        body: JSON.stringify({
          groupId,
          description: trimmedDescription,
          amount: numericAmount,
        }),
      })

      setIsExpenseModalOpen(false)
      setMessage('Expense added successfully.')
      await loadGroupData()
    } catch (requestError) {
      setError(requestError.message)
      throw requestError
    } finally {
      setSubmittingExpense(false)
    }
  }

  const currentUserSettlements = settlements.reduce(
    (accumulator, settlement) => {
      if (settlement.from?.id === user?._id) {
        accumulator.youOwe.push(settlement)
      }

      if (settlement.to?.id === user?._id) {
        accumulator.youGet.push(settlement)
      }

      return accumulator
    },
    { youOwe: [], youGet: [] }
  )

  if (loading) {
    return <div className='min-h-screen bg-gray-100 p-6 text-gray-600'>Loading group...</div>
  }

  if (!groupData?.group) {
    return <div className='min-h-screen bg-gray-100 p-6 text-red-600'>{error || 'Group not found.'}</div>
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <ExpenseModel
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSubmit={handleExpenseSubmit}
        submitting={submittingExpense}
      />

      <div className='bg-white p-6 rounded-xl shadow mb-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
        <div>
          <h1 className='text-3xl font-bold text-indigo-600'>{groupData.group.name}</h1>
          <p className='text-gray-500 mt-2'>
            Invite Code: <span className='font-semibold'>{groupData.group.inviteCode}</span>
          </p>
          <p className='text-gray-500 mt-2'>
            Members: <span className='font-semibold'>{groupData.memberCount}</span> | Expenses: <span className='font-semibold'>{groupData.expenseCount}</span>
          </p>
        </div>
        <div className='flex gap-3'>
          <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700' onClick={handleCopyCode} type='button'>Copy Code</button>
          <button className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700' onClick={() => setIsExpenseModalOpen(true)} type='button'>Add Expense</button>
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

      <div className='grid lg:grid-cols-3 gap-6 mb-6'>
        <div className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-xl font-bold mb-4'>Members</h2>
          <ul className='space-y-3'>
            {members.map((member) => (
              <li className='flex justify-between border-b pb-2' key={member.userId}>
                <span>{member.name}</span>
                <span className='text-sm text-gray-500'>
                  {member.userId === user?._id ? '(You)' : member.role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-xl font-bold mb-4'>Recent Expenses</h2>
          <div className='space-y-3'>
            {expenses.length === 0 ? (
              <p className='text-gray-500'>No expenses added yet.</p>
            ) : (
              expenses.map((expense) => (
                <div className='border rounded-lg p-4' key={expense._id}>
                  <div className='flex justify-between gap-4'>
                    <div>
                      <p className='font-semibold text-gray-800'>{expense.description}</p>
                      <p className='text-sm text-gray-500 mt-1'>Paid by {expense.paidBy?.name || 'Unknown'}</p>
                    </div>
                    <div className='text-right'>
                      <p className='font-bold text-indigo-600'>₹{expense.amount}</p>
                      <p className='text-xs text-gray-400 mt-1'>{new Date(expense.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-xl font-bold mb-4'>Settlements</h2>
          <div className='mb-6'>
            <h3 className='text-red-500 font-bold mb-3'>You Owe</h3>
            <div className='space-y-2'>
              {currentUserSettlements.youOwe.length === 0 ? (
                <div className='bg-red-50 p-3 rounded text-red-500'>Nothing owed right now.</div>
              ) : (
                currentUserSettlements.youOwe.map((settlement, index) => (
                  <div className='flex justify-between bg-red-50 p-3 rounded' key={`${settlement.to?.id}-${index}`}>
                    <span>{settlement.to?.name}</span>
                    <span>₹{settlement.amount}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div>
            <h3 className='text-green-600 font-bold mb-3'>You Get</h3>
            <div className='space-y-2'>
              {currentUserSettlements.youGet.length === 0 ? (
                <div className='bg-green-50 p-3 rounded text-green-600'>No one owes you right now.</div>
              ) : (
                currentUserSettlements.youGet.map((settlement, index) => (
                  <div className='flex justify-between bg-green-50 p-3 rounded' key={`${settlement.from?.id}-${index}`}>
                    <span>{settlement.from?.name}</span>
                    <span>₹{settlement.amount}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Group
