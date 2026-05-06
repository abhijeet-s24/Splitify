import React from 'react'
import { useNavigate } from 'react-router-dom'

function GroupCard({ group }) {
  const navigate = useNavigate()

  return (
    <div 
      className='glass-panel glass-panel-hover p-6 rounded-2xl cursor-pointer group flex flex-col h-full'
      onClick={() => navigate(`/groups/${group._id}`)}
    >
      <div className='flex-grow'>
        <h2 className='text-xl font-bold text-[#F3E4C9] mb-2 group-hover:text-[#C9996B] transition-colors'>{group.name}</h2>
        <div className='flex items-center gap-2 mb-4'>
          <span className='text-xs font-semibold text-[#F3E4C9]/70 uppercase tracking-wider'>Invite Code</span>
          <span className='px-2 py-0.5 bg-black/10 rounded text-sm text-[#F3E4C9]/90 font-mono tracking-widest border border-[#d2b48c23]'>{group.inviteCode}</span>
        </div>
      </div>
      
      <div className='mt-4 pt-4 border-t border-[#d2b48c23] flex justify-between items-center'>
        <p className='text-[#F3E4C9]/50 text-xs font-medium'>Created {new Date(group.createdAt).toLocaleDateString()}</p>
        <div className='w-8 h-8 rounded-full bg-[#C9996B]/20 flex items-center justify-center group-hover:bg-[#C9996B] group-hover:text-white text-[#C9996B] transition-all duration-300'>
          <span className='text-sm transform group-hover:translate-x-0.5 transition-transform'>→</span>
        </div>
      </div>
    </div>
  )
}

export default GroupCard
