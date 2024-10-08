import React, { ChangeEvent, useState } from 'react'
import { Paperclip } from 'lucide-react'

type ChatTextAreaProps = {
  sendMessage: (content: string) => void;
}

export function ChatTextArea({ sendMessage }: ChatTextAreaProps) {
  const [rows, setRows] = useState(1)
  const [message, setMessage] = useState('')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
    setRows(event.target.value.split('\n').length)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    submit()
  }

  function submit() {
    if (message.trim() !== '') {
      sendMessage(message)
      setMessage('')
      setRows(1)
    }
  }

  return (
    <div className='flex h-auto max-h-48 min-h-[6rem] w-full rounded-3xl'>
      <div className='flex h-full w-full items-center justify-between p-6'>
        <form onSubmit={handleSubmit}
              className='flex h-full h-min w-full items-center justify-between rounded-xl bg-white px-4 py-2'>
          <div className='flex h-10 w-10 cursor-pointer items-center justify-center'>
            <Paperclip size={20} />
          </div>
          {/* {!locked ? (
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center">
              <Paperclip size={20} />
            </div>
          ) : (
            ""
          )} */}
          <textarea
            rows={rows}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            // disabled={locked}
            className='ml-4 h-auto w-full resize-none break-words bg-white outline-none'
            // placeholder={locked ? "Locked Chat" : "Type a message"}
            placeholder='Type a message'
            style={{ maxHeight: '80px' }}
          ></textarea>
        </form>
      </div>
    </div>
  )
}
