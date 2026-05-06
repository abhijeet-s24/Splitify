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
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-10 h-10 border-4 border-[#C9996B]/30 border-t-[#C9996B] rounded-full animate-spin'></div>
      </div>
    )
  }

  if (!groupData?.group) {
    return (
      <div className='min-h-screen p-6 max-w-7xl mx-auto flex items-center justify-center'>
        <div className='glass-panel p-8 rounded-2xl text-center border-rose-500/30'>
          <p className='text-rose-400 font-bold text-xl'>{error || 'Group not found.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <ExpenseModel
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSubmit={handleExpenseSubmit}
        submitting={submittingExpense}
      />

      <div className='glass-panel p-8 rounded-3xl mb-8 relative overflow-hidden'>
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9996B]/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className='relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6'>
          <div>
            <h1 className='text-4xl font-extrabold text-[#F3E4C9] mb-3 tracking-tight'>{groupData.group.name}</h1>
            <div className='flex flex-wrap items-center gap-4 text-sm font-medium'>
              <div className='flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-lg border border-[#d2b48c23]'>
                <span className='text-[#F3E4C9]/70 uppercase tracking-wider text-xs'>Invite Code</span>
                <span className='text-[#F3E4C9] font-mono tracking-widest text-base font-bold'>{groupData.group.inviteCode}</span>
              </div>
              <div className='flex items-center gap-4 text-[#F3E4C9]/80'>
                <span className='flex items-center gap-1.5'>
                  <span className='w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'></span>
                  {groupData.memberCount} Members
                </span>
                <span className='text-[#F3E4C9]/40'>•</span>
                <span className='flex items-center gap-1.5'>
                  <span className='w-2 h-2 rounded-full bg-[#C9996B] shadow-[0_0_8px_rgba(201,153,107,0.8)]'></span>
                  {groupData.expenseCount} Expenses
                </span>
              </div>
            </div>
          </div>
          
          <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
            <button
              className='glass-panel px-5 py-2.5 rounded-xl font-bold text-[#F3E4C9]/90 hover:text-[#F3E4C9] hover:border-[#F3E4C9]/30 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center'
              onClick={handleCopyCode}
              type='button'
            >
              Copy Code
            </button>
            <button
              className='bg-[#C9996B] hover:brightness-105 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(201,153,107,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto text-center'
              onClick={() => setIsExpenseModalOpen(true)}
              type='button'
            >
              + Add Expense
            </button>
          </div>
        </div>
      </div>

      {message ? (
        <div className='mb-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-4 text-emerald-600 font-bold backdrop-blur-md shadow-lg'>
          {message}
        </div>
      ) : null}

      {error ? (
        <div className='mb-8 rounded-xl bg-rose-500/10 border border-rose-500/20 px-5 py-4 text-rose-600 font-bold backdrop-blur-md shadow-lg'>
          {error}
        </div>
      ) : null}

      <div className='grid lg:grid-cols-3 gap-6'>
        {/* Members Column */}
        <div className='glass-panel p-6 rounded-3xl h-fit'>
          <h2 className='text-xl font-bold mb-6 text-[#F3E4C9] tracking-tight flex items-center gap-2'>
            <span className='text-xl'>👥</span> Members
          </h2>
          <ul className='space-y-1'>
            {members.map((member) => (
              <li className='flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors group' key={member.userId}>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full bg-black/20 border border-[#d2b48c23] flex items-center justify-center text-xs font-bold text-[#F3E4C9]/90 group-hover:border-[#C9996B]/50 transition-colors'>
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <span className='font-medium text-[#F3E4C9]/90 group-hover:text-[#F3E4C9] transition-colors'>{member.name}</span>
                </div>
                <span className='text-xs font-semibold px-2 py-1 rounded bg-black/20 text-[#F3E4C9]/60 border border-[#d2b48c23]'>
                  {member.userId === user?._id ? 'You' : member.role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expenses Column */}
        <div className='glass-panel p-6 rounded-3xl h-fit'>
          <h2 className='text-xl font-bold mb-6 text-[#F3E4C9] tracking-tight flex items-center gap-2'>
            <span className='text-xl'>💸</span> Recent Expenses
          </h2>
          <div className='space-y-3'>
            {expenses.length === 0 ? (
              <div className='text-center p-6 border border-dashed border-[#d2b48c23] rounded-2xl'>
                <p className='text-[#F3E4C9]/70 font-medium'>No expenses added yet.</p>
              </div>
            ) : (
              expenses.map((expense) => (
                <div className='bg-black/10 border border-[#d2b48c23] rounded-2xl p-4 hover:border-[#C9996B]/50 transition-colors group' key={expense._id}>
                  <div className='flex justify-between gap-4'>
                    <div>
                      <p className='font-bold text-[#F3E4C9]/90 group-hover:text-[#F3E4C9] transition-colors'>{expense.description}</p>
                      <p className='text-xs font-medium text-[#F3E4C9]/60 mt-1.5'>Paid by <span className='text-[#F3E4C9]/80'>{expense.paidBy?.name || 'Unknown'}</span></p>
                    </div>
                    <div className='text-right'>
                      <p className='font-extrabold text-[#C9996B] text-lg'>₹{expense.amount}</p>
                      <p className='text-[10px] uppercase tracking-wider font-semibold text-[#F3E4C9]/50 mt-1'>{new Date(expense.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Settlements Column */}
        <div className='glass-panel p-6 rounded-3xl h-fit'>
          <h2 className='text-xl font-bold mb-6 text-[#F3E4C9] tracking-tight flex items-center gap-2'>
            <span className='text-xl'>⚖️</span> Settlements
          </h2>
          
          <div className='mb-8'>
            <h3 className='text-xs font-bold uppercase tracking-widest text-red-400 mb-3 ml-1'>You Owe</h3>
            <div className='space-y-2'>
              {currentUserSettlements.youOwe.length === 0 ? (
                <div className='bg-red-900/10 border border-red-500/10 p-4 rounded-2xl text-red-300/60 text-sm font-medium text-center'>
                  You're all settled up!
                </div>
              ) : (
                currentUserSettlements.youOwe.map((settlement, index) => (
                  <div className='flex justify-between items-center bg-red-900/20 border border-red-500/20 p-4 rounded-2xl group hover:bg-red-900/30 transition-colors' key={`${settlement.to?.id}-${index}`}>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-red-950/50 border border-red-800 flex items-center justify-center text-xs font-bold text-red-400'>
                        {settlement.to?.name.charAt(0).toUpperCase()}
                      </div>
                      <span className='font-bold text-red-200'>{settlement.to?.name}</span>
                    </div>
                    <span className='font-extrabold text-red-400'>₹{settlement.amount}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div>
            <h3 className='text-xs font-bold uppercase tracking-widest text-[#87ae73] mb-3 ml-1'>You Get</h3>
            <div className='space-y-2'>
              {currentUserSettlements.youGet.length === 0 ? (
                <div className='bg-[#87ae73]/10 border border-[#87ae73]/10 p-4 rounded-2xl text-[#87ae73]/60 text-sm font-medium text-center'>
                  No one owes you right now.
                </div>
              ) : (
                currentUserSettlements.youGet.map((settlement, index) => (
                  <div className='flex justify-between items-center bg-[#87ae73]/10 border border-[#87ae73]/20 p-4 rounded-2xl group hover:bg-[#87ae73]/20 transition-colors' key={`${settlement.from?.id}-${index}`}>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-[#87ae73]/20 border border-[#87ae73]/40 flex items-center justify-center text-xs font-bold text-[#87ae73]'>
                        {settlement.from?.name.charAt(0).toUpperCase()}
                      </div>
                      <span className='font-bold text-[#87ae73]'>{settlement.from?.name}</span>
                    </div>
                    <span className='font-extrabold text-[#87ae73]'>₹{settlement.amount}</span>
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
