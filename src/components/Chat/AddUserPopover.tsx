import { Ticket } from '@/typings/ticket'
import { ChatRoom } from '@/typings/chat_room'
import React, { ReactNode, useState } from 'react'
import { User, UserRole, userRoles } from '@/typings/user'
import { fetcher } from '@/lib/fetcher'
import { Dropdown, DropdownProps } from 'primereact/dropdown'
import toast from 'react-hot-toast'
import * as Popover from '@radix-ui/react-popover'
import { Plus, X } from 'lucide-react'
import { UserAvatarReplacement } from '@components/UserAvatarReplacement'
import { Result } from '@/typings/result'
import Image from 'next/image'

type ChatUserPopoverProps = {
  chat: Ticket | ChatRoom,
  addMember: (user: User, role?: UserRole) => Promise<Result<void>>,
}

export function AddUserPopover({ chat, addMember }: ChatUserPopoverProps) {

  const [users, setUsers] = useState<User[]>()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [popoverOpen, setPopoverOpen] = useState(false)

  function fetchUsers() {
    fetcher.get('/users').then(res => {
      const data: User[] = res.data
      const usersWithoutExisting = data.filter(user => (
        !chat.users.some(chatUser => chatUser.id === user.id)
      ))
      setUsers(usersWithoutExisting)
    })
  }

  function handlePopoverOpen() {
    fetchUsers()
  }

  function userOptionTemplate(option: User) {
    return (<div className={'flex items-center gap-3'}>
      {option.avatar_url ?
        <Image alt={option.first_name + ' ' + option.last_name} src={option.avatar_url} />
        : <UserAvatarReplacement user={option} />}
      <div className={'flex flex-col'}>
        <span>{option.first_name + ' ' + option.last_name}</span>
        <span className={'text-xs text-[#ABABAD]'}>{option.roles.toString()}</span>
      </div>
    </div>)
  }

  function selectedOptionTemplate(option: User, props: DropdownProps): ReactNode {
    if (option) {
      return (<div className={'flex items-center gap-3'}>
        {option.avatar_url ?
          <Image alt={option.first_name + ' ' + option.last_name} src={option.avatar_url} />
          : <UserAvatarReplacement user={option} />}
        <div className={'flex flex-col'}>
          <span>{option.first_name + ' ' + option.last_name}</span>
          <span className={'text-xs text-[#ABABAD]'}>{option.roles.toString()}</span>
        </div>
      </div>)
    }
    return <span>{props.placeholder}</span>

  }

  function handleAddUserClick() {
    setPopoverOpen(false)
    if (!selectedUser || !selectedRole) return
    const toastId = toast.promise(addMember(selectedUser, selectedRole), {
      loading: 'Adding user...',
      success: 'Successfully added the user!',
      error: 'There was an error while adding the user. Please try again. If this keeps happening, please contact support.',
    })
  }

  return (
    <Popover.Root open={popoverOpen} onOpenChange={change => setPopoverOpen(change)}>
      <Popover.Trigger asChild>
        <button
          onClick={handlePopoverOpen}
          className={'my-4 rounded-xl bg-[#F2F2F2] p-2 w-full font-bold text-[#5A8ED1] border-2 border-[#5A8ED1] flex justify-start'}>
          <Plus className={'mr-2'}></Plus>
          Add user
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className='rounded p-5 w-[350px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade'
          sideOffset={5}
        >
          <div className='flex flex-grow-0 items-start justify-end flex-col gap-2.5 '>
            <p className='text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5'>Select a user</p>
            <Dropdown
              placeholder='Select a user'
              value={selectedUser} onChange={(e) => setSelectedUser(e.value)}
              options={users}
              optionLabel='first_name'
              filter
              valueTemplate={selectedOptionTemplate} itemTemplate={userOptionTemplate}
              className='w-full md:w-14rem border-2' />
            <Dropdown
              placeholder='Select a role'
              value={selectedRole} onChange={(e) => setSelectedRole(e.value)}
              options={[...userRoles]}
              filter
              className='w-full md:w-14rem border-2' />
            <button
              disabled={!selectedUser || !selectedRole}
              onClick={handleAddUserClick}
              className={
                'grow-0 mt-2 ml-auto rounded-xl p-2 px-8 font-bold flex justify-start ' + (selectedUser && selectedRole ? 'text-[#fff] bg-[#5A8ED1]' : 'bg-[#F2F2F2] text-[#5A8ED1]')
              }
            >
              Add
            </button>
          </div>
          <Popover.Close
            className='rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default'
            aria-label='Close'
          >
            <X />
          </Popover.Close>
          <Popover.Arrow className='fill-white' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

  )

}
