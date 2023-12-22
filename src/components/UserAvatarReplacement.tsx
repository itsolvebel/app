import { User } from '@/typings/user'
import React from 'react'

export function UserAvatarReplacement({ user }: { user: User }) {
  return (<div>
    <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F1FF]'>
      <p className='text-sm font-bold text-[#ABABAD]'>
        {user.first_name.charAt(0) + user.last_name.charAt(0)}
      </p>
    </div>
  </div>)
}
