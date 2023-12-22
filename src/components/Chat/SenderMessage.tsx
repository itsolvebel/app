'use client'
import Image from 'next/image'
import { Message } from '@/typings/messages'

type SenderMessageProps = {
  message: Message,
}

export function SenderMessage({ message }: SenderMessageProps) {
  return (
    <div className='flex w-full flex-row-reverse'>
      <div>
        {message.message.user.avatar_url === null ? (
          <div>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#FFFFFF]'>
              <p className='text-sm font-bold text-[#ABABAD]'>
                {message.message.user.first_name.charAt(0).toUpperCase() +
                  message.message.user.last_name.charAt(0).toUpperCase()}
              </p>
            </div>
          </div>
        ) : (
          <Image
            src={message.message.user.avatar_url}
            alt="Sender's avatar"
            width={40}
            height={40}
            className='rounded-full'
          />
        )}
      </div>
      <div className='mr-4' data-message-id={message.message.id}>
        <div className='flex max-w-[30rem] flex-col rounded-l-xl rounded-br-xl bg-[#5A8ED1] px-4 py-3'>
          <span
            className={`
              break-words
              text-sm
             ${message.status === 'Loading'
              ? 'text-white/50'
              : message.status === 'Error'
                ? 'text-[#cc0000]'
                : 'text-[#f0f0f0]'
            }
           `}
          >
            {message.message.content}
          </span>
        </div>
      </div>
    </div>
  )
}
